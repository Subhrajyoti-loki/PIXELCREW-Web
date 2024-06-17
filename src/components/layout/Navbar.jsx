import React, { useEffect, useState } from "react";
import { getUsers, getUserNotifiacton } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userid");
  const [userData, setUserData] = useState(null);
  const [Data, setData] = useState(null);
  // Fetch user data
  const fetchData = async () => {
    try {
      const response = await getUsers(userId);
      //   console.log("Response data:", response.data);

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

  // fetch all notification
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

  //logout function
  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    navigate("/login", { replace: true });
  }

  return (
    <>
      <nav
        className="navbar navbar-header navbar-expand-lg"
        data-background-color="purple2"
      >
        <div className="container-fluid">
          <div className="collapse" id="search-nav">
            <form className="navbar-left navbar-form nav-search mr-md-3">
              <div className="input-group mx-5">
                <div className="input-group-prepend">
                  <button type="submit" className="btn btn-search pr-1">
                    <i className="fa fa-search search-icon text-danger" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search ..."
                  className="form-control"
                />
              </div>
            </form>
          </div>
          <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
            <li className="nav-item toggle-nav-search hidden-caret">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#search-nav"
                role="button"
                aria-expanded="false"
                aria-controls="search-nav"
              >
                <i className="fa fa-search" />
              </a>
            </li>

            <li className="nav-item dropdown hidden-caret">
              <Link
                className="nav-link dropdown-toggle"
                id="notifDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-bell" />
                <span className="notification">
                  {Data?.notificationCount || 0}
                </span>
              </Link>
              <ul
                className="dropdown-menu notif-box animated fadeIn"
                aria-labelledby="notifDropdown"
              >
                <li>
                  <div className="dropdown-title">
                    You have {Data?.notificationCount || 0} notifications
                  </div>
                </li>
                <li>
                  <div
                    className="notif-scroll"
                    style={{ maxHeight: "400px", overflowY: "auto" }}
                  >
                    <div className="notif-center">
                      {Data?.notifications &&
                        Data.notifications.map((notification) => (
                          <Link
                            key={notification._id}
                            // onClick={() =>
                            //   handleNotificationClick(notification)
                            // }
                            style={{
                              display: "block",
                              marginLeft: "12px",
                              marginBottom: "10px",
                              color: "#333",
                              textDecoration: "none",
                            }}
                          >
                            <div className="notif-content">
                              <span className="block">
                                {notification.message}
                              </span>
                              <span className="time">
                                {moment(notification.date).fromNow()}
                              </span>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </li>
                <li>
                  <Link className="see-all">
                    See all notifications
                    <i className="fa fa-angle-right" />{" "}
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown hidden-caret">
              <Link
                className="dropdown-toggle profile-pic"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="avatar-sm">
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
              </Link>
              <ul className="dropdown-menu dropdown-user animated fadeIn">
                <div className="dropdown-user-scroll scrollbar-outer">
                  <li>
                    <div className="user-box">
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
                      <div className="u-text">
                        <h4>{userData?.fullname}</h4>
                        <p className="text-muted">{userData?.username}</p>
                        <Link
                          to="/profile"
                          className="btn btn-xs btn-secondary btn-sm"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="dropdown-divider" />
                    <Link to="/mybooking" className="dropdown-item">
                      My Booking
                    </Link>
                    <Link className="dropdown-item">Bills</Link>
                    <Link to="/gallery" className="dropdown-item">
                      Gallery
                    </Link>
                    <div className="dropdown-divider" />
                    <Link className="dropdown-item ">
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
                    </Link>
                    <div className="dropdown-divider" />
                    {/* <Logout className="dropdown-divider"></Logout> */}
                  </li>
                </div>
              </ul>
            </li>
          </ul>
        </div>
        <ToastContainer />
      </nav>
    </>
  );
};

export default Navbar;
