import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/layout/AdminNavbar";
import AdminSidebar from "../components/layout/AdminSidebar";
import LogoBar from "../components/layout/LogoBar";
import {
  getuserCount,
  getPostCount,
  getCountDate,
  getbookingCount,
  getLikeCount,
} from "../api/api";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";


function Admindashboard() {
  const [Data, setData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [userData, setUserdata] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [likes, setLikes] = useState(null);

  // Fetch all post data counts
  const fetchData = async () => {
    try {
      const response = await getPostCount();
      setData(response.data);
    } catch (error) {
      console.log("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch all post like and comment counts
  const fetchLikes = async () => {
    try {
      const response = await getLikeCount();
      setLikes(response.data);
    } catch (error) {
      console.log("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  // Prepare data for the pie chart
  const pieData = {
    labels: ["Active Posts", "Inactive Posts", "Total Posts"],
    datasets: [
      {
        label: "Posts Status",
        data: [
          Data?.activeCount || 0,
          Data?.inactiveCount || 0,
          Data?.totalCount || 0,
        ],
        backgroundColor: ["#6FDCE3", "#B6BBC4", "#7743DB"],
        borderColor: ["#F3F7EC", "#F3F7EC", "#F3F7EC"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Fetch all post count per date
  const fetchPostData = async () => {
    try {
      const response = await getCountDate();
      setPostData(response.data);
    } catch (error) {
      console.log("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: postData?.map((item) => item._id) || [],
    datasets: [
      {
        label: "Posts Count",
        data: postData?.map((item) => item.count) || [],
        backgroundColor: "#7743DB",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Fetch all User data counts
  const fetchuserData = async () => {
    try {
      const response = await getuserCount();
      setUserdata(response.data);
    } catch (error) {
      console.log("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchuserData();
  }, []);

  //booking count fetch
  const FetchBooking = async () => {
    try {
      const response = await getbookingCount();
      setBookingData(response.data);
    } catch (error) {
      console.log("Error fetching Booking data:", error.message);
    }
  };

  useEffect(() => {
    FetchBooking();
  }, []);

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
            <div className="mt-4">
              <div className="row">
                <div className="col-sm-6 col-lg-3">
                  <div className="card p-3">
                    <div className="d-flex align-items-center">
                      <span className="stamp stamp-md bg-secondary mr-3">
                        <i className="fas fa-file-image"></i>
                      </span>
                      <div>
                        <h5 className="mb-1">
                          <b>
                            <Link to="/posts">
                              {Data?.totalCount} <small>Posts</small>
                            </Link>
                          </b>
                        </h5>
                        <small className="text-muted">
                          {Data?.activeCount} active posts
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card p-3">
                    <div className="d-flex align-items-center">
                      <span className="stamp stamp-md bg-secondary mr-3">
                        <i className="fa fa-shopping-cart"></i>
                      </span>
                      <div>
                        <h5 className="mb-1">
                          <b>
                            <Link to="/appointment">
                              {bookingData?.totalCount} <small>Orders</small>
                            </Link>
                          </b>
                        </h5>
                        <small className="text-muted">
                          {bookingData?.PendingCount} pending orders
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card p-3">
                    <div className="d-flex align-items-center">
                      <span className="stamp stamp-md bg-secondary mr-3">
                        <i className="fa fa-users"></i>
                      </span>
                      <div>
                        <h5 className="mb-1">
                          <b>
                            <Link to="/userlist" >
                              {userData?.totalCount} <small>Users</small>
                            </Link>
                          </b>
                        </h5>
                        <small className="text-muted">
                          {userData?.activeCount} active today
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card p-3">
                    <div className="d-flex align-items-center">
                      <span className="stamp stamp-md bg-secondary mr-3">
                        <i className="fa fa-comment-alt"></i>
                      </span>
                      <div>
                        <h5 className="mb-1">
                          <b>
                            <a href="#">
                            {likes?.totalLikes} <small>Likes</small>
                            </a>
                          </b>
                        </h5>
                        <small className="text-muted">{likes?.totalComments} comments</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title">Monthly Post</div>
                    </div>
                    <div className="card-body">
                      <div
                        className="chart-container"
                        style={{ height: "400px" }}
                      >
                        <canvas id="barChart" width="60" height="60"></canvas>
                        <Bar data={chartData} options={chartOptions} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title">Post Count Chart</div>
                    </div>
                    <div className="card-body">
                      <div
                        className="chart-container"
                        style={{ height: "400px" }}
                      >
                        <Pie data={pieData} options={pieOptions} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admindashboard;
