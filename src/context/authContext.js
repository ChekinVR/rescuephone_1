import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, getUserInfo } from "../firebase/firebase";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("there is not AuthProvider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState("");
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const getUserInfoAuth = async (uid) => {
    const info = await getUserInfo(uid);
    setUserInfo(info);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      getUserInfoAuth(currentUser.uid);
      setLoading(false);
      console.log("we toy jalando");
    });

    return () => unsubscribe();
  }, []);
  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        userInfo,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
