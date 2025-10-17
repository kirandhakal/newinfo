import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from localStorage
    // localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Optionally, you can clear other stored info
    localStorage.clear();

    // Redirect to home page
    navigate("/home");
    console.log("yoo");
  }, [navigate]);

  return null; // No UI needed
};

export default Logout;
