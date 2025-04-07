import React, { useContext, useState } from "react";
import UserContext from "../UserContext";
import JoblyApi from "../../../api";

/** ProfileForm: allows logged-in user to update their info */
function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    email: currentUser.email || "",
    username: currentUser.username,
    password: ""
  });

  const [saved, setSaved] = useState(false);

  /** Handle form submit: save profile changes */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    };

    const updatedUser = await JoblyApi.updateProfile(formData.username, profileData);
    setCurrentUser(updatedUser);
    setSaved(true);
  }

  /** Handle form field change */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({ ...f, [name]: value }));
    setSaved(false);
  }

  return (
    <div className="ProfileForm">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input name="username" value={formData.username} disabled />
        </div>

        <div>
          <label>First Name</label>
          <input name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>

        <div>
          <label>Last Name</label>
          <input name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>

        <div>
          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div>
          <label>Confirm password to save changes</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button>Save Changes</button>
        {saved && <p>✔ Profile updated!</p>}
      </form>
    </div>
  );
}

export default ProfileForm;
