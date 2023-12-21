import React from "react";
import "./CSS/loginsignup.css";
const Login = () => {
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Passsword" />
        </div>
        <button>Login</button>
        <p className="loginsignup-login">
          No account?{" "}
          <a href="./Signup">
            <span>Sign-up Here</span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
