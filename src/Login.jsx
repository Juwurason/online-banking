import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./Login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 🔹 new loading state

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin?.();
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img
          src="https://www.rbcroyalbank.com/dvl/assets/images/logos/rbc-logo-shield.svg" // use local logo for reliability
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
            name="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ fontSize: "16px" }} // 🔹 prevents zoom on iOS
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            autoComplete="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ fontSize: "16px" }} // 🔹 prevents zoom on iOS
            required
          />

          <button
            type="submit"
            className="login-btn"
            disabled={loading} // 🔹 disable button while logging in
          >
            {loading ? (
              <span className="loader-text">
                Logging in...
                <span className="loader-spinner"></span>
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="login-footer">© 2025 Royal Digital Bank</p>
      </div>
    </div>
  );
}
