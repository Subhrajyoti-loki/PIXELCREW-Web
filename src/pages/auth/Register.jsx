import React from "react";
import { Link ,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./auth.css";
import { signup } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {

  const navigate = useNavigate();

  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useForm();

  const avatar = ""; // Default avatar value, update if necessary

  // onSubmit
  const onSubmit = async (data) => {
    const { username, fullname, email, mobile, password, bio, address } = data;

    const Payload = {
      username,
      fullname,
      email,
      avatar,
      mobile,
      password,
      bio,
      address,
    };

    try {
      const res = await signup(Payload);

      if (res.status === 200 || res.status === 201) {
        toast.success("Registration successful");
        navigate('/login');
      } else {
        toast.error("Error occurred during registration");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="registerStyle py-5 "
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dq1dh4drp/image/upload/v1716712270/2211.w026.n002.2795B.p1.2795_y4six6.jpg')`,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="wrapper-login wrapperRegister"
        style={{
          backgroundColor: "#ffffff00",
          border: "1px solid white",
          borderRadius: "5px",
          marginRight: "5px",
          padding: "5px 10px",
        }}
      >
        <div className="container container-login animated fadeIn">
          <h2 className="text-center pb-3 font-weight-bold text-success">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="form-group row">
              <div className="col-md-6 mb-3">
                <label htmlFor="fullname" className="placeholder text-success">
                  <b>Full Name</b>
                </label>
                <input
                  {...register("fullname", {
                    required: "Full Name is required",
                  })}
                  id="fullname"
                  type="text"
                  className={`form-control ${
                    errors.fullname ? "is-invalid" : ""
                  }`}
                />
                {errors.fullname && (
                  <p className="invalid-feedback">{errors.fullname.message}</p>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="username" className="placeholder text-success">
                  <b>Username</b>
                </label>
                <input
                  {...register("username", {
                    required: "Username is required",
                  })}
                  id="username"
                  type="text"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                />
                {errors.username && (
                  <p className="invalid-feedback">{errors.username.message}</p>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="placeholder text-success">
                  <b>Email</b>
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  id="email"
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
                {errors.email && (
                  <p className="invalid-feedback">{errors.email.message}</p>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="mobile" className="placeholder text-success">
                  <b>Mobile</b>
                </label>
                <input
                  {...register("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid mobile number",
                    },
                  })}
                  id="mobile"
                  type="tel"
                  className={`form-control ${
                    errors.mobile ? "is-invalid" : ""
                  }`}
                />
                {errors.mobile && (
                  <p className="invalid-feedback">{errors.mobile.message}</p>
                )}
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="bio" className="placeholder text-success">
                  <b>Bio</b>
                </label>
                <textarea
                  {...register("bio")}
                  id="bio"
                  className="form-control"
                />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="address" className="placeholder text-success">
                  <b>Address</b>
                </label>
                <textarea
                  {...register("address")}
                  id="address"
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="password" className="placeholder text-success">
                  <b>Password</b>
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  id="password"
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                />
                {errors.password && (
                  <p className="invalid-feedback">{errors.password.message}</p>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="confirmPassword" className="placeholder text-success">
                  <b>Confirm Password</b>
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                  id="confirmPassword"
                  type="password"
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="invalid-feedback">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div className="form-group form-action-d-flex mb-3 text-center">
              <button
                type="submit"
                className="btn btn-danger col-md-12 mt-3 mt-sm-0 fw-bold mx-auto "
              >
                Register
              </button>
            </div>
            <div className="login-account" style={{ textAlign: "center" }}>
              <span className="msg text-warning">Already have an account?</span>
              <Link to="/login" id="show-login" className="link text-success">
                Login
              </Link>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
