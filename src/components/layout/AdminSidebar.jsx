import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../../api/api";

const AdminSidebar = () => {
  const userId = localStorage.getItem("userid");
  const [userData, setUserData] = useState(null);

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

  return (
    <div className="sidebar sidebar-style-2">
      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <div className="user">
            <div className="avatar-sm float-left mr-2">
              {userData?.avatar ? (
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={userData?.avatar}
                  alt="..."
                  className="avatar-img rounded-circle"
                />
              ) : (
                <i className="fas fa-user-circle fa-2x"></i>
              )}
            </div>

            <div className="info">
              <a
                data-toggle="collapse"
                href="#collapseExample"
                aria-expanded="true"
              >
                <span>
                  <span className="user-level">{userData?.username}</span>
                  <span className="caret" />
                </span>
              </a>
              <div className="clearfix" />
              <div className="collapse in" id="collapseExample">
                <ul className="nav">
                  <li>
                    <Link to="/myprofile">
                      <span className="link-collapse">My Profile</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ul className="nav nav-primary">
            <li className="nav-section">
              <span className="sidebar-mini-icon">
                <i className="fa fa-ellipsis-h" />
              </span>
              <h4 className="text-section">Navigation</h4>
            </li>
            <li className="nav-item">
              <Link to="/dashboard">
                <i className="fas fa-home" />
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/posts">
                <i className="fas fa-marker" />
                <p>New post</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/appointment">
                <i className="fas fa-cart-arrow-down" />
                <p>Appointments</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/product">
                <i className="fas fa-file-upload" />
                <p>Launch Product</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/bill">
                <i className="fas fa-file-alt" />
                <p>Bill</p>
              </Link>
            </li>
            <li className="nav-item">
              <a data-toggle="collapse" href="#settings">
                <i className="fas fa-cog" />
                <p>Settings</p>
                <span className="caret" />
              </a>
              <div className="collapse" id="settings">
                <ul className="nav nav-collapse">
                  <li>
                    <Link to="/userlist">
                      <span className="sub-item">User</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reviewsupoort">
                      <span className="sub-item">Messages</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
