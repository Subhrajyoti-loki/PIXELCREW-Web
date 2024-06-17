import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/layout/AdminNavbar";
import AdminSidebar from "../components/layout/AdminSidebar";
import LogoBar from "../components/layout/LogoBar";
import { getUsers, editUser } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AdminProfile = () => {
  const userId = localStorage.getItem("userid");
  const [userData, setUserData] = useState(null);
  const [editedId, setEditedId] = useState("");
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");

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

  // Edit handler
  const handleEdit = async (id) => {
    setEditedId(id);
    try {
      const response = await getUsers(id);
      const userData = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

      setFullname(userData.fullname);
      setMobile(userData.mobile);
      setBio(userData.bio);
      setAddress(userData.address);
      setEditDrawerOpen(true);
    } catch (error) {
      console.error("Error fetching userData data:", error);
    }
  };

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "fullname") {
      setFullname(value);
    } else if (name === "mobile") {
      setMobile(value);
    } else if (name === "bio") {
      setBio(value);
    } else if (name === "address") {
      setAddress(value);
    }
  };

  // OnSubmit handler

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    const obj = {
      fullname,
      mobile,
      bio,
      address,
    };
    try {
      const res = await editUser(editedId, obj);
      if (res.status === 200 || res.status === 201) {
        toast.success("Your  Profile updated successfully");
        setEditDrawerOpen(false);
        fetchData();
      } else {
        toast.error("Error occurred while updating");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="wrapper">
      <div className="main-header">
        <LogoBar />
        <AdminNavbar />
      </div>
      <AdminSidebar />
      <div className="main-panel">
        <div className="content">
          <div className="page-inner">
            <form>
              <div
                className="card"
                style={{
                  backgroundImage: `url('https://res.cloudinary.com/dq1dh4drp/image/upload/v1716689757/samples/cup-on-a-table.jpg')`,
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-4 d-flex">
                      <div
                        className="card card-profile w-100"
                        style={{
                          backgroundColor: "#ffffff00",
                        }}
                      >
                        <div className="card-header">
                          <div className="profile-picture">
                            <div className="avatar avatar-xl">
                              {userData?.avatar ? (
                                <img
                                  style={{ width: "100%", height: "100%" }}
                                  src={userData?.avatar}
                                  alt="..."
                                  className="avatar-img rounded-circle"
                                />
                              ) : (
                                <i className="fas fa-user-circle text-primary fa-4x"></i>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="user-profile text-center">
                            <div className="name " style={{ color: "#151515" }}>
                              {userData?.fullname}
                            </div>
                            <div className="job">
                              <p
                                className="mb-0"
                                style={{
                                  fontFamily: "revert-layer",
                                  fontSize: "16px",
                                  color: "#524C42",
                                }}
                              >
                                {userData?.email}
                              </p>
                            </div>
                            <div className="desc">
                              <p
                                className="mb-0"
                                style={{
                                  fontFamily: "sans-serif",
                                  fontSize: "16px",
                                  color: "#524C42",
                                }}
                              >
                                {userData?.mobile}
                              </p>
                            </div>
                            <div className="social-media">
                              <a
                                className="btn btn-info btn-twitter btn-sm btn-link"
                                href="#"
                              >
                                <span className="btn-label just-icon">
                                  <i className="fab fa-linkedin"></i>{" "}
                                </span>
                              </a>
                              <a
                                className="btn btn-success btn-sm btn-link"
                                rel="publisher"
                                href="#"
                              >
                                <span className="btn-label just-icon">
                                  <i className="fab fa-whatsapp-square"></i>{" "}
                                </span>
                              </a>
                              <a
                                className="btn btn-primary btn-sm btn-link"
                                rel="publisher"
                                href="#"
                              >
                                <span className="btn-label just-icon">
                                  <i className="fab fa-facebook-square"></i>{" "}
                                </span>
                              </a>
                              <a
                                className="btn btn-danger btn-sm btn-link"
                                rel="publisher"
                                href="#"
                              >
                                <span className="btn-label just-icon">
                                  <i className="fab fa-github-square"></i>{" "}
                                </span>
                              </a>
                              <a
                                className="btn btn-secondary btn-sm btn-link"
                                rel="publisher"
                                href="#"
                              >
                                <span className="btn-label just-icon">
                                  <i className="fab fa-twitter-square"></i>{" "}
                                </span>
                              </a>
                            </div>
                            <div className="view-profile">
                              <a
                                onClick={() => handleEdit(userData._id)}
                                className="btn btn-default btn-block"
                              >
                                Edit Full Profile
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer">
                          <div className="row user-stats text-center">
                            <div className="col">
                              <div
                                className="number"
                                style={{ color: "#151515" }}
                              >
                                {userData?.username}
                              </div>
                              <div
                                className="title"
                                style={{ color: "#524C42" }}
                              >
                                User Id
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8 d-flex">
                      <div
                        className="card card-profile  w-100"
                        style={{
                          backgroundColor: "#ffffff00",
                        }}
                      >
                        <ul
                          className="nav nav-pills nav-default nav-pills-no-bd pl-3"
                          id="student-details-tabs"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link active show btn-sm text-dark"
                              id="student-basic-tab"
                              data-toggle="pill"
                              href="#student-basic-content"
                              role="tab"
                              aria-controls="student-basic-content"
                              aria-selected="true"
                            >
                              Details
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link btn-sm text-dark"
                              id="student-address-tab "
                              data-toggle="pill"
                              href="#student-address-content"
                              role="tab"
                              aria-controls="student-address-content"
                              aria-selected="false"
                            >
                              Address
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link btn-sm text-dark"
                              id="student-bank-tab"
                              data-toggle="pill"
                              href="#student-bank-content"
                              role="tab"
                              aria-controls="student-bank-content"
                              aria-selected="false"
                            >
                              Bio
                            </a>
                          </li>
                        </ul>
                        <div
                          className="tab-content"
                          id="student-details-content"
                        >
                          <div
                            className="tab-pane fade active show"
                            id="student-basic-content"
                            role="tabpanel"
                            aria-labelledby="student-basic-tab"
                          >
                            <div className="card-body">
                              <div className="row">
                                <div className="col-sm-6">
                                  <p
                                    className="mb-0"
                                    style={{ color: "#151515" }}
                                  >
                                    Username
                                  </p>
                                </div>
                                <div className="col-sm-6">
                                  <p
                                    className=" mb-0"
                                    style={{ color: "#151515" }}
                                  >
                                    {userData?.username ? (
                                      <span>{userData?.username}</span>
                                    ) : (
                                      <span>N/A</span>
                                    )}
                                  </p>
                                </div>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-sm-6">
                                  <p
                                    className="mb-0"
                                    style={{ color: "#151515" }}
                                  >
                                    Name
                                  </p>
                                </div>
                                <div className="col-sm-6">
                                  <p
                                    className=" mb-0"
                                    style={{ color: "#151515" }}
                                  >
                                    {userData?.fullname ? (
                                      <span>{userData?.fullname}</span>
                                    ) : (
                                      <span>N/A</span>
                                    )}
                                  </p>
                                </div>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-sm-6">
                                  <p
                                    className="mb-0"
                                    style={{ color: "#151515" }}
                                  >
                                    Email
                                  </p>
                                </div>
                                <div className="col-sm-6">
                                  <p
                                    className=" mb-0"
                                    style={{ color: "#151515" }}
                                  >
                                    {userData?.email ? (
                                      <span>{userData?.email}</span>
                                    ) : (
                                      <span>N/A</span>
                                    )}
                                  </p>
                                </div>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-sm-6">
                                  <p
                                    className="mb-0"
                                    style={{ color: "#151515" }}
                                  >
                                    Mobile
                                  </p>
                                </div>
                                <div className="col-sm-6">
                                  <p
                                    className=" mb-0"
                                    style={{ color: "#151515" }}
                                  >
                                    {userData?.mobile ? (
                                      <span>{userData?.mobile}</span>
                                    ) : (
                                      <span>N/A</span>
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="student-address-content"
                            role="tabpanel"
                            aria-labelledby="student-address-tab"
                          >
                            <div className="card-body">
                              <div className="row">
                                <div className="col-sm-2">
                                  <i className="fas fa-map-marker-alt fa-2x text-secondary"></i>
                                </div>
                                <div className="col-sm-10">
                                  <p
                                    className="mb-0"
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "bold",
                                      color: "#151515",
                                    }}
                                  >
                                    Address Line
                                  </p>
                                  <p
                                    className=" mb-0"
                                    style={{
                                      fontSize: "16px",
                                      color: "#151515",
                                    }}
                                  >
                                    {userData?.address ? (
                                      <span>{userData?.address}</span>
                                    ) : (
                                      <span>N/A</span>
                                    )}
                                  </p>
                                </div>
                              </div>
                              <hr />

                              <div className="row">
                                <div className="col-sm-2">
                                  <i className="fas fa-globe fa-2x text-primary"></i>
                                </div>
                                <div className="col-sm-4">
                                  <p
                                    className="mb-0"
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "bold",
                                      color: "#151515",
                                    }}
                                  >
                                    Country
                                  </p>
                                  <p
                                    className=" mb-0"
                                    style={{
                                      fontSize: "16px",
                                      color: "#151515",
                                    }}
                                  >
                                    INDIA
                                  </p>
                                </div>
                                <div className="col-sm-4">
                                  <p
                                    className="mb-0"
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "bold",
                                      color: "#151515",
                                    }}
                                  >
                                    State
                                  </p>
                                  <p
                                    className=" mb-0"
                                    style={{
                                      fontSize: "16px",
                                      color: "#151515",
                                    }}
                                  >
                                    West Bengal
                                  </p>
                                </div>
                              </div>
                              <hr />
                            </div>
                          </div>

                          <div
                            className="tab-pane fade"
                            id="student-bank-content"
                            role="tabpanel"
                            aria-labelledby="student-bank-tab"
                          >
                            <div className="card-body">
                              <div className="col-lg-12 col-md-12 col-sm-12 px-3">
                                <p
                                  className="card-text"
                                  style={{ color: "#151515" }}
                                >
                                  {userData?.bio}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* edit drawer! */}
        <Drawer
          anchor="right"
          open={editDrawerOpen}
          onClose={() => setEditDrawerOpen(false)}
        >
          <Box p={3} width={{ xs: "100%", sm: 400, md: "40vw" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Typography variant="h6">Edit Product</Typography>
              <IconButton
                color="primary"
                onClick={() => setEditDrawerOpen(false)}
              >
                <CloseIcon style={{ color: "red" }} />
              </IconButton>
            </Box>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  className="form-control"
                  value={fullname}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  className="form-control"
                  value={mobile}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  className="form-control"
                  value={bio}
                  onChange={handleChange}
                  maxLength="1000"
                  rows="5"
                />
                <small>{bio.length}/1000</small>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  value={address}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setEditDrawerOpen(false)}
                  style={{ marginLeft: "10px" }}
                >
                  Close
                </button>
              </div>
            </form>
          </Box>
        </Drawer>

        {/* footer end! */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminProfile;
