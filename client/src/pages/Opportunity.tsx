import * as React from "react";
import { createRoot } from "react-dom/client";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import "../styles/styles.css";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";
import { useState } from "react";

type Opportunity = {
  id: string;
  active: boolean;
  title: string;
  company: string;
  location: string;
  locationType: "Remote" | "On-site" | "Hybrid";
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

const Opportunity = () => {
  const [opportunityId, setOpportunityId] = useState<string | null>(null);

  useEffect(() => {
    initFlowbite();

    const params = new URLSearchParams(window.location.search);
    const opportunityId = params.get("opportunity-id");

    setOpportunityId(opportunityId);
  }, []);

  // Mock Opportunity for Testing
  const mockOpportunity: Opportunity = {
    id: "38gn3u",
    active: true,
    title: "Software Engineer Intern",
    company: "TechCorp",
    location: "Honolulu, HI",
    locationType: "Hybrid",
    pay: 20,
    payPer: "hour",
    jobType: "Internship",
    description:
      "Work on real-world projects with our software engineering team to develop new web-based applications. Lorem ipsum dolor foo bar gaz baz",
    qualifications: [
      "Currently pursuing a CS degree",
      "Experience with JavaScript/TypeScript",
      // "Experience with React",
    ],
    skills: ["JavaScript", "React", "Node.js"],
    benefits: ["Health insurance", "Flexible hours"],
    postedDate: "2024-09-18",
    applicationInstructions: "Apply via our company website.",
    applyLink: "https://techcorp.com/apply",
    clicks: 57,
  };

  return (
    <>
      <NavBar />
      <div className="w-full mt-5 py-5 flex justify-center items-center flex-col gap-7">
        <p className="underline">Back to Opportunities Page</p>
        {/* Job Overview  */}
        <article className="px-5 pt-5 flex flex-col gap-2 ">
          <h1 className="font-bold text-2xl md:text-3xl">
            {mockOpportunity.title}
          </h1>
          <div className="space-y-2 text-sm font-medium">
            <span className="text-gray-500">
              <small>{`${mockOpportunity.postedDate} · ${mockOpportunity.company} · 
                ${mockOpportunity.location} -- ${mockOpportunity.locationType}`}</small>
            </span>
            {/* Wage/Salary Details */}
            {mockOpportunity.pay && mockOpportunity.payPer ? (
              <p>
                <small>{`$${mockOpportunity.pay}/${mockOpportunity.payPer} · ${mockOpportunity.jobType}`}</small>
              </p>
            ) : (
              <p>
                <small>{`${mockOpportunity.jobType}`}</small>
              </p>
            )}
          </div>

          {/* Description */}
          <div className="max-w-lg pt-3 text-medium text-pretty">
            <p>{mockOpportunity.description}</p>
          </div>

          {/* Job Benefits */}
          <div className="text-medium pt-3">
            {mockOpportunity.benefits
              ? mockOpportunity.benefits.map((val, key) => (
                  <span
                    className="me-2 text-xs bg-blue-50 text-green-700 font-medium py-1 px-2 ring-1 ring-inset ring-green-600/20 rounded-lg"
                    key={key}
                  >
                    {val}
                  </span>
                ))
              : null}
          </div>

          {/* Clicks / Number Applied */}
          <div className="w-fit mt-2 text-sm bg-blue-50 text-green-700 font-medium py-1 px-2 ring-1 ring-inset ring-green-600/20 rounded">
            {`${mockOpportunity.clicks} applied to this job`}
          </div>

          {/* Job Qualifications */}
          <div className="py-5 flex flex-col gap-3">
            <h1 className="font-bold text-2xl md:text-3xl">Qualifications</h1>

            {/* List of Qualifications */}
            <div className="space-y-4 max-w-prose">
              <ul className="block list-disc list-inside text-medium text-balance">
                {mockOpportunity.qualifications.map((val, key) => (
                  <li key={key}>{val}</li>
                ))}
              </ul>

              {/* Skills */}
              <div className="list-inside text-green-600 font-semibold text-medium">
                {mockOpportunity.skills.map((val, key) => (
                  <span
                    key={key}
                    className="me-2 text-sm bg-blue-50 text-green-700 font-medium py-1 px-2 ring-1 ring-inset ring-green-600/20 rounded-lg"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>

            {/* Application Instructions */}

            <div className="mt-4 flex flex-col gap-4 text-base">
              <span className="font-medium">Interested in Applying?</span>
              <div>
                {mockOpportunity.applyLink ? (
                  <p>
                    {mockOpportunity.applicationInstructions}{" "}
                    <span className="underline">
                      {mockOpportunity.applyLink}
                    </span>
                  </p>
                ) : (
                  <p>{mockOpportunity.applicationInstructions}</p>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Opportunity />);
