import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import LogoBar from "../components/layout/LogoBar";
import { getBooking } from "../api/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "@mui/material/Skeleton";
import moment from "moment";

function ViewBooking() {
  const bookid = useSelector((state) => state.booking.bookingId);
  const navigate = useNavigate();
  const [viewdata, setViewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const GetBookingDetails = async () => {
    try {
      if (bookid) {
        const response = await getBooking(bookid);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setViewData(response.data[0]);
        } else {
          toast.error("no details found");
        }
      } else {
        toast.warn("Please Select Atleast one booking");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(viewdata);
  useEffect(() => {
    GetBookingDetails();
  }, [bookid]);

  //handle close function
  const handleClose = () => {
    navigate("/mybooking");
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
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className=" card-header d-flex">
                    <h4 className="card-title"># Booking Details</h4>
                    <button
                      className="btn btn-danger btn-border ml-auto"
                      onClick={handleClose}
                    >
                      <span>Close</span>
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12 py-3">
                        {loading ? (
                          <Skeleton variant="rectangular" height={400} />
                        ) : (
                          <div
                            className="card mb-2"
                            style={{
                              padding: "1.5rem",
                              boxShadow:
                                "0 0.15rem 1.75rem 0 rgba(58,59,69,0.15)",
                            }}
                          >
                            <div
                              className="d-flex justify-content-between align-items-center"
                              style={{
                                borderBottom: "1px solid #e3e6f0",
                                paddingBottom: "1rem",
                              }}
                            >
                              <div>
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
                              </div>
                              <div
                                className="billNo px-3"
                                style={{ textAlign: "right" }}
                              >
                                <p
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    margin: 0,
                                  }}
                                >
                                  Booking ID: {viewdata._id}
                                </p>
                                <p
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "12px",
                                    margin: 0,
                                  }}
                                >
                                  Date:{" "}
                                  {moment(viewdata.updatedAt).format(
                                    "DD/MM/YYYY"
                                  )}
                                </p>
                              </div>
                            </div>
                            <div
                              className="mt-3"
                              style={{ marginBottom: "1.5rem" }}
                            >
                              <h5
                                style={{
                                  fontSize: "1.125rem",
                                  fontWeight: "600",
                                  color: "#4e73df",
                                }}
                              >
                                Customer Details
                              </h5>
                              <p style={{ margin: "0.5rem 0" }}>
                                <strong>Name:</strong>{" "}
                                {viewdata.userId.fullname}
                              </p>
                              <p style={{ margin: "0.5rem 0" }}>
                                <strong>Email:</strong> {viewdata.userId.email}
                              </p>
                              <p style={{ margin: "0.5rem 0" }}>
                                <strong>Mobile:</strong>{" "}
                                {viewdata.userId.mobile}
                              </p>
                            </div>
                            <div
                              className="mt-3"
                              style={{ marginBottom: "1.5rem" }}
                            >
                              <h5
                                style={{
                                  fontSize: "1.125rem",
                                  fontWeight: "600",
                                  color: "#4e73df",
                                }}
                              >
                                Product Details
                              </h5>
                              <p style={{ margin: "0.5rem 0" }}>
                                <strong>Name:</strong> {viewdata.productId.name}
                              </p>
                              <p style={{ margin: "0.5rem 0" }}>
                                <strong>Details:</strong>{" "}
                                {viewdata.productId.details}
                              </p>
                            </div>
                            <div className="mt-3">
                              <h5
                                style={{
                                  fontSize: "1.125rem",
                                  fontWeight: "600",
                                  color: "#4e73df",
                                }}
                              >
                                Booking Information
                              </h5>
                              <p style={{ margin: "0.5rem 0" }}>
                                <strong>Date:</strong>{" "}
                                {moment(viewdata.date).format("DD/MM/YYYY")}
                              </p>
                              <p style={{ margin: "0.5rem 0" }}>
                                <strong>Status:</strong> {viewdata.status}
                              </p>
                              <p style={{ margin: "0.5rem 0" }}>
                                <strong>Total Amount:</strong> ₹
                                {viewdata.totalAmount}
                              </p>
                              <p style={{ margin: "0.5rem 0" }}>
                                <strong>Due Amount:</strong> ₹
                                {viewdata.dueAmount}
                              </p>
                              <p style={{ margin: "0.5rem 0" }}>
                                <strong>Paid Amount:</strong> ₹
                                {viewdata.paidAmount}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ViewBooking;
