import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import LogoBar from "../components/layout/LogoBar";
import { getbookbyuser } from "../api/api";
import moment from "moment";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch } from "react-redux";
import { setBookingId } from "../store/Reducers/BookingReducer";
import { useNavigate } from "react-router-dom";

const MyBooking = () => {
  const [userBooking, setUserBooking] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getbookbyuser();
      setUserBooking(response.data);
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

  //handle view
  const handelView = (id) => {
    dispatch(setBookingId(id));
    navigate("/viewbooking");
  };

  return (
    <div className="wrapper">
      <div className="main-header">
        <LogoBar />
        <Navbar />
      </div>
      <Sidebar />
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
              {loading ? (
                <Box sx={{ width: "100%", padding: "10px" }}>
                  <Skeleton variant="rectangular" height={118} />
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                </Box>
              ) : userBooking && userBooking.length > 0 ? (
                userBooking.map((booking) => (
                  <div
                    key={booking._id}
                    className="col-12"
                    style={{
                      flex: "0 0 100%",
                      maxWidth: "100%",
                      padding: "10px",
                    }}
                  >
                    <div
                      className="card"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        margin: "4px 50px",
                        padding: "20px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div
                        className="card-content"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <div
                          className="card-title-container d-flex justify-content-between"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <img
                            src="https://res.cloudinary.com/dq1dh4drp/image/upload/v1717580985/ipfpjfzmlyzcqoid0ndy.png"
                            alt="Card Icon"
                            className="avatar-img rounded"
                            style={{
                              width: "90px",
                              height: "60px",
                              marginRight: "10px",
                            }}
                          />
                          <div>
                            <h3
                              className="card-title"
                              style={{
                                fontSize: "1.2em",
                                margin: "0",
                                color: "#222831",
                                fontWeight: "bold",
                              }}
                            >
                              {booking?.productId?.name}
                            </h3>
                            <p
                              className="card-category"
                              style={{
                                fontSize: "0.9em",
                                color: "#666",
                                marginTop: "5px",
                              }}
                            >
                              Price: ₹{booking.totalAmount}
                            </p>
                          </div>
                          <p
                            className="card-date"
                            style={{ fontSize: "0.9em", color: "#666" }}
                          >
                            Date: {moment(booking.date).format("MMMM Do YYYY")}
                          </p>
                        </div>
                        <p
                          className="card-description"
                          style={{
                            fontSize: "0.9em",
                            margin: "20px 0",
                            color: "#31363F",
                            fontWeight: "inherit",
                          }}
                        >
                          {booking.productId.details}
                        </p>
                      </div>
                      <div
                        className="card-footer d-flex justify-content-between"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <button
                          className="btn btn-secondary btn-border"
                          style={{
                            backgroundColor: "#ffffff00",
                            color: "rgb(52, 72, 197)",
                            border: "none",
                            padding: "6px 10px",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          onClick={(e) => handelView(booking?._id)}
                        >
                          Learn more...
                        </button>
                        <span
                          className={`card-status ${
                            booking.status === "Approved"
                              ? "text-success"
                              : booking.status === "Pending"
                              ? "text-secondary"
                              : "text-danger"
                          }`}
                          style={{
                            marginLeft: "auto",
                            fontSize: "1.1em",
                            fontWeight: "bold",
                          }}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No bookings available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
