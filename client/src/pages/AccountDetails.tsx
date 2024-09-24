import * as React from "react";
import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import { initFlowbite } from "flowbite";
import { auth, getAccountType } from "../firebase/firebase";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";

const AccountDetails = () => {
  const [email, setEmail] = useState<null | string>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userVerified, setUserVerified] = useState<boolean>(false);
  const [verificationSendFeedbackSuccess, setVerificationSendFeedbackSuccess] =
    useState<string>("");
  const [verificationSendFeedbackFailure, setVerificationSendFeedbackFailure] =
    useState<string>("");
  const [accountType, setAccountType] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const callAccountType = async () => {
          const accountType = await getAccountType(user.uid);
          setAccountType(accountType);
        };
        callAccountType();
        setLoggedIn(true);
        setEmail(user.email);
        setUserVerified(user.emailVerified);
        setLoading(false);
      } else {
        setLoggedIn(false)
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
                {/* Container to show if user is logged in */}
                <div id="account-details-wrapper">
                  {userVerified ? (
                    <section className="bg-white dark:bg-gray-900">
                      <div className="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12">
                        <svg
                          className="mx-auto mb-4 w-10 h-10 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M331.8 224.1c28.29 0 54.88 10.99 74.86 30.97l19.59 19.59c40.01-17.74 71.25-53.3 81.62-96.65c5.725-23.92 5.34-47.08 .2148-68.4c-2.613-10.88-16.43-14.51-24.34-6.604l-68.9 68.9h-75.6V97.2l68.9-68.9c7.912-7.912 4.275-21.73-6.604-24.34c-21.32-5.125-44.48-5.51-68.4 .2148c-55.3 13.23-98.39 60.22-107.2 116.4C224.5 128.9 224.2 137 224.3 145l82.78 82.86C315.2 225.1 323.5 224.1 331.8 224.1zM384 278.6c-23.16-23.16-57.57-27.57-85.39-13.9L191.1 158L191.1 95.99l-127.1-95.99L0 63.1l96 127.1l62.04 .0077l106.7 106.6c-13.67 27.82-9.251 62.23 13.91 85.39l117 117.1c14.62 14.5 38.21 14.5 52.71-.0016l52.75-52.75c14.5-14.5 14.5-38.08-.0016-52.71L384 278.6zM227.9 307L168.7 247.9l-148.9 148.9c-26.37 26.37-26.37 69.08 0 95.45C32.96 505.4 50.21 512 67.5 512s34.54-6.592 47.72-19.78l119.1-119.1C225.5 352.3 222.6 329.4 227.9 307zM64 472c-13.25 0-24-10.75-24-24c0-13.26 10.75-24 24-24S88 434.7 88 448C88 461.3 77.25 472 64 472z"
                          />
                        </svg>
                        <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl dark:text-white">
                          Under Development
                        </h1>
                        <p className="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">
                          The account details page is currently under active
                          development!
                        </p>
                      </div>
                    </section>
                  ) : (
                    <section className="bg-white dark:bg-gray-900">
                      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                        <div className="mx-auto max-w-screen-sm text-center">
                          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-teal-500 dark:text-primary-500">
                            401
                          </h1>
                          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                            Your account is not yet verified.
                          </p>
                          <small>
                            Verify your account with the link in your email or
                            re-send the verification below and refresh the page.
                          </small>

                          <button
                            onClick={() => {
                              try {
                                sendEmailVerification(auth.currentUser);
                                setVerificationSendFeedbackSuccess(
                                  "Verification link sent successfully!"
                                );
                              } catch (e) {
                                setVerificationSendFeedbackFailure(
                                  `Failed to send verification link, ${e}, please refresh the page and try again.`
                                );
                              }
                            }}
                            className="inline-flex text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
                          >
                            Re-send verification link
                          </button>
                          <br></br>
                          <small className="text-green-500">
                            {verificationSendFeedbackSuccess}
                          </small>
                          <br></br>
                          <small className="text-red-500">
                            {verificationSendFeedbackFailure}
                          </small>
                        </div>
                      </div>
                    </section>
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
                          You're not logged in.
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
createRoot(root).render(<AccountDetails />);
