import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getDatabase, ref, get } from "firebase/database";

type AccountInfo = {
  accountType: string;
  email: string;
};

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

const getAccountType = async (userId: string): Promise<string> => {
  try {
    const snapshot = await get(ref(database, "users/" + userId));

    if (snapshot.exists()) {
      const data: AccountInfo = snapshot.val();

      return data.accountType || null;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error getting account type:", error);
    return null;
  }
};

const isAuthorizedOpportunityPoster = async (
  userId: string
): Promise<boolean> => {
  const accountType = await getAccountType(userId);
  return (
    accountType === "employer" ||
    accountType === "authorized-poster" ||
    accountType === "admin"
  );
};

export {
  getAccountType,
  isAuthorizedOpportunityPoster,
  functions,
  auth,
  database,
};
