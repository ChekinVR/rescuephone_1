import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  auth,
  getUserInfo,
  registerNewUser,
  userExist,
} from "../firebase/firebase";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function IsComplete({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegistered,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExist(user.uid);
        if (isRegistered) {
          console.log("you puto");
          const userInfo = await getUserInfo(user.uid);
          if (userInfo.processCompleted == false) {
            onUserNotRegistered(userInfo);
          }
        } else {
          await registerNewUser({
            uid: user.uid,
            displayName: user.displayName,
            name: "",
            lastname: "",
            profilePicture: "",
            username: "",
            mail: user.email,
            birthday: "",
            gender: "",
            address: "",
            password: "",
            phoneNumber: "",
            modDevice: "",
            processCompleted: false,
          });
        }
        console.log(user.displayName);
      }
    });
  }, [navigate, onUserLoggedIn, onUserNotRegistered, onUserNotLoggedIn]);
  return <div className="w-full">{children}</div>;
}
