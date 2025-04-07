import { useState } from "react";
import { useNavigate } from "react-router-dom";

/** SignupForm */
function SignupForm({ signup }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    await signup(formData);
    navigate("/");
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="username" onChange={handleChange} />
      <input name="password" type="password" placeholder="password" onChange={handleChange} />
      <input name="firstName" placeholder="First Name" onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <button>Sign Up</button>
    </form>
  );
}

export default SignupForm;
