import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import axiosInstance from "../Contexts/axiosInstance";
import '../assets/styles/pages/login.css';

const SignUp = () => {
  useEffect(() => {
    document.title = "Todo | SignUp";
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!formData.agree) {
      setErr("Please agree to the terms & conditions.");
      return;
    }

    try {
      const res = await axiosInstance.post("/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log(res.data);

      if (res.data.token) {
        // Auto-login after signup:
        localStorage.setItem("token", res.data.token);
        window.alert("Registered successfully! Redirecting to dashboard...");
        navigate("/");
      } else {
        setErr(res.data.error || "Something went wrong.");
      }
    } catch (error) {
      setErr(error.response?.data?.error || "An error occurred.");
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        backgroundImage:
          "repeating-linear-gradient(45deg, #f9f9f9, #f9f9f9 10px, #f1f1f1 10px, #f1f1f1 20px)",
      }}
    >
      <div className="p-4 shadow box">
        <h3 className="text-center mb-1 fw-bold">Join our task</h3>
        <p className="text-center text-muted mb-4" style={{ fontSize: "13px" }}>
          Create and maintain new tasks with us
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ borderRadius: "6px" }}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ borderRadius: "6px" }}
            />
          </div>

          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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

          {err && <div className="alert-login">{err}</div>}

          <div className="form-check mb-3 mt-4">
            <input
              className="form-check-input"
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              required
              id="terms"
            />
            <label
              className="form-check-label"
              htmlFor="terms"
              style={{ fontSize: "13px" }}
            >
              I agree to the terms & conditions
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary-theme w-100"
            style={{ borderRadius: "6px" }}
          >
            Sign Up
          </button>
        </form>

        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-muted">OR</span>
          <hr className="flex-grow-1" />
        </div>

        <button
          className="btn btn-light w-100 border"
          style={{ borderRadius: "6px" }}
          onClick={handleGoogleSignup}
        >
          <FaGoogle className="me-2" />
          Sign up with Google
        </button>

        <p className="text-center mt-3" style={{ fontSize: "13px" }}>
          Already have an account?{" "}
          <NavLink to="/login" className="bold-link">
            Log In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
