import * as React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import { auth, getAccountType } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import ResendVerification from "../components/ResendVerification";
import LoadingIcon from "../components/LoadingIcon";

const OpportunityPostings = () => {
  const [email, setEmail] = useState<null | string>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userVerified, setUserVerified] = useState<boolean>(false);
  const [accountType, setAccountType] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const callAccountType = async () => {
          const accountType = await getAccountType(user.uid);
          setAccountType(accountType);
        };
        callAccountType();
        setEmail(user.email);
        setLoggedIn(true);
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
      <div className="container mx-auto">
        {loading ? (
          <>
            {/* Loading icon */}
            <LoadingIcon className="my-20 flex justify-center" />
          </>
        ) : (
          <>
            {loggedIn ? (
              <>
                {/* Container to show if user is logged in & an account type thats not normal */}
                <div>
                  {userVerified ? (
                    <div className="container mx-auto">
                      <p>Aloha {email ? `${email}` : ``}!</p>
                      <p>
                        The opportunity postings page is still under
                        development.
                      </p>
                    </div>
                  ) : (
                    <ResendVerification />
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Container to show if user is NOT logged in */}
                <div>
                  <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                      <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-teal-500 dark:text-primary-500">
                          401
                        </h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                          Unauthorized Access
                        </p>

                        <a
                          href="./"
                          className="inline-flex text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
                        >
                          Back to Homepage
                        </a>
                      </div>
                    </div>
                  </section>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<OpportunityPostings />);
