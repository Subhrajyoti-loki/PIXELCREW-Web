import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UnauthorizedAccess = () => {
  const styles = {
    errorPage: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
    },
    heading: {
      fontSize: "3rem",
      color: "#dc3545",
      marginBottom: "1rem",
    },
    paragraph: {
      fontSize: "1.5rem",
      marginBottom: "2rem",
    },
  };

  const navigate = useNavigate();

  //logout function
  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    navigate("/login", { replace: true });
  }

  return (
    <div style={styles.errorPage}>
      <img
        src="https://res.cloudinary.com/dq1dh4drp/image/upload/v1717901082/404_lgerkd.png"
        alt="Card Icon"
        style={{
          width: "400px",
          height: "350px",
          marginRight: "10px",
        }}
      />
      <h1 style={styles.heading}>Oops! Page Not Open</h1>
      <p style={styles.paragraph}>
        You do not have permission to view this page.
      </p>
      <Link to="/login" className="btn btn-secondary" onClick={handleLogOut}>
        Go to Login
      </Link>
    </div>
  );
};

export default UnauthorizedAccess;
