import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAWL55-33TbBdgHH773NMWTR5JNBJF2uEI",
  authDomain: "compscihi.firebaseapp.com",
  projectId: "compscihi",
  storageBucket: "compscihi.appspot.com",
  messagingSenderId: "937732502877",
  appId: "1:937732502877:web:7fbf2b26ec5ee2c05d64b4",
  measurementId: "G-2WJPWPJM3H",
};

const app = initializeApp(firebaseConfig);

const functions = getFunctions();
const auth = getAuth(app);
const database = getDatabase(app);

export { functions, auth, database };
