import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";

/** PrivateRoute
 * Protects routes: redirects to /login if no currentUser is set.
 */
function PrivateRoute({ children }) {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
