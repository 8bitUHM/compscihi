import * as React from "react";
import { FC, useState } from "react";
import { auth } from "../firebase/firebase";
import { sendEmailVerification } from "firebase/auth";

const ResendVerification: FC = () => {
  const [verificationSendFeedbackSuccess, setVerificationSendFeedbackSuccess] =
    useState<string>("");
  const [verificationSendFeedbackFailure, setVerificationSendFeedbackFailure] =
    useState<string>("");

  return (
    <>
      <div className="container mx-auto py-3 ">
        <div
          className="flex items-center p-4 mx-4 mb-4 text-sm text-orange-800 border border-orange-300 rounded-lg bg-orange-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
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
            <span className="font-medium">Verify your email.</span> You're
            currently logged in but your email is not yet verified!
          </div>
        </div>
      </div>
      <section className="bg-white dark:bg-gray-900">
        <div className="px-4 mx-auto max-w-screen-xl  lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center mb-3">
            <p className="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-2xl dark:text-white">
              Your account is not yet verified.
            </p>
            <small>
              Verify your account with the link in your email or re-send the
              verification below and refresh the page.
            </small>
            <br></br>
            <button
              onClick={() => {
                try {
                  sendEmailVerification(auth.currentUser);
                  setVerificationSendFeedbackSuccess(
                    `Verification link sent to ${auth.currentUser.email} successfully!`
                  );
                } catch (e) {
                  setVerificationSendFeedbackFailure(
                    `Failed to send verification link to ${auth.currentUser.email}, ${e}, please refresh the page and try again.`
                  );
                }
              }}
              className="inline-flex text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
            >
              Re-send verification link
            </button>
            <br></br>
            <div className="mb-10"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResendVerification;
