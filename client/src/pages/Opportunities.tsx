import * as React from "react";
import NavBar from "../components/Navbar";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import { isRunningLocal } from "../util/routing";

type Opportunity = {
  id: string;
  active: boolean;
  title: string;
  company: string;
  location: string;
  location_type: "Remote" | "On-site" | "Hybrid";
  pay?: number;
  pay_per?: string;
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship" | "Co-op";
  description: string;
  qualifications: string[];
  skills: string[];
  benefits?: string[];
  posted_date: string;
  application_instructions: string;
  apply_link?: string;
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

  const [pageReady, setPageReady] = useState<boolean>(false);
  const [canMap, setCanMap] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getRootFetchUrl = (): string => {
    return isRunningLocal()
      ? "http://127.0.0.1:8000"
      : "https://portal.compscihi.com";
  };

  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        search: searchQuery,
        location_type: locationFilters.join(","),
        job_type: jobTypeFilters.join(","),
        ordering: `${sortOrder === "asc" ? "" : "-"}${selectedOrder}`,
        page: currentPage.toString(),
      }).toString();

      console.log(params);
      const fetchUrl = `${getRootFetchUrl()}/api/opportunities/?${params}`;
      console.log(fetchUrl);
      const response = await fetch(fetchUrl);

      if (!response.ok) {
        setPageReady(true);
        throw new Error("Failed to fetch opportunities");
      }

      const data = await response.json();
      console.log(data);

      setOpportunities(data.results);
      setTotalPages(data.total_pages);
    } catch (e: any) {
      console.log(e);
    } finally {
      setPageReady(true);
    }
  };

  useEffect(() => {
    initFlowbite();
    fetchData();
  }, []);

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
                {`${opportunity.posted_date} · ${opportunity.company} · 
                ${opportunity.location} -- ${opportunity.location_type}`}
              </small>
            </p>
          </div>
          <p>
            {opportunity.pay && opportunity.pay_per ? (
              <small>
                $
                {opportunity.pay
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                {opportunity.pay_per} ·{" "}
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
                  {opportunity.application_instructions}
                </p>
                {opportunity.apply_link ? (
                  <p className="text-base leading-relaxed text-gray-500 underline">
                    <a target="_blank" href={opportunity.apply_link}>
                      {opportunity.apply_link}
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
      <div className="container mx-auto my-5">
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
                  // onChange={handleSearchChange}
                  required
                />
              </div>
            </form>
          </div>

          <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
            <div className="flex items-center w-full space-x-3 md:w-auto">
              <button
                // onClick={() =>
                //   handleSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
                // }
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
                      // onClick={() => handleSelectedOrderChange("postedDate")}
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
                      // onClick={() => handleSelectedOrderChange("title")}
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
                      // onClick={() => handleSelectedOrderChange("pay")}
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
                      // onChange={() => toggleLocationFilter("Remote")}
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
                      // onChange={() => toggleLocationFilter("On-site")}
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
                      // onChange={() => toggleLocationFilter("Hybrid")}
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
                      // onChange={() => toggleJobTypeFilter("Full-time")}
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
                      // onChange={() => toggleJobTypeFilter("Part-time")}
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
                      // onChange={() => toggleJobTypeFilter("Contract")}
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
                      // onChange={() => toggleJobTypeFilter("Internship")}
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

        <div
          className="grid md:grid-cols-2 gap-5 my-10 md:mx-0 mx-2"
          data-aos="fade-up"
          data-aos-duration="1250"
        >
          {opportunities.map((val, key) => opportunity(val, key))}
        </div>

        <div className="flex justify-center">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-base h-10">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  5
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Opportunities />);
