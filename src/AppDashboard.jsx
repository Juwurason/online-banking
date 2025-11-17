import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import "./App.css";

function AppDashboard({ onLogout }) {
  const [balance, setBalance] = useState(0); // animated balance
  const [highlightBalance, setHighlightBalance] = useState(false);
  const targetBalance = 35000000; // 35 million CAD

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleActionClick = (action) => {
    const message =
      action === "Transactions"
        ? "Transactions are currently unavailable."
        : "Your account is locked. You will be able to transfer money once your account is unlocked.";
    setToastMessage(message);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000); // auto hide after 3s
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = targetBalance / (duration / 20);

    const counter = setInterval(() => {
      start += increment;
      if (start >= targetBalance) {
        start = targetBalance;
        clearInterval(counter);
        setHighlightBalance(true); // trigger sparkle
        setTimeout(() => setHighlightBalance(false), 1500); // remove after 1.5s
      }
      setBalance(Math.floor(start));
    }, 20);

    return () => clearInterval(counter);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-right">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Welcome */}
      <section className="welcome-section">
        <h2>
          Welcome, <span className="highlight">David Akin</span>
        </h2>
        <p>Your personal online banking dashboard</p>
      </section>

      {/* Balance Card */}
      <section className={`balance-card ${highlightBalance ? "sparkle" : ""}`}>
        <p className="balance-title">Available Balance</p>
        <h1 className="balance-amount">
          {balance.toLocaleString("en-CA", {
            style: "currency",
            currency: "CAD",
          })}
        </h1>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <button
          className="action-btn"
          onClick={() => handleActionClick("Send Money")}
        >
          Send Money
        </button>
        <button
          className="action-btn"
          onClick={() => handleActionClick("Deposit")}
        >
          Deposit
        </button>
        <button
          className="action-btn"
          onClick={() => handleActionClick("Transactions")}
        >
          Transactions
        </button>
      </section>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast">
          <p>{toastMessage}</p>
        </div>
      )}

      {/* Empty Transactions */}
      <section className="transactions-section">
        <h3>Recent Transactions</h3>
        <div className="empty-transactions">
          <p>No transactions yet.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        © 2025 Royal Digital Bank — Secure Online Banking
      </footer>
    </div>
  );
}

export default AppDashboard;
