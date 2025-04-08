import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NavBar from "./NavBar";
import RoutesList from "./RoutesList";
import JoblyApi from "./api";
import UserContext from "./UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

function App() {
  const [token, setToken] = useLocalStorage("jobly-token");
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfoLoaded, setUserInfoLoaded] = useState(false); // ✅ NEW

  useEffect(() => {
    async function fetchUser() {
      setUserInfoLoaded(false); // Reset while loading
      if (token) {
        try {
          JoblyApi.token = token;
          const { username } = jwtDecode(token);
          const user = await JoblyApi.getCurrentUser(username);
          user.applications = user.applications || [];
          setCurrentUser(user);
        } catch (err) {
          console.error("Error loading user:", err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setUserInfoLoaded(true); // ✅ Only after everything is done
    }
    fetchUser();
  }, [token]);

  async function login(formData) {
    const token = await JoblyApi.login(formData);
    setToken(token);
  }

  async function signup(formData) {
    const token = await JoblyApi.signup(formData);
    setToken(token);
  }

  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  if (!userInfoLoaded) return <p>Loading...</p>; // ✅ Do not render anything until user is ready

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <NavBar logout={logout} />
        <RoutesList login={login} signup={signup} />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
