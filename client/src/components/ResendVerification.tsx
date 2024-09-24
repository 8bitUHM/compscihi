import * as React from "react";
import { FC, useState } from "react";
import { auth } from "../firebase/firebase";
import { sendEmailVerification } from "firebase/auth";

interface Props {
  header: string;
}

const ResendVerification: FC<Props> = (props) => {
  const [verificationSendFeedbackSuccess, setVerificationSendFeedbackSuccess] =
    useState<string>("");
  const [verificationSendFeedbackFailure, setVerificationSendFeedbackFailure] =
    useState<string>("");

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h2 className="mb-4 text-5xl tracking-tight font-extrabold lg:text-6xl text-teal-500 dark:text-primary-500">
              {props.header}
            </h2>
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
    </>
  );
};

export default ResendVerification;
