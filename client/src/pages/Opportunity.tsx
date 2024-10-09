import * as React from "react";
import { createRoot } from "react-dom/client";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/styles.css";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";
import { useState } from "react";
import { isRunningLocal } from "../util/routing";
import { Opportunity } from "../types/opportunity";
import { getRootOpportunityIdFetchUrl } from "../util/routing";

const Opportunity = () => {
  const [opportunity, setOpportunity] = useState<Opportunity>();

  const [pageReady, setPageReady] = useState<boolean>(false);
  const [canDisplayOpportunity, setCanDisplayOpportunity] =
    useState<boolean>(false);
  const [error, setError] = useState();

  useEffect(() => {
    initFlowbite();
    fetchData();
  }, []);

  const fetchData = async () => {
    setPageReady(false);
    setCanDisplayOpportunity(false);

    try {
      const clientParams = new URLSearchParams(window.location.search);
      const opportunityId = clientParams.get("opportunity-id");

      const fetchUrl = `${getRootOpportunityIdFetchUrl()}?id=${opportunityId}`;
      const response = await fetch(fetchUrl);

      if (!response.ok) {
        setPageReady(true);
        throw new Error("Failed to fetch opportunities");
      }

      const data = await response.json();
      if (data.results.length > 0) {
        setOpportunity(data.results[0]);
        setCanDisplayOpportunity(true);
      }
    } catch (e: any) {
      console.log(e);
      setError(e);
    } finally {
      setPageReady(true);
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-full container mx-auto px-3 ">
        {pageReady ? (
          <>
            {canDisplayOpportunity ? (
              <>
                {/* Job Overview  */}
                <article className="pt-5 flex flex-col gap-2 ">
                  <div>
                    <a
                      className="underline"
                      href={
                        isRunningLocal
                          ? "./opportunities.html?search=&location_type=&job_type=&ordering=-posted_date&page=1"
                          : "/opportunities?search=&location_type=&job_type=&ordering=-posted_date&page=1"
                      }
                    >
                      Back to Opportunities Page
                    </a>
                  </div>
                  <h1 className="font-bold text-2xl md:text-3xl">
                    {opportunity.title}
                  </h1>
                  <div className="space-y-2 text-sm font-medium">
                    <span className="text-gray-500">
                      <small>{`${opportunity.posted_date} · ${opportunity.company} · 
                ${opportunity.location} -- ${opportunity.location_type}`}</small>
                    </span>
                    {/* Wage/Salary Details */}
                    {opportunity.pay && opportunity.pay_per ? (
                      <p>
                        <small>{`$${opportunity.pay}/${opportunity.pay_per} · ${opportunity.job_type}`}</small>
                      </p>
                    ) : (
                      <p>
                        <small>{`${opportunity.job_type}`}</small>
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="pt-3 text-medium text-pretty w-full">
                    <p>{opportunity.description}</p>
                  </div>

                  {/* Job Benefits */}
                  <div className="text-medium pt-3">
                    {opportunity.benefits
                      ? opportunity.benefits.map((val, key) => (
                          <span
                            className="me-2 text-xs bg-blue-50 text-green-700 font-medium py-1 px-2 ring-1 ring-inset ring-green-600/20 rounded-lg"
                            key={key}
                          >
                            {val}
                          </span>
                        ))
                      : null}
                  </div>

                  {/* Job Qualifications */}
                  <div className="py-5 flex flex-col gap-3">
                    <h1 className="font-bold text-xl md:text-3xl">
                      Qualifications
                    </h1>

                    {/* List of Qualifications */}
                    <div className="space-y-4">
                      <ul className="list-disc text-medium ">
                        {opportunity.qualifications.map((val, key) => (
                          <li key={key}>{val}</li>
                        ))}
                      </ul>

                      {/* Skills */}
                      <div className="list-inside text-green-600 font-semibold text-medium">
                        {opportunity.skills.map((val, key) => (
                          <span
                            className="me-2 text-xs bg-blue-50 text-green-700 font-medium py-1 px-2 ring-1 ring-inset ring-green-600/20 rounded-lg"
                            key={key}
                          >
                            {val}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Application Instructions */}

                    <div className="mt-4 flex flex-col gap-4 text-base">
                      <span className="font-medium">
                        Interested in Applying?
                      </span>
                      <div>
                        {opportunity.apply_link ? (
                          <p>
                            {opportunity.application_instructions}{" "}
                            <span className="underline">
                              {opportunity.apply_link}
                            </span>
                          </p>
                        ) : (
                          <p>{opportunity.application_instructions}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </>
            ) : (
              <>
                <section className="bg-white dark:bg-gray-900">
                  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                      <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-teal-500 dark:text-primary-500">
                        404
                      </h1>
                      <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                        Something's missing.
                      </p>
                      <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                        Sorry, we can't find that opportunity. You'll find lots
                        to explore on the home page.{" "}
                      </p>
                      <a
                        href={isRunningLocal ? `./` : `/`}
                        className="inline-flex text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
                      >
                        Back to Opportunities
                      </a>
                    </div>
                  </div>
                </section>
              </>
            )}
          </>
        ) : (
          <>
            {error ? (
              <>
                <div className="flex justify-center py-10">
                  {`Uh oh! An error occured. ${error}`}
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Opportunity />);
