import React, { useState, useEffect } from "react";
import { HashRouter } from "react-router-dom"; // ✅ use HashRouter for Render deployment
import JoblyApi from "./api";
import UserContext from "./UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import NavBar from "./NavBar";
import RoutesList from "./RoutesList";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage("jobly-token", null);

  useEffect(() => {
    async function getUser() {
      if (token) {
        try {
          JoblyApi.token = token;
          const { username } = JSON.parse(atob(token.split(".")[1]));
          const user = await JoblyApi.getCurrentUser(username);
          setCurrentUser(user);
        } catch (err) {
          console.error("App loadUserInfo failed", err);
          setCurrentUser(null);
        }
      }
    }
    getUser();
  }, [token]);

  async function login(data) {
    const token = await JoblyApi.login(data);
    setToken(token);
  }

  async function signup(data) {
    const token = await JoblyApi.signup(data);
    setToken(token);
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  function hasAppliedToJob(id) {
    return currentUser?.applications?.includes(id);
  }

  async function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    await JoblyApi.applyToJob(currentUser.username, id);
    setCurrentUser((u) => ({
      ...u,
      applications: [...u.applications, id]
    }));
  }

  return (
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}
      >
        <NavBar logout={logout} />
        <RoutesList login={login} signup={signup} />
      </UserContext.Provider>
  );
}

export default App;
