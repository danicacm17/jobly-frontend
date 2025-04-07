import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CompanyList from "./pages/CompanyList";
import CompanyDetail from "./pages/CompanyDetail";
import JobList from "./pages/JobList";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import ProfileForm from "./pages/ProfileForm";
import PrivateRoute from "./PrivateRoute";

/** RoutesList: defines all application routes */
function RoutesList({ login, signup }) {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/signup" element={<SignupForm signup={signup} />} />

      <Route
        path="/companies"
        element={
          <PrivateRoute>
            <CompanyList />
          </PrivateRoute>
        }
      />
      <Route
        path="/companies/:handle"
        element={
          <PrivateRoute>
            <CompanyDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/jobs"
        element={
          <PrivateRoute>
            <JobList />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfileForm />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default RoutesList;
