import * as React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import { auth, getAccountType } from "../firebase/firebase";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import ResendVerification from "../components/ResendVerification";

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
            <div role="status" className="my-20 flex justify-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-teal-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
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
