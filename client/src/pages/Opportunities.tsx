import * as React from "react";
import NavBar from "../components/Navbar";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";

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

const Opportunities = () => {
  // For the dropdown components to work like expected on mobile devices

  const [opportunities, setOpportunities] = React.useState<Opportunity[]>([]);
  const [filterData, setFilterData] = React.useState<Map<string, number>>(
    new Map()
  );
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [selectedOrder, setSelectedOrder] =
    React.useState<string>("postedDate");
  const [locationFilters, setLocationFilters] = React.useState<string[]>([]);
  const [jobTypeFilters, setJobTypeFilters] = React.useState<string[]>([]);

  React.useEffect(() => {
    initFlowbite();

    const filterData = new Map();

    filterData.set("remote", 0);
    filterData.set("on-site", 0);
    filterData.set("hybrid", 0);
    filterData.set("full-time", 0);
    filterData.set("part-time", 0);
    filterData.set("contract", 0);
    filterData.set("internship", 0);

    mockOpportunities.forEach((opportunity) => {
      // Switch case for location type
      switch (opportunity.locationType) {
        case "Remote":
          filterData.set("remote", filterData.get("remote")! + 1);
          break;
        case "On-site":
          filterData.set("on-site", filterData.get("on-site")! + 1);
          break;
        case "Hybrid":
          filterData.set("hybrid", filterData.get("hybrid")! + 1);
          break;
      }

      // Switch case for job type
      switch (opportunity.jobType) {
        case "Full-time":
          filterData.set("full-time", filterData.get("full-time")! + 1);
          break;
        case "Part-time":
          filterData.set("part-time", filterData.get("part-time")! + 1);
          break;
        case "Contract":
          filterData.set("contract", filterData.get("contract")! + 1);
          break;
        case "Internship":
          filterData.set("internship", filterData.get("internship")! + 1);
          break;
      }
    });

    setFilterData(filterData);
    // setOpportunities(mockOpportunities);
  }, []);

  const mockOpportunities: Opportunity[] = [
    {
      id: "op-001",
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
    },
    {
      id: "op-002",
      active: true,
      title: "Full Stack Developer",
      company: "Innovate Solutions",
      location: "Remote",
      locationType: "Remote",
      pay: 85000,
      payPer: "year",
      jobType: "Full-time",
      description:
        "Develop and maintain web applications using modern frameworks and cloud technologies.",
      qualifications: [
        "3+ years experience in web development",
        "Familiar with cloud services",
      ],
      skills: ["JavaScript", "Node.js", "AWS", "React"],
      benefits: ["401(k)", "Paid time off"],
      postedDate: "2024-09-15",
      applicationInstructions: "Send resume to careers@innovatesolutions.com.",
      applyLink: "https://innovatesolutions.com/apply",
      clicks: 102,
    },
    {
      id: "op-003",
      active: true,
      title: "DevOps Engineer",
      company: "CloudStream",
      location: "San Francisco, CA",
      locationType: "On-site",
      pay: 110000,
      payPer: "year",
      jobType: "Full-time",
      description:
        "Maintain and improve CI/CD pipelines, and ensure the smooth deployment of cloud services.",
      qualifications: [
        "Experience with CI/CD tools",
        "Knowledge of Docker and Kubernetes",
      ],
      skills: ["Jenkins", "Docker", "Kubernetes", "AWS"],
      benefits: ["Health insurance", "Stock options"],
      postedDate: "2024-09-10",
      applicationInstructions: "Apply via LinkedIn.",
      clicks: 78,
    },
    {
      id: "op-004",
      active: true,
      title: "Data Scientist",
      company: "Insight Analytics",
      location: "Austin, TX",
      locationType: "Hybrid",
      pay: 95000,
      payPer: "year",
      jobType: "Full-time",
      description:
        "Analyze large datasets and develop models to drive business insights.",
      qualifications: [
        "2+ years experience in data science",
        "Proficiency in Python and SQL",
      ],
      skills: ["Python", "SQL", "Machine Learning", "TensorFlow"],
      benefits: ["Health insurance", "Remote flexibility"],
      postedDate: "2024-09-12",
      applicationInstructions: "Submit your application on our website.",
      applyLink: "https://insightanalytics.com/careers",
      clicks: 64,
    },
    {
      id: "op-005",
      active: false,
      title: "Front-End Developer",
      company: "Creative Labs",
      location: "Mililani, HI",
      locationType: "On-site",
      jobType: "Contract",
      description:
        "Build and enhance user interfaces for mobile and web platforms using modern technologies.",
      qualifications: [
        "Experience with HTML, CSS, and JavaScript",
        "Familiarity with Figma or other design tools",
      ],
      skills: ["HTML", "CSS", "JavaScript", "Vue.js"],
      postedDate: "2024-09-01",
      applicationInstructions: "Contact us via email with your portfolio.",
      clicks: 53,
    },
    {
      id: "op-006",
      active: true,
      title: "UI/UX Designer",
      company: "Digital Creations",
      location: "New York, NY",
      locationType: "Hybrid",
      pay: 75000,
      payPer: "year",
      jobType: "Full-time",
      description:
        "Design user interfaces and improve user experience for our range of web and mobile applications.",
      qualifications: [
        "2+ years experience in UI/UX design",
        "Proficiency in design tools like Sketch or Figma",
      ],
      skills: ["UI Design", "UX Research", "Figma", "Sketch"],
      benefits: ["Dental insurance", "Remote flexibility"],
      postedDate: "2024-09-18",
      applicationInstructions: "Submit portfolio on our careers page.",
      applyLink: "https://digitalcreations.com/jobs",
      clicks: 89,
    },
    {
      id: "op-007",
      active: true,
      title: "Mobile App Developer",
      company: "Appify",
      location: "Los Angeles, CA",
      locationType: "Remote",
      jobType: "Contract",
      description:
        "Develop cross-platform mobile applications using Flutter and Dart.",
      qualifications: [
        "Experience in mobile app development",
        "Knowledge of Flutter and Dart",
      ],
      skills: ["Flutter", "Dart", "iOS", "Android"],
      postedDate: "2024-09-20",
      applicationInstructions: "Send your resume to hr@appify.com.",
      clicks: 77,
    },
    {
      id: "op-008",
      active: true,
      title: "Cybersecurity Analyst",
      company: "SafeNet",
      location: "Chicago, IL",
      locationType: "On-site",
      pay: 85000,
      payPer: "year",
      jobType: "Full-time",
      description:
        "Monitor and improve the organization's security posture by detecting and responding to threats.",
      qualifications: ["2+ years in cybersecurity", "Familiar with SIEM tools"],
      skills: [
        "Network Security",
        "Threat Detection",
        "Incident Response",
        "SIEM",
      ],
      benefits: ["Health insurance", "401(k) matching"],
      postedDate: "2024-09-16",
      applicationInstructions: "Apply via company website.",
      applyLink: "https://safenet.com/careers",
      clicks: 90,
    },
  ];

  const filterOpportunities = () => {
    let filteredOpportunities = [...mockOpportunities];

    if (searchQuery) {
      filteredOpportunities = filteredOpportunities.filter(
        (opportunity) =>
          opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opportunity.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (locationFilters.length > 0) {
      filteredOpportunities = filteredOpportunities.filter((opportunity) =>
        locationFilters.every((filter) => filter === opportunity.locationType)
      );
    }

    if (jobTypeFilters.length > 0) {
      filteredOpportunities = filteredOpportunities.filter((opportunity) =>
        jobTypeFilters.every((filter) => filter === opportunity.jobType)
      );
    }

    filteredOpportunities.sort((a, b) => {
      let aValue: string | number | undefined;
      let bValue: string | number | undefined;

      switch (selectedOrder) {
        case "postedDate":
          aValue = new Date(a.postedDate).getTime();
          bValue = new Date(b.postedDate).getTime();
          break;
        case "title":
          aValue = a.title;
          bValue = b.title;
          break;
        case "pay":
          aValue = a.pay || 0; // Handle undefined pay values
          bValue = b.pay || 0;
          break;
        default:
          aValue = 0;
          bValue = 0;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setOpportunities(filteredOpportunities);
  };

  React.useEffect(() => {
    filterOpportunities();
  }, [searchQuery, locationFilters, jobTypeFilters, sortOrder, selectedOrder]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleLocationFilter = (locationType: string) => {
    setLocationFilters((prev) =>
      prev.includes(locationType)
        ? prev.filter((filter) => filter !== locationType)
        : [...prev, locationType]
    );
  };

  const toggleJobTypeFilter = (jobType: string) => {
    setJobTypeFilters((prev) =>
      prev.includes(jobType)
        ? prev.filter((filter) => filter !== jobType)
        : [...prev, jobType]
    );
  };

  const handleSortOrderChange = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  const handleSelectedOrderChange = (order: string) => {
    setSelectedOrder(order);
  };

  const opportunity = (opportunity: Opportunity, key: number) => {
    if (opportunity.active) {
      return (
        <div
          key={key}
          className="w-full  p-6 bg-white border border-gray-200 rounded-lg shadow"
        >
          {/* Card */}
          <h5 className=" text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {opportunity.title}
          </h5>
          <div>
            <p>
              <small className="text-gray-500">
                {`${opportunity.postedDate} · ${opportunity.company} · 
                ${opportunity.location} -- ${opportunity.locationType}`}
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

          {/* Accordian */}
          <div
            id={`accordion-color-${key}`}
            data-accordion="collapse"
            data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white"
            className="mt-3"
          >
            <h2 id="accordion-color-heading-2">
              <button
                type="button"
                className="rounded flex items-center justify-between w-full p-3 font-medium rtl:text-right text-gray-500 border  border-teal-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3"
                data-accordion-target={`#accordion-color-body-${key}`}
                aria-expanded="false"
                aria-controls={`accordion-color-body-${key}`}
              >
                <span>
                  <p className="font-bold text-lg bg-clip-text bg-gradient-to-r to-cyan-700 from-green-700 text-transparent">
                    Apply{" "}
                  </p>
                </span>
                <svg
                  data-accordion-icon=""
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id={`accordion-color-body-${key}`}
              className="hidden"
              aria-labelledby="accordion-color-heading-2"
            >
              <div className="p-3 border rounded border-teal-200 dark:border-gray-700">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  {opportunity.applicationInstructions}
                </p>
                {opportunity.applyLink ? (
                  <p className="text-base leading-relaxed text-gray-500 underline">
                    <a target="_blank" href={opportunity.applyLink}>
                      {opportunity.applyLink}
                    </a>
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {/* <p className="text-blue-400">
            <small>{opportunity.clicks} people clicked apply</small>
          </p> */}
        </div>
      );
    }
  };

  return (
    <>
      <NavBar />
      <div
        className="container mx-auto mt-5"
        data-aos="fade-up"
        data-aos-duration="1250"
      >
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

        {/* Search */}
        <div className="flex flex-col items-center justify-center p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  required
                />
              </div>
            </form>
          </div>

          <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
            <div className="flex items-center w-full space-x-3 md:w-auto">
              <button
                onClick={() =>
                  handleSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
                }
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                style={{ height: 38.48 }}
              >
                {sortOrder === "asc" ? (
                  <svg
                    className="h-4 w-4 text-gray-600"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <line x1="4" y1="6" x2="11" y2="6" />{" "}
                    <line x1="4" y1="12" x2="11" y2="12" />{" "}
                    <line x1="4" y1="18" x2="13" y2="18" />{" "}
                    <polyline points="15 9 18 6 21 9" />{" "}
                    <line x1="18" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4 text-gray-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <line x1="4" y1="6" x2="13" y2="6" />{" "}
                    <line x1="4" y1="12" x2="11" y2="12" />{" "}
                    <line x1="4" y1="18" x2="11" y2="18" />{" "}
                    <polyline points="15 15 18 18 21 15" />{" "}
                    <line x1="18" y1="6" x2="18" y2="18" />
                  </svg>
                )}
                {sortOrder === "asc" ? " " : " "}
              </button>

              <div
                id="orderDropdown"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow-xl w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="actionsDropdownButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    ></a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Descending
                    </a>
                  </li>
                </ul>
              </div>
              <button
                id="sortDropdownButton"
                data-dropdown-toggle="sortDropdown"
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                Sort By
                <svg
                  className="-mr-1 ml-1.5 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </button>

              <div
                id="sortDropdown"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow-xl w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="sortDropdownButton"
                >
                  <li>
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleSelectedOrderChange("postedDate")}
                    >
                      Date Posted
                      {selectedOrder === "postedDate" && (
                        <svg
                          className="inline w-4 h-4 ml-2 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  </li>
                  <li>
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleSelectedOrderChange("title")}
                    >
                      Title
                      {selectedOrder === "title" && (
                        <svg
                          className="inline w-4 h-4 ml-2 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  </li>
                  <li>
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleSelectedOrderChange("pay")}
                    >
                      Salary
                      {selectedOrder === "pay" && (
                        <svg
                          className="inline w-4 h-4 ml-2 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  </li>
                </ul>
              </div>

              <div
                id="sortDropdown"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow-xl w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="actionsDropdownButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Date posted
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Name
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Salary
                    </a>
                  </li>
                </ul>
              </div>

              <button
                id="filterDropdownButton"
                data-dropdown-toggle="filterDropdown"
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-4 h-4 mr-2 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clipRule="evenodd"
                  />
                </svg>
                Filter
                <svg
                  className="-mr-1 ml-1.5 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              <div
                id="filterDropdown"
                className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow-xl dark:bg-gray-700"
              >
                <ul
                  className="space-y-2 text-sm"
                  aria-labelledby="filterDropdownButton"
                >
                  {/* Location Type Filter */}
                  <li className="font-medium text-gray-700 dark:text-gray-100">
                    Location Type
                  </li>

                  <li className="flex items-center">
                    <input
                      id="remote"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => toggleLocationFilter("Remote")}
                    />
                    <label
                      htmlFor="remote"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Remote ({filterData.get("remote")})
                    </label>
                  </li>

                  <li className="flex items-center">
                    <input
                      id="onsite"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => toggleLocationFilter("On-site")}
                    />
                    <label
                      htmlFor="onsite"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      On-site ({filterData.get("on-site")})
                    </label>
                  </li>

                  <li className="flex items-center">
                    <input
                      id="hybrid"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => toggleLocationFilter("Hybrid")}
                    />
                    <label
                      htmlFor="hybrid"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Hybrid ({filterData.get("hybrid")})
                    </label>
                  </li>

                  {/* Job Type Filter */}
                  <li className="mt-4 font-medium text-gray-700 dark:text-gray-100">
                    Job Type
                  </li>

                  <li className="flex items-center">
                    <input
                      id="fulltime"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => toggleJobTypeFilter("Full-time")}
                    />
                    <label
                      htmlFor="fulltime"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Full-time ({filterData.get("full-time")})
                    </label>
                  </li>

                  <li className="flex items-center">
                    <input
                      id="parttime"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => toggleJobTypeFilter("Part-time")}
                    />
                    <label
                      htmlFor="parttime"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Part-time ({filterData.get("part-time")})
                    </label>
                  </li>

                  <li className="flex items-center">
                    <input
                      id="contract"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => toggleJobTypeFilter("Contract")}
                    />
                    <label
                      htmlFor="contract"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Contract ({filterData.get("contract")})
                    </label>
                  </li>

                  <li className="flex items-center">
                    <input
                      id="internship"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => toggleJobTypeFilter("Internship")}
                    />
                    <label
                      htmlFor="internship"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Internship ({filterData.get("internship")})
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 my-10 md:mx-0 mx-2">
          {opportunities.map((val, key) => opportunity(val, key))}
        </div>
      </div>
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Opportunities />);
