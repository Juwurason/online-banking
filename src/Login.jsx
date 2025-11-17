import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./Login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin?.(); // callback to redirect to dashboard
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img
          src="https://www.rbcroyalbank.com/dvl/assets/images/logos/rbc-logo-shield.svg"
          className="login-logo"
          alt="Bank Logo"
        />

        <h2 className="login-title">Royal Digital Bank</h2>
        <p className="login-subtitle">Secure Online Banking Login</p>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="login-footer">© 2025 Royal Digital Bank</p>
      </div>
    </div>
  );
}
