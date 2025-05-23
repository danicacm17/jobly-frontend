import { NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";

/** NavBar: shows nav links, changes based on login state */
function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  return (
    <nav>
      <NavLink to="/">Jobly</NavLink>
      {currentUser ? (
        <>
          <NavLink to="/companies">Companies</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <span className="nav-link logout-link" onClick={logout}>
            Logout {currentUser.username}
          </span>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </>
      )}
    </nav>
  );
}

export default NavBar;
