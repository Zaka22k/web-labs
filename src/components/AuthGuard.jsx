import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "context";
import { PageLoader } from "components";

const AuthGuard = ({
  redirectIfAuth = "/dashboard",
  redirectIfNoAuth = "/auth",
  requireAuth = true,
}) => {
  const { isAuth, loading } = useAuth();

  if (loading) return <PageLoader />;

  if (requireAuth)
    return isAuth ? <Outlet /> : <Navigate to={redirectIfNoAuth} replace />;

  return <Navigate to={isAuth ? redirectIfAuth : redirectIfNoAuth} replace />;
};

export default AuthGuard;
