// Firebase initialization app
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyB_GZMBgUBnP5kD9EidwfMSVH32burUrag",
  authDomain: "signal-clone-e6120.firebaseapp.com",
  projectId: "signal-clone-e6120",
  storageBucket: "signal-clone-e6120.appspot.com",
  messagingSenderId: "1017605403509",
  appId: "1:1017605403509:web:24ad31366fdfa7777c193c",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = initializeAuth(app);

export const db = getFirestore(app);
