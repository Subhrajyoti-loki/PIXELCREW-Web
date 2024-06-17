import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/layout/AdminNavbar";
import AdminSidebar from "../components/layout/AdminSidebar";
import LogoBar from "../components/layout/LogoBar";
import { EditStatus, getAllBooking, getBooking, Editbooking } from "../api/api";
import moment from "moment";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Drawer, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Appointment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState(null);
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("");
  const [drawerType, setDrawerType] = useState("");

  const fetchData = async () => {
    try {
      const response = await getAllBooking();
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle edit status
  const handleEdit = async (id) => {
    setCurrentId(id);
    setDrawerType("status");
    try {
      const response = await getBooking(id);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setStatus(response.data[0].status);
      } else {
        console.error("No booking data found");
      }
    } catch (error) {
      console.error("Error fetching the booking data", error);
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  // Handle submit status
  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { status };
    try {
      const response = await EditStatus(currentId, payload);
      if (response.status === 200 || response.status === 201) {
        toast.success("Status updated successfully");
        setDrawerType("");
        fetchData();
      } else {
        toast.error("Error occurred while updating");
      }
    } catch (error) {
      toast.error("Error occurred while updating");
    }
  };

  // Handle payment edit
  const handlePaymentEdit = async (id) => {
    setCurrentId(id);
    setDrawerType("payment");
    try {
      const response = await getBooking(id);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setAmount("");
        setMode("");
      } else {
        console.error("No booking data found");
      }
    } catch (error) {
      console.error("Error fetching the booking data", error);
    }
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      amount: Number(amount),
      mode,
    };
    try {
      const response = await Editbooking(currentId, payload);
      if (response.status === 200 || response.status === 201) {
        toast.success("Payment updated successfully");
        setDrawerType("");
        fetchData();
      } else {
        toast.error("Error occurred while updating payment");
      }
    } catch (error) {
      toast.error("Error occurred while updating payment");
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
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <div className="col-md-12">
                <div className="table-responsive">
                  <table id="basic-datatables" className="table table-hover">
                    <thead className="thead-light">
                      <tr className="text-center">
                        <th>Name</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Booking Date</th>
                        <th>Price</th>
                        <th>Due </th>
                        <th>Collect Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading
                        ? Array.from({ length: 5 }).map((_, rowIndex) => (
                            <tr key={rowIndex} className="text-center">
                              {Array.from({ length: 9 }).map((_, colIndex) => (
                                <td key={colIndex}>
                                  <Box sx={{ width: "100%", padding: "10px" }}>
                                    <Skeleton
                                      variant="rectangular"
                                      height={40}
                                    />
                                  </Box>
                                </td>
                              ))}
                            </tr>
                          ))
                        : data &&
                          data.map((item, index) => (
                            <tr key={index} className="text-center">
                              <td>{item.product?.name}</td>
                              <td>{item.user?.fullname}</td>
                              <td>{item.user?.email}</td>
                              <td>
                                <button
                                  className={`btn btn-xs ${
                                    item.status === "Approved"
                                      ? "btn-success"
                                      : item.status === "Pending"
                                      ? "btn-secondary"
                                      : item.status === "Declined"
                                      ? "btn-danger"
                                      : "btn-primary"
                                  }`}
                                >
                                  {item.status}
                                </button>
                              </td>
                              <td>
                                {moment(item.date).format("MMMM Do YYYY")}
                              </td>
                              <td className="text-secondary">&#8377;{item.product?.price}</td>
                              <td className="text-danger">&#8377;{item.dueAmount}</td>
                              <td className="text-success">&#8377;{item.paidAmount}</td>
                              <td className="text-center">
                                <div className="form-button-action m-0 p-0">
                                  <button
                                    type="button"
                                    className="btn btn-icon btn-light btn-xs mx-1 p-0"
                                    data-target="#editModal"
                                    disabled={item?.status === "Declined"}
                                    onClick={() => handleEdit(item._id)}
                                    title="take action"
                                  >
                                    <i className="fas fa-user-edit text-info" />
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-icon btn-light btn-xs mx-1 p-0"
                                    data-target="#editPayment"
                                    disabled={item?.totalAmount === item?.paidAmount}
                                    title="payment"
                                    onClick={() => handlePaymentEdit(item._id)}
                                  >
                                    <i className="far fa-credit-card text-secondary" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* edit drawer */}
        <Drawer
          anchor="right"
          open={drawerType === "status"}
          onClose={() => setDrawerType("")}
        >
          <Box p={3} width={{ xs: "100%", sm: 400, md: "40vw" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Typography variant="h6">Edit Status</Typography>
              <IconButton color="primary" onClick={() => setDrawerType("")}>
                <CloseIcon style={{ color: "red" }} />
              </IconButton>
            </Box>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  className="form-control"
                  value={status}
                  onChange={handleStatusChange}
                > 
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
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

        {/* payment drawer */}
        <Drawer
          anchor="right"
          open={drawerType === "payment"}
          onClose={() => setDrawerType("")}
        >
          <Box p={3} width={{ xs: "100%", sm: 400, md: "40vw" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Typography variant="h6">Payment</Typography>
              <IconButton
                color="primary"
                onClick={() => setDrawerType("")}
              >
                <CloseIcon style={{ color: "red" }} />
              </IconButton>
            </Box>

            <form onSubmit={handlePaymentSubmit}>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  className="form-control"
                  value={amount}
                  min="0"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mode">Mode</label>
                <select
                  id="mode"
                  className="form-control "
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Online">Online</option>
                </select>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
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
      <ToastContainer />
    </div>
  );
};

export default Appointment;
