import React, { useEffect, useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { signin } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    getValues,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    const { email, password } = data;
    const payload = { email, password };

    try {
        const response = await toast.promise(signin(payload), {
            pending: "Logging in...",
            success: "Login successful",
            error: "Error occurred during login",
        });

        if (response.status === 200 || response.status === 201) {
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userid", response.data.user?._id);
                localStorage.setItem("userRole", response.data.user?.role);
                toast.success("Login successful");
                if (response.data.user?.role =="admin") {
                  navigate("/dashboard");
                } else {
                  navigate("/feed");
                }
                
            } else {
                toast.error("Something went wrong while logging in");
            }
        } else {
            // Handle specific error responses
            const errorMessage = response.data?.error || "Error occurred during login";
            toast.error(errorMessage);
        }
    } catch (error) {
        // Display the error message from the backend response if available
        const errorMessage = error.response?.data?.error || error.message;
        toast.error(errorMessage);
    } finally {
        setIsLoading(false);
    }
};


  return (
    <div
      className="loginStyle"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dq1dh4drp/image/upload/v1716708620/14658088_5509862_deoidw.jpg')`,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className=" wrapper-login wrapperLogin"
        style={{
          backgroundColor: "#ffffff00",
          border: "1px solid white",
          borderRadius: "5px",
          marginRight: "5px",
          padding: "5px 10px",
        }}
      >
        <div
          className="container container-login animated fadeIn"
          style={{ display: "block" }}
        >
          <h2 className="text-center pb-3 font-weight-bold text-success">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="form-group">
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
                name="email"
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && (
                <p className="invalid-feedback">{errors.email.message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="placeholder text-success">
                <b>Password</b>
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                id="password"
                name="password"
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              {errors.password && (
                <p className="invalid-feedback">{errors.password.message}</p>
              )}
            </div>
            <div className="form-group form-action-d-flex mb-3 text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary col-md-12 mt-3 mt-sm-0 fw-bold mx-auto"
              >
                Login
              </button>
            </div>
            <div className="login-account" style={{ textAlign: "center" }}>
              <span className="msg text-warning">Don't have an account yet ?</span>
              <Link to="/register" id="show-signup" className="link">
                {" "}
                Register
              </Link>
            </div>
          </form>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
