import React, { useEffect, useState, useContext } from "react";
import { getUsers, getAllNotifiacton } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminNavbar = () => {
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
      const response = await getAllNotifiacton();
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
            <li></li>
            <li className="nav-item dropdown hidden-caret">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="messageDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-envelope" />
              </a>
              <ul
                className="dropdown-menu messages-notif-box animated fadeIn"
                aria-labelledby="messageDropdown"
              >
                <li>
                  <div className="dropdown-title d-flex justify-content-between align-items-center">
                    Messages
                    <a href="#" className="small">
                      Mark all as read
                    </a>
                  </div>
                </li>
                <li>
                  <div className="message-notif-scroll scrollbar-outer">
                    <div className="notif-center">
                      <a href="#">
                        <div className="notif-img">
                          <img
                            src="./src/assets/img/jm_denis.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Jimmy Denis</span>
                          <span className="block">How are you ?</span>
                          <span className="time">5 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-img">
                          <img
                            src="./src/assets/img/chadengle.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Chad</span>
                          <span className="block">Ok, Thanks !</span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-img">
                          <img
                            src="./src/assets/img/mlane.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Jhon Doe</span>
                          <span className="block">
                            Ready for the meeting today...
                          </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-img">
                          <img
                            src="./src/assets/img/talha.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Talha</span>
                          <span className="block">Hi, Apa Kabar ?</span>
                          <span className="time">17 minutes ago</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <a className="see-all" href="javascript:void(0);">
                    See all messages
                    <i className="fa fa-angle-right" />{" "}
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown hidden-caret">
              <a
                className="nav-link dropdown-toggle"
                href="#"
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
              </a>
              <ul
                className="dropdown-menu notif-box animated fadeIn"
                aria-labelledby="notifDropdown"
              >
                <li>
                  <div className="dropdown-title">
                    You have {Data?.notificationCount || 0} new notifications
                  </div>
                </li>
                <li>
                  <div
                    className="notif-scroll scrollbar-outer"
                    style={{ maxHeight: "400px" }}
                  >
                    <div
                      className="notif-center"
                      style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "#fff",
                        borderRadius: "8px",
                        padding: "20px",
                        maxWidth: "80%",
                        maxHeight: "80%",
                        overflowY: "auto",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {Data?.notifications &&
                        Data.notifications.map((notification) => (
                          <a
                            href="#"
                            key={notification._id}
                            // onClick={() =>
                            //   handleNotificationClick(notification)
                            // }
                            style={{
                              display: "block",
                              marginBottom: "15px",
                              color: "#333",
                              textDecoration: "none",
                            }}
                          >
                            <div className="notif-icon notif-primary">
                              <i className="flaticon-message" />
                            </div>
                            <div className="notif-content">
                              <span className="block">
                                {notification.message}
                              </span>
                              <span className="time">
                                {moment(notification.date).fromNow()}
                              </span>
                            </div>
                          </a>
                        ))}
                    </div>
                  </div>
                </li>
                <li>
                  <a className="see-all" href="javascript:void(0);">
                    See all notifications
                    <i className="fa fa-angle-right" />{" "}
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown hidden-caret">
              <a
                className="nav-link"
                data-toggle="dropdown"
                href="#"
                aria-expanded="false"
              >
                <i className="fas fa-layer-group" />
              </a>
              <div className="dropdown-menu quick-actions quick-actions-info animated fadeIn">
                <div className="quick-actions-header">
                  <span className="title mb-1">Quick Actions</span>
                  <span className="subtitle op-8">Shortcuts</span>
                </div>
                <div className="quick-actions-scroll scrollbar-outer">
                  <div className="quick-actions-items">
                    <div className="row m-0">
                      <Link to='/appointment' className="col-6 col-md-4 p-0" >
                        <div className="quick-actions-item">
                          <i className="flaticon-archive" />
                          <span className="text">Appointment Review</span>
                        </div>
                      </Link>
                      <Link to="/product" className="col-6 col-md-4 p-0">
                        <div className="quick-actions-item">
                          <i className="flaticon-box-1" />
                          <span className="text">Launch New Product</span>
                        </div>
                      </Link>
                      <Link to="/posts" className="col-6 col-md-4 p-0">
                        <div className="quick-actions-item">
                          <i className="flaticon-pen" />
                          <span className="text">Create New Post</span>
                        </div>
                      </Link>
                      <Link to="/userlist" className="col-6 col-md-4 p-0" >
                        <div className="quick-actions-item">
                          <i className="flaticon-user-5" />
                          <span className="text">Manage All User</span>
                        </div>
                      </Link>
                      <Link to="/reviewsupoort" className="col-6 col-md-4 p-0" >
                        <div className="quick-actions-item">
                          <i className="flaticon-customer-support" />
                          <span className="text">One to One Support</span>
                        </div>
                      </Link>
                      <Link to="/bill" className="col-6 col-md-4 p-0">
                        <div className="quick-actions-item">
                          <i className="flaticon-file" />
                          <span className="text">Create New Invoice</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown hidden-caret">
              <a
                className="dropdown-toggle profile-pic"
                data-toggle="dropdown"
                href="#"
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
              </a>
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
                          to="/myprofile"
                          className="btn btn-xs btn-secondary btn-sm"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item">My Profile</a>
                    <a className="dropdown-item" href="#">
                      My Balance
                    </a>
                    <a className="dropdown-item" href="#">
                      Inbox
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item " href="#">
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
                    <div className="dropdown-divider" />
                    {/* <Logout className="dropdown-divider"></Logout> */}
                  </li>
                </div>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
