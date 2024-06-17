import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import LogoBar from "../components/layout/LogoBar";
import {
  getbookbyuser,
  Createorder,
  VerifyPayment,
} from "../api/api";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
const razorpayid = process.env.REACT_APP_RAZORPAY_KEY_ID;

const Payment = () => {
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

  // Load Razorpay script
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (booking) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const orderResponse = await Createorder({
      bookingId: booking._id,
      amount: booking.totalAmount,
      currency: "INR",
    });

    const { orderId } = orderResponse.data;

    const options = {
      key: razorpayid,
      amount: booking.totalAmount * 100,
      currency: "INR",
      name: "PIXELCREW",
      description: booking?.productId?.name,
      image:
        "https://res.cloudinary.com/dq1dh4drp/image/upload/v1717580985/ipfpjfzmlyzcqoid0ndy.png",
      order_id: orderId,
      handler: async (response) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        const data = {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          bookingId: booking._id,
        };

        await VerifyPayment(data);
        alert("Payment Successful");
        fetchData();
      },
      prefill: {
        name: booking.userId.fullname,
        email: booking.userId.email,
        contact: booking.userId.mobile,
      },
      notes: {
        address: "Your Company Address",
      },
      theme: {
        color: "#6610f2",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
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
                    key={booking?._id}
                    className="col-md-5 col-sm-12"
                    style={{ padding: "10px" }}
                  >
                    <div
                      className="card card-dark bg-secondary-gradient"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        margin: "10px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div
                        className="card-body bubble-shadow"
                        style={{ padding: "20px" }}
                      >
                        <h1 style={{ color: "#ffffff" }}>
                        &#8377;{booking.totalAmount}
                        </h1>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "10px",
                          }}
                        >
                          <div>
                            <h3
                              className="card-title"
                              style={{
                                fontSize: "1.2em",
                                margin: "0",
                                color: "#ffffff",
                                fontWeight: "bold",
                              }}
                            >
                              {booking?.productId?.name}
                            </h3>
                            <p
                              className="card-category"
                              style={{
                                fontSize: "0.9em",
                                color: "#ffffff",
                                marginTop: "5px",
                              }}
                            >
                              {booking.productId.details}
                            </p>
                          </div>
                        </div>
                        <div
                          className="card-footer d-flex justify-content-between"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "10px",
                          }}
                        >
                          <button
                            className="btn"
                            style={{
                              backgroundColor: "#ffffff00",
                              color: "#ffffff",
                              border: "2px solid #ffffff",
                              padding: "6px 10px",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                            onClick={() => displayRazorpay(booking)}
                          >
                            Pay Now
                          </button>
                        </div>
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

export default Payment;
