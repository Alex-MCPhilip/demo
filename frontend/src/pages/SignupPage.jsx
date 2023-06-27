import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Signup from "../components/Signup/Signup.jsx";

const SignupPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);


  useEffect(() => {
    if (isAuthenticated) {
      if (user && user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, user, navigate]);
  return (
    <div>
        <Signup />
    </div>
  )
}

export default SignupPage