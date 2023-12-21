import React, { useState } from "react";
import "./CSS/loginsignup.css";
// import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState("");

  // const [error, setError] = useState(false);

  const [loading, setLoading] = useState();

  const { signup } = '';

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await signup(email, password, userName);
      Navigate("/");
    } catch (err) {
      setLoading(false);
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign up</h1>
        <div className="loginsignup-fields">
          <input
            required
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            required
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="Passsword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button disabled={loading} onClick={handleSubmit}>
          Continue
        </button>
        <p className="loginsignup-login">
          Already have an account{" "}
          <a href="./Login">
            <span>Login Here</span>
          </a>
        </p>
        <div className="loginsignup-agree">
          <input
            required
            type="checkbox"
            name=""
            id=""
            value={agree}
            onChange={(e) => setAgree(e.target.value)}
          />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
