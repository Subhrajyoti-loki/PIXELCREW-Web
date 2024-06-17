import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/layout/AdminNavbar";
import AdminSidebar from "../components/layout/AdminSidebar";
import LogoBar from "../components/layout/LogoBar";
import { getAllContact } from "../api/api";
import { Link } from "react-router-dom";
import moment from "moment";
import Pagination from "@mui/material/Pagination";

function ReviewSupport() {
  const [item, setItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await getAllContact({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
      });
      if (Array.isArray(response.data.documents)) {
        setItem(response.data.documents);
        setTotalItems(response.data.paginatedInfo.totalItems);
        setTotalPages(response.data.paginatedInfo.totalPages);
      } else {
        setItem([]);
      }
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, currentPage, itemsPerPage]);

  //search handler
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //pagination
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
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
            <div className="page-header d-flex flex-column flex-md-row align-items-center justify-content-between">
              <h4 className="page-title mb-3 mb-md-0"># Support</h4>
              <ul className="breadcrumbs d-flex flex-wrap align-items-center mb-3 mb-md-0">
                <li className="nav-home">
                  <Link to="/dashboard">
                    <i className="flaticon-home" />
                  </Link>
                </li>
                <li className="separator">
                  <i className="flaticon-right-arrow" />
                </li>
                <li className="nav-item">
                  <Link to="/">Settings</Link>
                </li>
                <li className="separator">
                  <i className="flaticon-right-arrow" />
                </li>
                <li className="nav-item">
                  <Link to="/reviewsupoort">Messages</Link>
                </li>
              </ul>
              <form className="navbar-right navbar-form nav-search form-inline d-flex flex-column flex-md-row align-items-center m-0 p-0">
                <div className="input-group mb-3 mb-md-0 mx-2 mx-sm-5">
                  <div className="input-group-prepend">
                    <button type="submit" className="btn btn-search pr-1">
                      <i className="fa fa-search search-icon"></i>
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search ..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <div
                  className="btn-group mt-3 mt-md-0"
                  role="group"
                  aria-label="Table Actions"
                >
                  <button
                    className="btn btn-outline-primary btn-icon mx-1 d-none d-md-inline"
                    title="Export In Excel"
                  >
                    <i
                      className="fas fa-file-excel text-success"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                  </button>
                  <button
                    className="btn btn-outline-primary btn-icon mx-1 d-none d-md-inline"
                    title="Export In Pdf"
                  >
                    <i
                      className="fas fa-file-pdf text-danger"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                  </button>
                </div>
              </form>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table
                        id="basic-datatables"
                        className="table table-hover"
                      >
                        <thead className="thead-light">
                          <tr className="text-center">
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email </th>
                            <th>Mobile</th>
                            <th>Message</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.map((data, index) => (
                            <tr key={index} className="text-center">
                              <td>{data.firstName}</td>
                              <td>{data.lastName}</td>
                              <td>{data.emailId}</td>
                              <td>{data.MobileNo}</td>
                              <td>
                                {data.Message?.length > 30
                                  ? `${data.Message.substring(0, 30)}...`
                                  : data.Message}
                              </td>
                              <td>{moment(data.createdAt).fromNow()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="row d-flex justify-content-between mt-3 w-100">
                        <div className="col-12 col-md-4 d-flex align-items-center">
                          <label className="m-2" htmlFor="itemPerPage">
                            Select items per page
                          </label>
                          <select
                            id="itemPerPage"
                            className="form-control w-auto"
                            onChange={handleItemsPerPageChange}
                            value={itemsPerPage}
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                        </div>
                        <div className="col-12 col-md-4 d-flex justify-content-center mt-3 mt-md-0">
                          <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            variant="outlined"
                            shape="rounded"
                            color="primary"
                          />
                        </div>
                        <div className="col-12 col-md-4 d-flex justify-content-end align-items-center mt-3 mt-md-0">
                          <p className="m-0">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                            {Math.min(currentPage * itemsPerPage, totalItems)}{" "}
                            Of{" "}
                            <button className="btn btn-icon btn-border btn-secondary btn-xs mx-1">
                              {totalItems}
                            </button>{" "}
                            items
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
      </div>
    </div>
  );
}

export default ReviewSupport;
