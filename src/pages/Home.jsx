import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../api/api";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Home = () => {

  return (
    <div
      style={{
        backgroundColor: "#7a63ff",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <div style={{ padding: "3% 5%" }}>
        <nav
          className="navbar navbar-expand-lg navbar-dark"
          style={{ padding: "0 0 2rem" }}
        >
          <a
            className="navbar-brand"
            href=""
            style={{
              fontFamily: "Ubuntu",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#5dce94",
            }}
          >
            PIXELCREW
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/home"
                  style={{
                    fontFamily: "Montserrat-light",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#about"
                  style={{
                    fontFamily: "Montserrat-light",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  ABOUT
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#service"
                  style={{
                    fontFamily: "Montserrat-light",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  SERVICE
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#footer"
                  style={{
                    fontFamily: "Montserrat-light",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  CONTACT
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {/* Nav Bar */}

      {/* Title */}
      <div className="container-fluid" style={{ padding: "3% 15%" }}>
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-12 text-center text-lg-left">
            <h1
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "3.5rem",
                fontWeight: "bolder",
                lineHeight: "1.5",
                color: "#fff",
              }}
            >
              We capture your memories forever.
            </h1>
            <h2
              style={{ color: "#fff", fontSize: "2rem", fontWeight: "bolder" }}
            >
              Control. Create. Capture.
            </h2>
            <div className="d-flex flex-column flex-md-row align-items-center">
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button
                  type="button"
                  className="btn btn-dark btn-lg m-2"
                  style={{
                    fontWeight: "bolder",
                    marginRight: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                  }}
                >
                  <i className="fas fa-sign-in-alt pr-2"></i> Sign In
                </button>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <button
                  type="button"
                  className="btn btn-outline-light btn-lg m-2 fa-bounce"
                  style={{
                    fontWeight: "bolder",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                  }}
                >
                  <i className="fas fa-user-plus pr-2 "></i> Sign Up
                </button>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 text-center">
            <img
              className="img-fluid"
              src="https://res.cloudinary.com/dq1dh4drp/image/upload/v1716707511/the-photographer_t85zpe.jpg"
              alt="wallpaper-img"
              style={{ width: "80%", maxWidth: "100%" }}
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div
        id="about"
        style={{
          margin: "0px 60px 60px",
          backgroundColor: "black",
          color: "white",
          minHeight: "100vh",
          padding: "5% 10%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <img
                className="image1"
                src="https://res.cloudinary.com/dq1dh4drp/image/upload/v1716879633/title_image_x73ide.jpg"
                alt="About Us"
                style={{
                  width: "70%",
                  maxWidth: "100%",
                  border: "1px solid #000000",
                }}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div
                className="about-section"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: "#fff",
                  lineHeight: 1.5,
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                <h2>About</h2>
                <p>
                  With an interest in technology and art, photography soon
                  became a passion for us that we can't deny. Though Pixel Crew
                  got its start with photographers shooting photos of family
                  members, friends & nature. Now we all work with paying
                  clients. Over the years we have not only improved our
                  technique but also developed our personal style. Pixel Crew
                  always ensures that we use the latest equipment. We hold
                  consultations with potential clients to better understand
                  their needs. If you want to know more about our company feel
                  free to reach out to us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* feature Section */}
      <section
        id="features"
        style={{
          padding: "2% 0%",
          backgroundColor: "#fff",
          position: "relative",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <div className="row">
          <div
            className="col-lg-4 feature-box"
            style={{
              textAlign: "center",
              padding: "5%",
            }}
          >
            <i
              className="fas fa-check-circle fa-4x fa-bounce"
              style={{
                color: "#7A63FF",
                marginBottom: "1rem",
              }}
            ></i>
            <h3
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: "bold",
              }}
            >
              Easy to use.
            </h3>
            <p
              style={{
                color: "#8f8f8f",
                fontWeight: "bold",
              }}
            >
              Book your photoshoot with just a few clicks.
            </p>
          </div>

          <div
            className="col-lg-4 feature-box"
            style={{
              textAlign: "center",
              padding: "5%",
            }}
          >
            <i
              className="fas fa-camera-retro fa-4x fa-flip"
              style={{
                color: "#7A63FF",
                marginBottom: "1rem",
              }}
            ></i>
            <h3
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: "bold",
              }}
            >
              Elite Clientele.
            </h3>
            <p
              style={{
                color: "#8f8f8f",
                fontWeight: "bold",
              }}
            >
              Trusted by top brands and professionals.
            </p>
          </div>

          <div
            className="col-lg-4 feature-box"
            style={{
              textAlign: "center",
              padding: "5%",
            }}
          >
            <i
              className="fas fa-hand-holding-heart fa-4x fa-beat"
              style={{
                color: "#7A63FF",
                marginBottom: "1rem",
              }}
            ></i>
            <h3
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: "bold",
              }}
            >
              Guaranteed to work.
            </h3>
            <p
              style={{
                color: "#8f8f8f",
                fontWeight: "bold",
              }}
            >
              Capture perfect moments, every time.
            </p>
          </div>
        </div>

        {/* Hover effect */}
        <style>
          {`
          .icon:hover {
            color: #ff4c68;
          }
        `}
        </style>
      </section>

      {/* price Section */}
      <div
        id="service"
        className="container "
        style={{ backgroundColor: "#ffffff00", marginTop: "80px" }}
      >
        <div className="row justify-content-center align-items-center mb-5">
          <div className="col-md-3 pl-md-0">
            <div className="card-pricing2 card-primary">
              <div className="pricing-header">
                <h3 className="fw-bold">Standard Shoot</h3>
                <span className="sub-title">Capture Your Best Angles</span>
              </div>
              <div className="price-value">
                <div className="value">
                  <span className="currency">₹</span>
                  <span className="amount">3000</span>
                  <span className="month">/session</span>
                </div>
              </div>
              <ul className="pricing-content">
                <li>Up to 3 Hours Session</li>
                <li>30 Edited Photos</li>
                <li>High-Resolution Images</li>
                <li>1 Location</li>
                <li className="disable">Makeup Artist Included</li>
              </ul>
              <Link
                to="/register"
                className="btn btn-success btn-border btn-lg w-75 fw-bold mb-3"
              >
                Sign up
              </Link>
            </div>
          </div>
          <div className="col-md-3 pl-md-0 pr-md-0">
            <div className="card-pricing2 card-success">
              <div className="pricing-header">
                <h3 className="fw-bold">Wedding Shoot</h3>
                <span className="sub-title">
                  {" "}
                  Special Day Captured Beautifully
                </span>
              </div>
              <div className="price-value">
                <div className="value">
                  {/* <span className="currency">₹</span> */}
                  <span className="amount text-xm">50,000</span>
                  <span className="month">/event</span>
                </div>
              </div>
              <ul className="pricing-content">
                <li>Full Day Coverage</li>
                <li>100 Edited Photos</li>
                <li>High-Resolution Images</li>
                <li>2 Locations</li>
                <li>Video Highlights Included</li>
              </ul>
              <Link
                to="/register"
                className="btn btn-primary btn-border btn-lg w-75 fw-bold mb-3"
              >
                Sign up
              </Link>
            </div>
          </div>
          <div className="col-md-3 pr-md-0">
            <div className="card-pricing2 card-info">
              <div className="pricing-header">
                <h3 className="fw-bold">Pre Weeding</h3>
                <span className="sub-title">Memories of a Lifetime</span>
              </div>
              <div className="price-value">
                <div className="value">
                  <span className="amount">10,000</span>
                  <span className="month">/event</span>
                </div>
              </div>
              <ul className="pricing-content">
                <li>Up to 4 Hours Coverage</li>
                <li>50 Edited Photos</li>
                <li>High-Resolution Images</li>
                <li>1 Location</li>
                <li>Cinematic Video Included</li>
              </ul>
              <Link
                to="/register"
                className="btn btn-secondary btn-border btn-lg w-75 fw-bold mb-3"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* testimonial Section */}
      <section
        id="testimonial"
        style={{
          padding: "5%",
          backgroundColor: "black",
        }}
      >
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                ></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="d-block w-100"
                    src="https://res.cloudinary.com/dq1dh4drp/image/upload/v1716707405/digital-marketing-photography_pcfoia.jpg"
                    alt="First slide"
                  />
                  <div className="carousel-caption d-none d-md-block ">
                    <h5>John Doe</h5>
                    <p>"Great service, highly recommend!"</p>
                    <div>
                      <i
                        className="fa fa-star"
                        style={{ color: "#FFD700" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ color: "#FFD700" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ color: "#FFD700" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ color: "#FFD700" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ color: "#FFD700" }}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src="https://res.cloudinary.com/dq1dh4drp/image/upload/v1716689759/cld-sample-2.jpg"
                    alt="Second slide"
                  />
                  <div className="carousel-caption d-none d-md-block ">
                    <h5 style={{ color: "black" }}>Peter Lang</h5>
                    <p style={{ color: "black" }}>
                      {" "}
                      "Amazing experience, fantastic photos!"
                    </p>
                    <div>
                      <i
                        className="fa fa-star"
                        style={{ color: "#FFD700" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ color: "#FFD700" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ color: "#FFD700" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ color: "#FFD700" }}
                      ></i>
                      <i className="fa fa-star"></i>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src="https://res.cloudinary.com/dq1dh4drp/image/upload/v1716689756/samples/coffee.jpg"
                    alt="Third slide"
                  />
                  <div className="carousel-caption d-none d-md-block ">
                    <h5>Jamie</h5>
                    <p>"Very professional and creative!"</p>
                    <div>
                      <i
                        className="fa fa-star"
                        style={{ color: "#FFD700" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ color: "#FFD700" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ color: "#FFD700" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ color: "#FFD700" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ color: "#FFD700" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 ">
            <img
              className="wide-image"
              src="https://res.cloudinary.com/dq1dh4drp/image/upload/v1716961401/pixelwide_h3j6uj.png"
              alt="wide-img"
              style={{
                width: "90%",
              }}
            />
          </div>
        </div>
      </section>

      <footer
        id="footer"
        style={{
          padding: "7% 15%",
          textAlign: "center",
          backgroundColor: "#7A63FF",
        }}
      >
        <div className="bottom-container">
          <i
            className="icons fa-brands fa-twitter fa-2x text-dark"
            style={{ padding: "1%" }}
          ></i>
          <i
            className="icons fa-brands fa-facebook fa-2x text-dark"
            style={{ padding: "1%" }}
          ></i>
          <i
            className="icons fa-brands fa-instagram fa-2x text-dark"
            style={{ padding: "1%" }}
          ></i>
          <i
            className="icons fab fa-linkedin fa-2x text-dark"
            style={{ padding: "1%" }}
          ></i>
          <p
            className="copyright"
            style={{
              color: "#EAF6F6",
              fontSize: "0.85rem",
              padding: "20px 0px",
            }}
          >
            © Copyright pixel crew ©
          </p>
          <Link to="/contactus">
            <button
              type="button"
              className="btn btn-outline-light btn-lg"
              style={{
                display: "block",
                margin: "20px auto",
                padding: "10px 20px",
                fontSize: "1rem",
                borderRadius: "5px",
              }}
            >
              Contact Us
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
