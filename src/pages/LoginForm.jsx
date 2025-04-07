import { useState } from "react";
import { useNavigate } from "react-router-dom";

/** LoginForm */
function LoginForm({ login }) {
  const [formData, setFormData] = useState({ username: "testuser", password: "password" });
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    await login(formData);
    navigate("/");
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={formData.username} onChange={handleChange} />
      <input name="password" type="password" value={formData.password} onChange={handleChange} />
      <button>Login</button>
    </form>
  );
}

export default LoginForm;
