import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);       // 🔐 Attempt login
      navigate("/");               // ✅ Redirect on success
    } catch (errors) {
      console.error("Login failed:", errors);
      setFormErrors(errors);       // ❌ Show error on screen
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({ ...f, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          autoComplete="username"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button>Log In</button>
      </form>

      {/* 🛑 Show error if login failed */}
      {formErrors.length > 0 && (
        <div className="LoginForm-errors">
          {formErrors.map((err, idx) => (
            <p key={idx} style={{ color: "red" }}>{err}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default LoginForm;
