import { SlideRelaxed } from "@fluentui/react-motion-components-preview";
import { useState, useEffect } from "react";
import { makeStyles, Spinner } from "@fluentui/react-components";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "context";

export function PageTemplate({ children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return <SlideRelaxed visible={visible}>{children}</SlideRelaxed>;
}

export function PageLoader() {
  return (
    <Spinner
      style={{
        flex: 1,
      }}
      size="large"
    />
  );
}

export function ProtectedRoute({
  redirectIfAuth = "/dashboard",
  redirectIfNoAuth = "/auth",
  protect = true,
}) {
  const { isAuth, loading } = useAuth();

  if (loading) return <PageLoader />;

  if (protect)
    return isAuth ? <Outlet /> : <Navigate to={redirectIfNoAuth} replace />;

  return <Navigate to={isAuth ? redirectIfAuth : redirectIfNoAuth} replace />;
}
