import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import {
  auth,
  getUserInfo,
  registerNewUser,
  userExist,
} from "../firebase/firebase";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}
