import * as React from "react";
import NavBar from "../components/Navbar";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import Footer from "../components/Footer";

type Opportunity = {
  id: string;
  active: boolean;
  title: string;
  company: string;
  location: string;
  pay?: number;
  payPer?: string;
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship" | "Co-op";
  description: string;
  qualifications: string[];
  skills: string[];
  benefits?: string[];
  postedDate: string;
  applicationInstructions: string;
  applyLink?: string;
  clicks: number;
};

const Opportunities = () => {
  const opportunity = (opportunity: Opportunity, key: number) => {
    if (opportunity.active) {
      return (
        <div
          key={key}
          className="w-full  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
        >
          <div
            id={`static-modal-${key}`}
            data-modal-backdrop="static"
            tabIndex={-1}
            aria-hidden="false"
            className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-gray-100 rounded-lg shadow-xl dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Apply to {opportunity.title}
                  </h3>

                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide={`static-modal-${key}`}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                {/* Modal body */}
                <div className="p-4 md:p-5 space-y-4">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {opportunity.applicationInstructions}
                  </p>
                  {opportunity.applyLink ? (
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 underline">
                      <a target="_blank" href={opportunity.applyLink}>
                        {opportunity.applyLink}
                      </a>
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <h5 className=" text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {opportunity.title}
          </h5>
          <div>
            <p>
              <small className="text-gray-500">
                {opportunity.postedDate} · {opportunity.company} ·{" "}
                {opportunity.location}{" "}
              </small>
            </p>
          </div>
          <p>
            {opportunity.pay && opportunity.payPer ? (
              <small>
                $
                {opportunity.pay
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                per {opportunity.payPer} ·{" "}
              </small>
            ) : null}
            <small>{opportunity.jobType}</small>
          </p>
          <div className="text-gray-500 dark:text-gray-400 mb-2">
            <p className="mt-1 mb-1 font-normal ">{opportunity.description}</p>

            <ul className="list-disc ml-4">
              {opportunity.qualifications.map((val, key) => (
                <li key={key}>{val}</li>
              ))}
            </ul>
          </div>
          <div>
            {opportunity.skills.map((val, key) => (
              <span
                key={key}
                className="me-2 my-1 inline-flex items-center rounded-md bg-teal-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
              >
                {val}
              </span>
            ))}
          </div>
          {opportunity.benefits ? (
            <div className="">
              {opportunity.benefits.map((val, key) => (
                <span
                  key={key}
                  className="me-2 my-1 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                >
                  {val}
                </span>
              ))}
            </div>
          ) : null}
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mt-3 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            data-modal-target={`static-modal-${key}`}
            data-modal-toggle={`static-modal-${key}`}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Apply
            </span>
          </button>
          <p className="text-blue-400">
            <small>{opportunity.clicks} people clicked apply</small>
          </p>
        </div>
      );
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-5">
        <section className="text-gray-600 body-font">
          <div className="container px-5 mx-auto">
            <div className="flex flex-col text-center w-full ">
              <h1 className="sm:text-3xl text-2xl font-extrabold tracking-tight title-font mb-4 text-gray-900">
                Hawaii Tech Opportunities
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Hawaii based tech opportunities for Hawaii tech professionals
                and students.
              </p>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-5 my-10 md:mx-0 mx-2">
          {/* {opportunities.map((val, key) => {
            return opportunity(val, key);
          })} */}
        </div>
      </div>
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Opportunities />);
