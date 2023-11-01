import { useLocation } from "react-router-dom";

export { PrivateRoute };

function PrivateRoute({ children }) {
  const location = useLocation();
  const user = {
    name: "murad",
    role: "admin",
  };
  const token = "test-token";

  if (!user || !token) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // authorized so return child components
  return <>{children}</>;
}

export default PrivateRoute;
