import * as React from "react";
import NavBar from "../components/Navbar";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import { isRunningLocal, getOpportunitiesRootPage } from "../util/routing";
import { Opportunity } from "../types/opportunity";
import { formatDate } from "../util/dateformat";
import { truncateString } from "../util/strings";
import { SearchParameters } from "../types/parameters";
import { Parameters } from "../types/parameters";

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  const [userSearchQuery, setUserSearchQuery] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [selectedOrder, setSelectedOrder] = useState<string>("posted_date");

  const [userLocationFilter, setUserLocationFilter] = useState<string>("");
  const [userJobTypeFilter, setUserJobTypeFilter] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [hasNext, setHasNext] = useState<boolean>(false);
  const [hasPrev, setHasPrev] = useState<boolean>(false);

  const [pageReady, setPageReady] = useState<boolean>(false);
  const [canMap, setCanMap] = useState<boolean>(false);

  const [params, setParams] = useState<Parameters>(
    new Parameters({
      search: "",
      location_type: "",
      job_type: "",
      ordering: "",
      page: "",
    })
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    initFlowbite();
  }, [opportunities]);

  const getRootFetchUrl = (): string => {
    return isRunningLocal()
      ? "http://127.0.0.1:8000"
      : "https://portal.compscihi.com";
  };

  const fetchData = async () => {
    setPageReady(false);
    setCanMap(false);

    try {
      const clientParams = new URLSearchParams(window.location.search);

      const parameters = new Parameters({
        search:
          clientParams.get("search") === null ? `` : clientParams.get("search"),
        location_type:
          clientParams.get("location_type") === null
            ? ``
            : clientParams.get("location_type"),
        job_type:
          clientParams.get("job_type") === null
            ? ``
            : clientParams.get("job_type"),
        ordering:
          clientParams.get("ordering") === null
            ? ``
            : clientParams.get("ordering"),
        page: clientParams.get("page") === null ? `` : clientParams.get("page"),
      });

      console.log(parameters.toStringParams());

      setParams(parameters);

      const fetchUrl = `${getRootFetchUrl()}/api/opportunities/?${parameters.toStringParams()}`;
      console.log(fetchUrl);
      const response = await fetch(fetchUrl);

      if (!response.ok) {
        setPageReady(true);
        throw new Error("Failed to fetch opportunities");
      }

      const data = await response.json();

      if (data.previous !== null) {
        setHasPrev(true);
      } else {
        setHasPrev(false);
      }

      if (data.next !== null) {
        setHasNext(true);
      } else {
        setHasNext(false);
      }

      setTotalPages(Math.ceil(data.count / 10));
      setOpportunities(data.results);
      setCanMap(true);
    } catch (e: any) {
      console.log(e);
    } finally {
      setPageReady(true);
    }
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
                {`${formatDate(opportunity.posted_date)} · ${
                  opportunity.company
                } · 
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
            <small>{opportunity.job_type}</small>
          </p>
          <div className="text-gray-500 dark:text-gray-400 mb-2">
            <p className="mt-1 font-normal">
              {truncateString(opportunity.description, 150)}
            </p>

            <small className="text-blue-600 hover:underline">
              <a href="#">Read full job description</a>
            </small>

            <ul className="list-disc ml-4 mt-1">
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
            id={`accordion-color-${opportunity.id}`}
            data-accordion="collapse"
            data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white"
            className="mt-3"
          >
            <h2 id="accordion-color-heading-2">
              <button
                type="button"
                className="rounded flex items-center justify-between w-full p-3 font-medium rtl:text-right text-gray-500 border  border-teal-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3"
                data-accordion-target={`#accordion-color-body-${opportunity.id}`}
                aria-expanded="false"
                aria-controls={`accordion-color-body-${opportunity.id}`}
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
              id={`accordion-color-body-${opportunity.id}`}
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

  const handleSortOrderChange = (order: "asc" | "desc") => {
    setCurrentPage(1);
    setSortOrder(order);
  };

  const handleSelectedOrderChange = (order: string) => {
    setSelectedOrder(order);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearchQuery(e.target.value);
  };

  const toggleLocationFilter = (locationType: string) => {
    setUserLocationFilter(locationType);
  };

  const toggleJobTypeFilter = (jobType: string) => {
    setUserJobTypeFilter(jobType);
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
            {/* <form className="flex items-center"> */}
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
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                placeholder="Search"
                value={params.search}
                onChange={(e) => {
                  params.updateSearch(e.target.value);
                  setParams(new Parameters({ ...params }));
                }}
                required
              />
              <button
                onClick={() => {
                  params.updatePage("1");
                  const newHref = `${getOpportunitiesRootPage()}?${params.toStringParams()}`;
                  window.location.href = newHref;
                }}
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-teal-700 rounded-e-lg border border-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
            {/* </form> */}
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
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                      onClick={() => handleSelectedOrderChange("posted_date")}
                    >
                      Date Posted
                      {selectedOrder === "posted_date" && (
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
                      Pay
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
                      type="radio"
                      name="locationType"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => {
                        params.updateLocationType("Remote");
                        setParams(new Parameters({ ...params }));
                      }}
                      checked={params.location_type === "Remote"}
                    />
                    <label
                      htmlFor="remote"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Remote
                    </label>
                  </li>

                  <li className="flex items-center">
                    <input
                      id="onsite"
                      type="radio"
                      name="locationType"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => {
                        params.updateLocationType("On-site");
                        setParams(new Parameters({ ...params }));
                      }}
                      checked={params.location_type === "On-site"}
                    />
                    <label
                      htmlFor="onsite"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      On-site
                    </label>
                  </li>

                  <li className="flex items-center">
                    <input
                      id="hybrid"
                      type="radio"
                      name="locationType"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => {
                        params.updateLocationType("Hybrid");
                        setParams(new Parameters({ ...params }));
                      }}
                      checked={params.location_type === "Hybrid"}
                    />
                    <label
                      htmlFor="hybrid"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Hybrid
                    </label>
                  </li>

                  {/* Job Type Filter */}
                  <li className="mt-4 font-medium text-gray-700 dark:text-gray-100">
                    Job Type
                  </li>

                  <li className="flex items-center">
                    <input
                      id="fulltime"
                      type="radio"
                      name="jobType"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => {
                        params.updateJobType("Full-time");
                        setParams(new Parameters({ ...params }));
                      }}
                      checked={params.job_type === "Full-time"}
                    />
                    <label
                      htmlFor="fulltime"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Full-time
                    </label>
                  </li>

                  <li className="flex items-center">
                    <input
                      id="parttime"
                      type="radio"
                      name="jobType"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => {
                        params.updateJobType("Part-time");
                        setParams(new Parameters({ ...params }));
                      }}
                      checked={params.job_type === "Part-time"}
                    />
                    <label
                      htmlFor="parttime"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Part-time
                    </label>
                  </li>

                  <li className="flex items-center">
                    <input
                      id="contract"
                      type="radio"
                      name="jobType"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => {
                        params.updateJobType("Contract");
                        setParams(new Parameters({ ...params }));
                      }}
                      checked={params.job_type === "Contract"}
                    />
                    <label
                      htmlFor="contract"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Contract
                    </label>
                  </li>

                  <li className="flex items-center">
                    <input
                      id="internship"
                      type="radio"
                      name="jobType"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => {
                        params.updateJobType("Internship");
                        setParams(new Parameters({ ...params }));
                      }}
                      checked={params.job_type === "Internship"}
                    />
                    <label
                      htmlFor="internship"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Internship
                    </label>
                  </li>

                  <li>
                    <div className="flex flex-row align-middle space-x-3">
                      <div>
                        <button
                          onClick={() => {
                            params.updateJobType("");
                            params.updateLocationType("");
                            params.updatePage("1");
                            const newHref = `${getOpportunitiesRootPage()}?${params.toStringParams()}`;
                            window.location.href = newHref;
                          }}
                          className="focus:outline-none w-full text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5  me-2  dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                        >
                          Clear
                        </button>
                      </div>

                      <div className="flex">
                        <button
                          onClick={() => {
                            params.updatePage("1");
                            const newHref = `${getOpportunitiesRootPage()}?${params.toStringParams()}`;
                            window.location.href = newHref;
                          }}
                          className=" focus:outline-none w-full text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5  me-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <>
          {pageReady ? (
            <>
              {canMap ? (
                <>
                  {opportunities.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-5 my-10 md:mx-0 mx-2">
                      {opportunities.map((val, key) => opportunity(val, key))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      Uh oh! No results found. Try adjusting your search
                      criteria or filters.
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="text-center py-10">
                    Uh oh! Something went wrong with our request for data.
                    Please refresh and try again!
                  </div>
                </>
              )}
            </>
          ) : (
            <div role="status" className="flex justify-center py-10">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-teal-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </>

        <div className="flex justify-center">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-base h-10">
              {hasPrev ? (
                <li>
                  <button
                    onClick={() => {
                      const nextPage = (parseInt(params.page) - 1).toString();
                      params.updatePage(nextPage);
                      const newHref = `${getOpportunitiesRootPage()}?${params.toStringParams()}`;
                      window.location.href = newHref;
                    }}
                    className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </button>
                </li>
              ) : null}
              {Array.from({ length: totalPages }).map((_, index) =>
                index + 1 === parseInt(params.page) ? (
                  <li key={index}>
                    <button
                      onClick={() => {
                        const nextPage = (index + 1).toString();
                        params.updatePage(nextPage);
                        const newHref = `${getOpportunitiesRootPage()}?${params.toStringParams()}`;
                        window.location.href = newHref;
                      }}
                      className="flex items-center justify-center px-4 h-10 leading-tight text-teal-200 bg-teal-700 border border-gray-300 hover:bg-teal-600 hover:text-teal-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      {index + 1}
                    </button>
                  </li>
                ) : (
                  <li key={index}>
                    <button
                      onClick={() => {
                        const nextPage = (index + 1).toString();
                        params.updatePage(nextPage);
                        const newHref = `${getOpportunitiesRootPage()}?${params.toStringParams()}`;
                        window.location.href = newHref;
                      }}
                      className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
              {hasNext ? (
                <li>
                  <button
                    onClick={() => {
                      const nextPage = (parseInt(params.page) + 1).toString();
                      params.updatePage(nextPage);
                      const newHref = `${getOpportunitiesRootPage()}?${params.toStringParams()}`;
                      window.location.href = newHref;
                    }}
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </button>
                </li>
              ) : null}
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
