import * as React from "react";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <>
      <footer className="bg-green-500 py-1 text-white font-400 text-lg flex flex-col items-center">
        <a href="#" className="py-3">
          {/* Take user back to top */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
            />
          </svg>
        </a>
        <a
          href="/public/employer-login.html"
          className="py-3 flex flex-row items-center hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <p>Employer Login</p>
        </a>
        <div className="py-3">&copy;8bituhm</div>
      </footer>
    </>
  );
};

export default Footer;
