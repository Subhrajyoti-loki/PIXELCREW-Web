import React, { useEffect, useState, useRef } from "react";
import AdminNavbar from "../components/layout/AdminNavbar";
import AdminSidebar from "../components/layout/AdminSidebar";
import LogoBar from "../components/layout/LogoBar";
import { getBooking } from "../api/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentBillPrint = () => {
  const bookingId = useSelector((state) => state.booking.bookingId);
  const navigate = useNavigate();

  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lineData, setLineData] = useState({});

  const fetchData = async () => {
    try {
      if (bookingId) {
        const response = await getBooking(bookingId);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setItemList(response.data[0]);
        } else {
          toast.warn("No booking data found");
        }
      } else {
        toast.warn("Please select at least a bill");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [bookingId]);

  const handleClose = () => {
    navigate("/bill");
  };

  const billComponentRef = useRef();
  const lineComponentRef = useRef();

  const handleBillPrint = useReactToPrint({
    content: () => billComponentRef.current,
  });

  const handlePrintLine = useReactToPrint({
    content: () => lineComponentRef.current,
  });

  const generateBillNo = () => {
    const billNo = Math.floor(Math.random() * 1000) + 1;
    return billNo;
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
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header d-flex">
                    <h4 className="card-title"># Bill</h4>
                    <button
                      className="btn btn-danger btn-border ml-auto"
                      onClick={handleClose}
                    >
                      <span>Close</span>
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12 py-3">
                        {loading ? (
                          <Skeleton variant="rectangular" height={400} />
                        ) : (
                          <div ref={billComponentRef}>
                            <div className="card mb-2">
                              <div
                                className="d-flex justify-content-between align-items-center"
                                style={{ height: "95px" }}
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
                                    }}
                                    className="p-0 m-0"
                                  >
                                    Bill No: #{generateBillNo()}
                                  </p>
                                  <p
                                    style={{
                                      fontWeight: "600",
                                      fontSize: "12px",
                                    }}
                                    className="p-0 m-0"
                                  >
                                    Date:{" "}
                                    {moment(itemList.updatedAt).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                              <div
                                className="billNo px-3"
                                style={{ textAlign: "left" }}
                              >
                                <p
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "12px",
                                  }}
                                  className="p-0 m-0"
                                >
                                  To:
                                </p>
                                <p
                                  style={{ fontSize: "12px" }}
                                  className="p-0 m-0"
                                >
                                  {itemList.userId?.fullname}
                                </p>
                                <p
                                  style={{ fontSize: "12px" }}
                                  className="p-0 m-0"
                                >
                                  Username: {itemList.userId?.username}
                                </p>
                                <p
                                  style={{ fontSize: "12px" }}
                                  className="p-0 m-0"
                                >
                                  Email: {itemList.userId?.email}
                                </p>
                                <p
                                  style={{ fontSize: "12px" }}
                                  className="p-0 m-0"
                                >
                                  Mobile No: {itemList.userId?.mobile}
                                </p>
                              </div>
                              <div
                                className="billNo px-3"
                                style={{ textAlign: "right" }}
                              >
                                <p
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "12px",
                                  }}
                                  className="p-0 m-0"
                                >
                                  Product:
                                </p>
                                <p
                                  style={{ fontSize: "12px" }}
                                  className="p-0 m-0"
                                >
                                  Booking Date:{" "}
                                  {moment(itemList.createdAt).format(
                                    "DD/MM/YYYY"
                                  )}
                                </p>
                                <p
                                  style={{ fontSize: "12px" }}
                                  className="p-0 m-0"
                                >
                                  Name: {itemList.productId?.name}
                                </p>
                                <p
                                  style={{ fontSize: "12px" }}
                                  className="p-0 m-0"
                                >
                                  Kolkata
                                </p>
                                <p
                                  style={{ fontSize: "12px" }}
                                  className="p-0 m-0"
                                >
                                  +1605-766-0061
                                </p>
                                <p
                                  style={{ fontSize: "12px" }}
                                  className="p-0 m-0"
                                >
                                  pixelcrew@connect.com
                                </p>
                              </div>
                            </div>

                            <div className="table-responsive mt-4">
                              <table className="table table-hover">
                                <thead style={{ backgroundColor: "#f0f0f0" }}>
                                  <tr className="text-center">
                                    <th>Amount</th>
                                    <th>Payment Mode</th>
                                    <th>Date</th>
                                    <th>Print</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {itemList.BillSummary?.map((bill, index) => (
                                    <tr key={index} className="text-center">
                                      <td>{bill.recivedAmount}</td>
                                      <td>{bill.payVia}</td>
                                      <td>
                                        {moment(bill.Date).format("DD/MM/YYYY")}
                                      </td>
                                      <td>
                                        <button
                                          onClick={() => {
                                            handlePrintLine();
                                            setLineData(bill);
                                          }}
                                          className="btn btn-sm"
                                          title="Print"
                                        >
                                          <i
                                            style={{ fontSize: "18px" }}
                                            className="fas fa-print text-dark"
                                          />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                              <div
                                className="billNo px-3"
                                style={{ textAlign: "left" }}
                              ></div>
                              <div
                                className="billNo px-3"
                                style={{ textAlign: "right", width: "400px" }}
                              >
                                <div
                                  style={{ background: "#f0f0f0" }}
                                  className="py-2 px-3 mb-2"
                                >
                                  <span style={{ fontSize: "16px" }}>
                                    Total: ₹{itemList.totalAmount}
                                  </span>
                                </div>
                                <div
                                  style={{ background: "#f0f0f0" }}
                                  className="py-2 px-3 mb-2"
                                >
                                  <span style={{ fontSize: "16px" }}>
                                    Amount Recieved: ₹{itemList.paidAmount}
                                  </span>
                                </div>
                                <div
                                  style={{ background: "#f0f0f0" }}
                                  className="py-2 px-3 mb-2"
                                >
                                  <span style={{ fontSize: "16px" }}>
                                    Due Amount: ₹{itemList.dueAmount}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-end">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={handleBillPrint}
                      title="Print Bill"
                    >
                      Print Bill <i className="fas fa-print" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* hidden line item for printing */}
            <div className="d-none">
              <div ref={lineComponentRef} className="mt-4">
                <div className="card mb-2">
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ height: "95px" }}
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
                    <div className="billNo px-3" style={{ textAlign: "right" }}>
                      <p
                        style={{
                          fontWeight: "600",
                          fontSize: "13px",
                        }}
                        className="p-0 m-0"
                      >
                        Bill No: #{generateBillNo()}
                      </p>
                      <p
                        style={{
                          fontWeight: "600",
                          fontSize: "12px",
                        }}
                        className="p-0 m-0"
                      >
                        {lineData.Date &&
                          moment(lineData.Date).format("DD/MM/YYYY")}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    backgroundColor: "#f0f0f0",
                    padding: "8px 10px",
                    fontSize: "14px",
                  }}
                >
                  <div className="billNo px-3" style={{ textAlign: "left" }}>
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "12px",
                      }}
                      className="p-0 m-0"
                    >
                      To:
                    </p>
                    <p style={{ fontSize: "12px" }} className="p-0 m-0">
                      {itemList.userId?.fullname}
                    </p>
                    <p style={{ fontSize: "12px" }} className="p-0 m-0">
                      Username: {itemList.userId?.username}
                    </p>
                    <p style={{ fontSize: "12px" }} className="p-0 m-0">
                      Email: {itemList.userId?.email}
                    </p>
                    <p style={{ fontSize: "12px" }} className="p-0 m-0">
                      Mobile No: {itemList.userId?.mobile}
                    </p>
                  </div>
                  <div className="billNo px-3" style={{ textAlign: "right" }}>
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "12px",
                      }}
                      className="p-0 m-0"
                    >
                      Product:
                    </p>
                    <p style={{ fontSize: "12px" }} className="p-0 m-0">
                      Booking Date:{" "}
                      {moment(itemList.createdAt).format("DD/MM/YYYY")}
                    </p>
                    <p style={{ fontSize: "12px" }} className="p-0 m-0">
                      Name: {itemList.productId?.name}
                    </p>
                    <p style={{ fontSize: "12px" }} className="p-0 m-0">
                      Kolkata
                    </p>
                    <p style={{ fontSize: "12px" }} className="p-0 m-0">
                      +1605-766-0061
                    </p>
                    <p style={{ fontSize: "12px" }} className="p-0 m-0">
                      pixelcrew@connect.com
                    </p>
                  </div>
                </div>
                <div className="table-responsive mt-2">
                  <table className="table table-hover">
                    <thead style={{ backgroundColor: "#f0f0f0" }}>
                      <tr className="text-center">
                        <th>Amount</th>
                        <th>Payment Mode</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center">
                        <td>{lineData.recivedAmount}</td>
                        <td>{lineData.payVia}</td>
                        <td>
                          {lineData.Date &&
                            moment(lineData.Date).format("DD/MM/YYYY")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  className="text-center"
                  style={{
                    backgroundColor: "#f0f0f0",
                    padding: "10px",
                    fontSize: "14px",
                  }}
                >
                  <p className="m-0">
                    Thank you for your business! If you have any questions,
                    please feel free to contact us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AppointmentBillPrint;
