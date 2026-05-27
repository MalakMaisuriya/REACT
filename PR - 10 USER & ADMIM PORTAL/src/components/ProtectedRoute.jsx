import { Navigate } from "react-router-dom";
import { currentSession } from "../utils/auth";

function ProtectedRoute({ allowedRoles, children }) {
  const session = currentSession();

  if (!session.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(session.role)) {
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
