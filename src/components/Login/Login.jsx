import React, { useState, useEffect, useContext } from "react";
import "./Login.css";
import commonApi from "../../api/common";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router";
import Toast from "../../api/toast";
import "react-notifications-component/dist/theme.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Login() {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();
  // Use the useState hook to create state variables for the form fields and errors
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    setErrors({});

    const newErrors = {};

    if (email.trim().length === 0) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (password.trim().length === 0) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    validateForm();

    if (Object.keys(errors).length === 0) {
      await commonApi({
        action: "login",
        data: {
          email: email,
          password: password,
        },
      })
        .then(({ DATA = {}, MESSAGE }) => {
          let { token, ...data } = DATA;
          dispatch({ type: "LOGIN_SUCCESS", payload: data, token: token });
          Toast.success(MESSAGE);
          navigate("/");
        })
        .catch((error) => {
          dispatch({ type: "LOGIN_FAILURE" });
          if (
            error.response &&
            error.response.data &&
            error.response.data.DATA
          ) {
            if (error.response.data.DATA === "email") {
              setErrors({ email: error.response.data.MESSAGE });
            }
          }
          console.error(error);
        });
    }
  };

  // Render the Login form
  return (
    <>
      <Navbar />
      <div className="container">
        <main className="login-container">
          <div className="heading-signup">
            To Access Service LOGIN<span className="custom-dot">.</span>
          </div>
          <p className="text-mute">
            If not a member? <a href="/signup">Sign Up</a>
          </p>
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="email" className="login-label">
              Email:
            </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(event) => setUsername(event.target.value)}
              className={`login-input ${errors.username ? "input-error" : ""}`}
            />
            <div
              className={`error-message ${
                errors.username ? "visible" : "hidden"
              }`}
            >
              {errors.username}
            </div>
            <label htmlFor="password" className="login-label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`login-input ${errors.password ? "input-error" : ""}`}
            />
            <div
              className={`error-message ${
                errors.password ? "visible" : "hidden"
              }`}
            >
              {errors.password}
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <br />
            <p className="text-mute">
              If not a member? <a href="/signup">Sign Up</a>
            </p>
          </form>
        </main>

        <div className="welcome-container">
          <h1 className="heading-secondary">
            Welcome to{" "}
            <span className="lg">
              SettleOUT! <br></br>
            </span>
            <span> Your One Stop Navigator for Your New Life In Regina</span>{" "}
          </h1>
          <br></br>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
