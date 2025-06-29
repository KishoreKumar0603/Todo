import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/"); // navigate to dashboard/home
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default OAuthSuccess;
