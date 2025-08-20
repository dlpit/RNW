import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  redirectTo = "/auth/admin-login",
}: ProtectedRouteProps) => {
  const { user, accessToken } = useSelector((state: RootState) => state.auth);

  // Check if user is authenticated (has both user and valid token)
  const isAuthenticated = !!(user && accessToken);

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
