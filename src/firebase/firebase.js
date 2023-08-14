// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  QuerySnapshot,
} from "firebase/firestore";
import {
  getStorage,
  refEqual,
  uploadBytes,
  getDownloadURL,
  getBytes,
  ref,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//Autenticaciòn con firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function registerNewUser(user) {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {}
}

export async function registerNewUserDoc(user) {
  try {
    registerNewUser(user)({
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
  } catch (error) {}
}

export async function userExist(uid) {
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);
  console.log(res);
  return res.exists();
}

export async function existsUsername(username) {
  const users = [];
  const docsRef = collection(db, "users");
  const q = query(docsRef, where("username", "==", username));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });

  return users.length > 0 ? users[0].uid : null;
}

export async function getUserInfo(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {
    console.error(error);
  }
}

export async function updateUser(user) {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
    console.log("E we lo puse que pedo");
  } catch (error) {
    console.log(error);
  }
}

export async function setUserProfilePhoto(uid, file) {
  try {
    const imageRef = ref(storage, `im_ProfilePicture/${uid}`);
    const resUpload = await uploadBytes(imageRef, file);
    console.log(resUpload);
    return resUpload;
  } catch (error) {
    console.error(error);
  }
}

export async function getProfilePhotoUrl(profilepicture) {
  try {
    const imageRef = ref(storage, profilepicture);

    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error(error);
  }
}
