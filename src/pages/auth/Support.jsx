import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./auth.css";
import { Contact } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Support = () => {
  const {
    handleSubmit,
    getValues,
    register,
    reset, 
    formState: { errors },
  } = useForm();

  const [showModal, setShowModal] = useState(false);

  // onSubmit
  const onSubmit = async (data) => {
    const { lastName, firstName, emailId, MobileNo, Message } = data;

    const Payload = {
      lastName,
      firstName,
      emailId,
      MobileNo,
      Message,
    };

    try {
      const res = await Contact(Payload);

      if (res.status === 200 || res.status === 201) {
        reset(); 
        setShowModal(true);
      } else {
        toast.error("Error occurred while Contact");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to close the modal
  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div
      className="registerStyle py-5"
      style={{
        // backgroundImage: `url('https://res.cloudinary.com/dq1dh4drp/image/upload/v1716961401/pixelwide_h3j6uj.png')`,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor:"#E88D67"
      }}
    >
      <div
        className="wrapper-login wrapperRegister"
        style={{
          backgroundColor: "#686D76",
          border: "1px solid white",
          borderRadius: "5px",
          marginRight: "5px",
          padding: "5px 10px",
        }}
      >
        <div className="container container-login animated fadeIn">
          <h2 className=" pb-3 font-weight-bold text-white">
          <p>If you need any help, please contact our support team.</p>
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="form-group row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" className="placeholder text-white">
                  <b>First Name</b>
                </label>
                <input
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  id="firstName"
                  type="text"
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                />
                {errors.firstName && (
                  <p className="invalid-feedback">{errors.firstName.message}</p>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="placeholder text-white">
                  <b>Last Name</b>
                </label>
                <input
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  id="lastName"
                  type="text"
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                />
                {errors.lastName && (
                  <p className="invalid-feedback">{errors.lastName.message}</p>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="emailId" className="placeholder text-white">
                  <b>Email</b>
                </label>
                <input
                  {...register("emailId", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  id="emailId"
                  type="email"
                  className={`form-control ${
                    errors.emailId ? "is-invalid" : ""
                  }`}
                />
                {errors.emailId && (
                  <p className="invalid-feedback">{errors.emailId.message}</p>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="MobileNo" className="placeholder text-white">
                  <b>Mobile</b>
                </label>
                <input
                  {...register("MobileNo", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid mobile number",
                    },
                  })}
                  id="MobileNo"
                  type="tel"
                  className={`form-control ${
                    errors.MobileNo ? "is-invalid" : ""
                  }`}
                />
                {errors.MobileNo && (
                  <p className="invalid-feedback">{errors.MobileNo.message}</p>
                )}
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="Message" className="placeholder text-white">
                  <b>Message</b>
                </label>
                <textarea
                  {...register("Message")}
                  id="Message"
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group form-action-d-flex mb-3 text-center">
              <button
                type="submit"
                className="btn btn-success col-md-12 mt-3 mt-sm-0 fw-bold mx-auto "
              >
                Submit
              </button>
            </div>
            <div className="login-account" style={{ textAlign: "center" }}>
              <Link to="/feed" id="show-login" className="link text-white">
                Home
              </Link>
            </div>
          </form>

          {/* SweetAlert modal */}
          {showModal && (
            <div className="swal-overlay swal-overlay--show-modal" tabIndex="-1">
              <div className="swal-modal" role="dialog" aria-modal="true">
                <div className="swal-icon swal-icon--success">
                  <i className="fas fa-check-circle fa-4x text-success"></i>
                </div>
                <div className="swal-title">Thank You For Contacting Us!</div>
                <div className="swal-text">We will Get Back to You Soon!</div>
                <div className="swal-footer">
                  <Link to="/feed" className="swal-button-container">
                    <button
                      onClick={handleModalClose}
                      className="swal-button swal-button--confirm btn btn-success"
                    >
                      Go Back
                    </button>
                    <div className="swal-button__loader">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Support;
