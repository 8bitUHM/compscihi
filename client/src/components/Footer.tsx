import * as React from "react";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <>
      <footer className="py-2 flex flex-col justify-center items-center">
        <div className="py-4">
          <a href="#" aria-label="Click me to go back to the top of the page">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </a>
        </div>

        <div className="py-4 md:py-0 text-lg">
          <ul className="flex flex-col md:flex-row justify-center items-center">
            <li className="py-2">
              <a
                href="./employer-login.html"
                className="md:px-7 transition-all duration-300 hover:text-indigo-700"
              >
                Employer Login
              </a>
            </li>
            <li className="py-2 md:py-0">
              <a
                href="https://pagedone.io/blocks/marketing/footer"
                target="_blank"
                className="md:px-7 transition-all duration-300 hover:text-indigo-700"
              >
                Source Code
              </a>
            </li>
          </ul>

          <hr className="mt-3 border-1 border-gray-400" />
        </div>

        <div aria-label="copyright" className="fw-500 my-4 py-1 text-center">
          &copy;
          <span>
            <a
              href="https://www.8bituhm.org/"
              target="_blank"
              className="underline"
            >
              8bituhm
            </a>{" "}
            2024
          </span>
          , all rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
