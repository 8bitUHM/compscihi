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
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship";
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
          <a href="#">
            <h5 className=" text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {opportunity.title}
            </h5>
          </a>

          <div>
            <p>
              <small className="text-gray-500">
                {opportunity.postedDate} · {opportunity.company} ·{" "}
                {opportunity.location}{" "}
              </small>
            </p>
          </div>
          <p>
            <small>{opportunity.jobType}</small>
          </p>
          <p className="mb-2 mt-1 font-normal text-gray-500 dark:text-gray-400">
            {opportunity.description}
          </p>
          <div className="mb-3">
            {opportunity.skills.map((val, key) => (
              <span
                key={key}
                className="me-2 my-1 inline-flex items-center rounded-md bg-teal-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
              >
                {val}
              </span>
            ))}
          </div>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
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
      <div className="container mx-auto">
        {/* Opportunities Container */}
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
