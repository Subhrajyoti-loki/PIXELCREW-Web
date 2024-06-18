import React, { useEffect, useState } from "react";
import { getUsers, getUserNotifiacton } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import {
  FaBell,
  FaBars,
  FaHome,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaSwatchbook,
  FaQuestionCircle,
} from "react-icons/fa";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #7743db;
  color: white;
  position: relative;
`;

const Logo = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-left: 20px;
    cursor: pointer;
    position: relative;
  }
`;

const MenuIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  left: 20px;
  width: 250px;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.open ? "block" : "none")};
  z-index: 1000;
`;

const NotificationDropdown = styled.ul`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.open ? "block" : "none")};
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  padding: 0;
  list-style: none;
`;

const NotificationItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: column;

  &:hover {
    background-color: #f0f0f0;
  }

  .notif-content {
    display: flex;
    justify-content: space-between;
  }
  .block {
    flex: 1;
    margin-right: 10px;
  }
  .time {
    font-size: 0.85em;
    color: #888;
    white-space: nowrap;
  }
`;
const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: #f0f0f0;
    text-decoration: none;
  }
  & > * {
    margin-right: 10px;
  }
`;

const ProfileDropdown = styled.ul`
  position: absolute;
  top: 50px;
  right: 20px;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.open ? "block" : "none")};
  z-index: 1000;
  width: 300px; /* Adjust width as needed */
  padding: 0;
  list-style: none;
`;

const ProfileDropdownItem = styled.li`
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  .avatar-sm {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .u-text {
    flex: 1;
    overflow: hidden;
  }
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userid");
  const [userData, setUserData] = useState(null);
  const [Data, setData] = useState(null);

  // Fetch user data
  const fetchData = async () => {
    try {
      const response = await getUsers(userId);

      if (Array.isArray(response.data) && response.data.length > 0) {
        setUserData(response.data[0]);
      } else {
        console.error("Unexpected response data format:", response.data);
      }
    } catch (error) {
      console.log("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  // Fetch all notifications
  const fetchNotificationData = async () => {
    try {
      const response = await getUserNotifiacton();
      if (response.data) {
        setData(response.data);
      } else {
        toast.error("Empty response data");
      }
    } catch (error) {
      console.log("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchNotificationData();
  }, []);

  // Logout function
  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    navigate("/login", { replace: true });
  }

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    setNotifOpen(false);
    setProfileOpen(false);
  };

  const handleNotifToggle = () => {
    setNotifOpen(!notifOpen);
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const handleProfileToggle = () => {
    setProfileOpen(!profileOpen);
    setMenuOpen(false);
    setNotifOpen(false);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <NavbarContainer>
      <MenuIcon onClick={handleMenuToggle}>
        <FaBars size={24} />
      </MenuIcon>
      {/* <Logo>Pixel Crew</Logo> */}
      <Icons>
        <div onClick={handleNotifToggle}>
          <FaBell size={24} />
          <span className="notification">{Data?.notificationCount || 0}</span>
        </div>
        <div className="avatar-sm" onClick={handleProfileToggle}>
          {userData?.avatar ? (
            <img
              src={userData.avatar}
              alt="image profile"
              className="avatar-img rounded-circle"
            />
          ) : (
            <i className="fas fa-user-circle fa-2x"></i>
          )}
        </div>
      </Icons>
      <DropdownMenu open={menuOpen}>
        <DropdownItem to="/feed" onClick={handleMenuClose}>
          <FaHome />
          Home
        </DropdownItem>
        <DropdownItem to="/mybooking" onClick={handleMenuClose}>
          <FaCalendarAlt />
          Appointment
        </DropdownItem>
        <DropdownItem to="/payment" onClick={handleMenuClose}>
          <FaMoneyCheckAlt />
          Payment
        </DropdownItem>
        <DropdownItem to="/gallery" onClick={handleMenuClose}>
          <FaSwatchbook />
          Gallery
        </DropdownItem>
        <DropdownItem to="/support" onClick={handleMenuClose}>
          <FaQuestionCircle />
          Support
        </DropdownItem>
      </DropdownMenu>
      <NotificationDropdown open={notifOpen}>
        <li>
          <div className="dropdown-title">
            You have {Data?.notificationCount || 0} notifications
          </div>
        </li>
        <li>
          <div className="notif-scroll" style={{ maxHeight: "400px" }}>
            <div className="notif-center">
              {Data?.notifications &&
                Data.notifications.map((notification) => (
                  <NotificationItem key={notification._id}>
                    <div className="notif-content">
                      <span className="block">{notification.message}</span>
                      <span className="time">
                        {moment(notification.date).fromNow()}
                      </span>
                    </div>
                  </NotificationItem>
                ))}
            </div>
          </div>
        </li>
      </NotificationDropdown>

      <ProfileDropdown open={profileOpen}>
        <ProfileDropdownItem>
          <Link className="profile-pic" onClick={handleProfileToggle}>
            <div className="d-flex justify-content-between">
              <div className="avatar-lg">
                {userData?.avatar ? (
                  <img
                    src={userData.avatar}
                    alt="image profile"
                    className="avatar-img rounded"
                  />
                ) : (
                  <i className="fas fa-user-circle fa-2x"></i>
                )}
              </div>
              <div className="u-text ml-4">
                <p className="text-muted">{userData?.username}</p>
                <Link
                  to="/profile"
                  className="btn btn-xs btn-secondary btn-sm"
                  onClick={handleProfileToggle}
                >
                  View Profile
                </Link>
              </div>
            </div>
          </Link>
        </ProfileDropdownItem>
        <li>
          <div className="dropdown-divider" />
          <Link
            to="/mybooking"
            className="dropdown-item"
            onClick={handleProfileToggle}
          >
            My Booking
          </Link>
          <Link className="dropdown-item">Bills</Link>
          <Link to="/gallery" className="dropdown-item">
            Gallery
          </Link>
          <div className="dropdown-divider" />
          <a className="dropdown-item " >
            <button
              type="button"
              className="btn btn-outline-dark btn-xs"
              onClick={handleLogOut}
              style={{
                padding: "10px 20px",
                fontSize: "0.85rem",
                borderRadius: "5px",
              }}
            >
              Log Out
            </button>
          </a>
        </li>
      </ProfileDropdown>
    </NavbarContainer>
  );
};

export default Navbar;