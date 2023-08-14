import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { registerNewUser } from "../firebase/firebase";

async function HandleDoc(uid, tmpuser) {
  await registerNewUser({
    uid: uid,
    displayName: tmpuser.displayName,
    name: "",
    lastname: "",
    profilePicture: "",
    username: "",
    mail: tmpuser.email,
    birthday: "",
    gender: "",
    address: "",
    password: tmpuser.password,
    phoneNumber: "",
    modDevice: "",
    processCompleted: false,
  });
}

export function ProtectedRoute({ children }) {
  const { userInfo, tmpUser, user, loading } = useAuth();

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (userInfo === null) {
    HandleDoc(user.uid, tmpUser);
  }

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}
