import * as React from "react";
import { createRoot } from "react-dom/client";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import "../styles/styles.css";
import { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import ResendVerification from "../components/ResendVerification";
import LoadingIcon from "../components/LoadingIcon";

const Login = () => {
  const [email, setEmail] = useState<null | string>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userVerified, setUserVerified] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setEmail(user.email);
        setUserVerified(user.emailVerified);
        setLoading(false);
      } else {
        setLoggedIn(false);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    initFlowbite();
  }, [email, loggedIn, loading]);

  return (
    <>
      <NavBar />
      {loading ? (
        <>
          <LoadingIcon className="my-20 flex justify-center" />
        </>
      ) : (
        <>
          {loggedIn ? (
            <>
              {userVerified ? (
                <div className="container mx-auto py-3 ">
                  <div
                    className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
                    role="alert"
                  >
                    <svg
                      className="flex-shrink-0 inline w-4 h-4 me-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ml-2">
                      <span className="font-medium">Login Success.</span> You're
                      currently logged in and verified!
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <ResendVerification />
                </>
              )}
            </>
          ) : (
            <>
              <LoginForm />
            </>
          )}
        </>
      )}
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Login />);
