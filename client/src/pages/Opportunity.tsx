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
  const [opportunity, setOpportunity] = useState<Opportunity>();
  const [opportunityId, setOpportunityId] = useState<string | null>(null);

  useEffect(() => {
    initFlowbite();

    const params = new URLSearchParams(window.location.search);
    const opportunityId = params.get("opportunity-id");

    setOpportunityId(opportunityId);
  }, []);

  // Mock Opportunity
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
      "Work on real-world projects with our software engineering team to develop new web-based applications.",
    qualifications: [
      "Currently pursuing a CS degree",
      "Experience with JavaScript/TypeScript",
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
      <div className="mt-5 py-10 flex justify-center items-center flex-col gap-8 md:flex-row">
        {/* Job Overview  */}
        <article className="px-5 py-5 flex flex-col gap-2 grow-0 justify-center align-start md:w-3/4 lg:w-1/3">
          <h1 className="font-bold text-2xl md:text-3xl">
            {mockOpportunity.title}
          </h1>
          <div className="space-y-2 text-sm font-medium">
            <p className="text-gray-500">
              <small>{`${mockOpportunity.postedDate} · ${mockOpportunity.company} · 
                ${mockOpportunity.location} -- ${mockOpportunity.locationType}`}</small>
            </p>
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
          <div className="pt-3 text-medium text-pretty lg:xl:text-balance">
            <p>{mockOpportunity.description}</p>
          </div>
          {/* Job Benefits */}
          <div className="text-medium pt-3">
            {mockOpportunity.benefits.map((val, key) => (
              <div
                className="inline-flex me-2 text-xs bg-blue-50 text-green-700 font-medium py-1 px-2 ring-1 ring-inset ring-green-600/20 rounded-lg"
                key={key}
              >
                {val}
              </div>
            ))}
          </div>

          {/* Clicks / Number Applied */}
          <div className="w-fit mt-2 text-sm bg-blue-50 text-green-700 font-medium py-1 px-2 ring-1 ring-inset ring-green-600/20 rounded">
            {`${mockOpportunity.clicks} applied to this job`}
          </div>
        </article>
        {/* Job Qualifications */}
        <div className="flex flex-col justify-center align-start px-5 py-5">
          ipsum
        </div>
      </div>
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Opportunity />);
