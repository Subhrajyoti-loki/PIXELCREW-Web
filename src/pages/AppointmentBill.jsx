import React, { useEffect, useState, useContext } from "react";
import AdminNavbar from "../components/layout/AdminNavbar";
import AdminSidebar from "../components/layout/AdminSidebar";
import LogoBar from "../components/layout/LogoBar";
import { getAllBooking } from "../api/api";
import { setBookingId } from "../store/Reducers/BookingReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentBill = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle print
  function handlePrint(id) {
    dispatch(setBookingId(id));
    navigate('/billprint');
    console.log(setBookingId)
  }

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
              {loading
                ? Array.from({ length: 6 }).map((_, rowIndex) => (
                    <Box
                      key={rowIndex}
                      sx={{ width: "500px", padding: "10px", margin: "10px" }}
                    >
                      <Skeleton variant="rectangular" height={200} />
                    </Box>
                  ))
                : data &&
                  data.map((item, index) => (
                    <div key={index} className="col-md-5">
                      <div className="card card-secondary bg-secondary-gradient">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <h4 className="mt-3 b-b1 pb-2 mb-4 fw-bold">
                              {item.product?.name}
                            </h4>
                            <h5 className="mb-4 fw-bold">
                              {moment(item.date).format("MMMM Do YYYY")}
                            </h5>
                          </div>
                          <div className="d-flex justify-content-between mb-4 fw-bold">
                            <span>{item.user?.fullname}</span>
                            <span>{item.user?.email}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-4 fw-bold">
                            <span>&#8377;{item.product?.price}</span>
                            <span>
                              Due:{" "}
                              <span className="text-danger">
                                &#8377;{item.dueAmount}
                              </span>
                            </span>
                            <span>
                              Collect Amount:{" "}
                              <span className="text-success">
                                &#8377;{item.paidAmount}
                              </span>
                            </span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-4">
                            <div>
                              <span
                                className={`badge ${
                                  item.status === "Approved"
                                    ? "badge-success"
                                    : item.status === "Pending"
                                    ? "badge-secondary"
                                    : "badge-danger"
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>
                            <div>
                              <button
                                className="btn btn-light btn-sm"
                                disabled={item?.totalAmount != item?.paidAmount}
                                onClick={() => handlePrint(item._id)}
                              > 
                                <i className="fas fa-external-link-alt text-info pr-2" />
                                Print
                              </button>
                             
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppointmentBill;
