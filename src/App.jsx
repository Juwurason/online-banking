// App.tsx
import React, { useState, useEffect } from "react";
import AppDashboard from "./AppDashboard";
import Login from "./Login";
import { auth } from "./firebase";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // ✅ Persist login across refresh
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return loggedIn ? (
    <AppDashboard onLogout={() => setLoggedIn(false)} />
  ) : (
    <Login onLogin={() => setLoggedIn(true)} />
  );
}

export default App;
