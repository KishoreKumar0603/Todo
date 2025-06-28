import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import axiosInstance from "../Contexts/axiosInstance";
import "../assets/styles/pages/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Todo | Login";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error
    try {
      const res = await axiosInstance.post("/users/login", { email, password });
      console.log(res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/"); // navigate to dashboard or home
      } else {
        setError(res.data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#F2F6FF",
        backgroundImage:
          "repeating-linear-gradient(45deg, #f9f9f9, #f9f9f9 10px, #f1f1f1 10px, #f1f1f1 20px)",
      }}
    >
      <div className="p-4 shadow box">
        <h3 className="text-center mb-5 fw-bold">Welcome back</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: "6px" }}
            />
          </div>

          <div className="mb-1 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: "6px" }}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "7px",
                right: "15px",
                cursor: "pointer",
                color: "#6c757d",
              }}
            >
              {showPassword ? <VscEyeClosed /> : <VscEye />}
            </div>
          </div>

          {error && <div className="alert-login">{error}</div>}

          <button
            type="submit"
            className="btn w-100 mb-3 mt-4 btn-primary-theme"
            style={{ borderRadius: "6px" }}
          >
            Log In
          </button>
        </form>

        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-muted">OR</span>
          <hr className="flex-grow-1" />
        </div>

        <button
          className="btn btn-light w-100 border text-center"
          style={{ borderRadius: "6px" }}
          onClick={handleGoogleLogin}
        >
          <FaGoogle className="me-2" />
          Continue with Google
        </button>

        <p className="text-center mt-3" style={{ fontSize: "13px" }}>
          Don't have an account?{" "}
          <NavLink to="/signup" className="bold-link">
            Sign up here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
