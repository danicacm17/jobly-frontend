import { useContext } from "react";
import UserContext from "../UserContext";

/** Homepage: shows welcome message based on login state */
function Homepage() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Homepage">
      {currentUser ? (
        <h2>Welcome back, {currentUser.firstName || currentUser.username}!</h2>
      ) : (
        <>
          <h2>Welcome to Jobly</h2>
          <p>Please log in or sign up to start applying for jobs.</p>
        </>
      )}
    </div>
  );
}

export default Homepage;
