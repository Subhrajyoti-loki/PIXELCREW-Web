import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/layout/AdminNavbar";
import AdminSidebar from "../components/layout/AdminSidebar";
import LogoBar from "../components/layout/LogoBar";
import { getAllUser, editUser, getUsers } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Drawer, Typography, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const secretid = process.env.REACT_APP_SECRET_KEY;


function UserList() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [confirmationText, setConfirmationText] = useState("");
  const [role, setRole] = useState("");
  const [drawerType, setDrawerType] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [securityCode, setSecurityCode] = useState("");
  const [isSecurityCodeValid, setIsSecurityCodeValid] = useState(false);

  // Fetch all user list
  const FetchUserList = async () => {
    try {
      const response = await getAllUser();
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Failed to fetch user list:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    FetchUserList();
  }, []);

  // Toggle is active
  const toggleActiveStatus = async (id) => {
    try {
      const user = users.find((userit) => userit._id === id);
      await editUser(id, { isactive: !user.isactive });
      toast.success("Status updated successfully");
      FetchUserList();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Open modal
  const openModal = (id) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
    setConfirmationText("");
  };

  // Handle confirmation
  const handleConfirm = () => {
    if (confirmationText === "confirm" && selectedUserId) {
      toggleActiveStatus(selectedUserId);
      closeModal();
    } else {
      toast.error("Confirmation text is incorrect. Type 'confirm' to update.");
    }
  };

  //handle role update
  const handleRole = async (id) => {
    setCurrentId(id);
    setDrawerType("role");
    try {
      const response = await getUsers(id);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setRole(response.data[0].role);
      } else {
        console.error("Unexpected response data format:", response.data);
      }
    } catch (error) {
      console.log("Error fetching user data:", error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isSecurityCodeValid) {
      toast.error("Invalid security code");
      return;
    }

    const payload = {
      role,
    };

    try {
      const response = await editUser(currentId, payload);
      if (response.status === 200 || response.status === 201) {
        toast.success("Role updated successfully");
        setRole("");
        setSecurityCode("");
        setDrawerType("");
        FetchUserList();
      } else {
        toast.error("Error occurred while updating ");
      }
    } catch (error) {
      toast.error("Error occurred while updating");
    }
  };

  //validate security key
  const validateSecurityCode = (code) => {
    const correctSecurityCode = secretid;
    return code === correctSecurityCode;
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
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title fw-mediumbold">User List</div>
                    <div className="card-list">
                      {users.map((user) => (
                        <div className="item-list" key={user._id}>
                          <div className="avatar">
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.username}
                                className="avatar-img rounded-circle"
                              />
                            ) : (
                              <i className="fas fa-user-circle fa-2x"></i>
                            )}
                          </div>
                          <div className="info-user ml-3">
                            <div className="username">{user.fullname}</div>
                            <div className="status">{user.role}</div>
                          </div>
                          <div className="info-user ml-3">
                            <button
                              onClick={() => openModal(user._id)}
                              className={`btn btn-border btn-round btn-xs ${
                                user.isactive ? "btn-success" : "btn-danger"
                              }`}
                            >
                              {user.isactive ? "Enabled" : "Disabled"}
                            </button>
                          </div>

                          <button
                            className="btn btn-icon btn-primary btn-round btn-xs"
                            onClick={(e) => handleRole(user?._id)}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />

      {/* Custom Modal for confirmation */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            zIndex: 1050,
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            outline: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "500px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #e5e5e5",
                paddingBottom: "10px",
              }}
            >
              <h2>Confirm Action</h2>
              <button
                onClick={closeModal}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  lineHeight: 1,
                  color: "#000",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>
            <div style={{ padding: "10px 0" }}>
              <p>Are you sure you want to update the status?</p>
              <input
                type="text"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder="Type 'confirm' to update"
                style={{ width: "100%", padding: "8px", marginTop: "10px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "10px",
              }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirm}
                style={{ marginRight: "10px" }}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* role drawer */}
      <Drawer
        anchor="right"
        open={drawerType === "role"}
        onClose={() => setDrawerType("")}
      >
        <Box p={3} width={{ xs: "100%", sm: 400, md: "40vw" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Typography variant="h6">Update Role</Typography>
            <IconButton color="primary" onClick={() => setDrawerType("")}>
              <CloseIcon style={{ color: "red" }} />
            </IconButton>
          </Box>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Promote to Admin</option>
                <option value="user">Demote to User</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="securityCode">Security Code</label>
              <input
                type="text"
                id="securityCode"
                className="form-control"
                value={securityCode}
                onChange={(e) => {
                  setSecurityCode(e.target.value);
                  setIsSecurityCodeValid(validateSecurityCode(e.target.value));
                }}
                placeholder="Enter your security code"
              />
            </div>

            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isSecurityCodeValid}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setDrawerType("")}
                style={{ marginLeft: "10px" }}
              >
                Close
              </button>
            </div>
          </form>
        </Box>
      </Drawer>
    </div>
  );
}

export default UserList;
