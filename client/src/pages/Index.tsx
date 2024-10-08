import * as React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import * as Image2 from "../assets/postbuilding.jpg";
import LoadingImage from "../components/LoadingImage";
import { isRunningLocal } from "../util/routing";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";

const Index = () => {
  useEffect(() => initFlowbite(), []);

  return (
    <>
      <NavBar />
      <section
        data-aos="fade-up"
        data-aos-duration="1500"
        className="bg-white dark:bg-gray-900 flex justify-center container mx-auto "
      >
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Tech opportunities for UH students
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Bringing Hawaii tech opportunities to University of Hawaii
              students, all in one place.
            </p>
            <div className="flex ">
              {isRunningLocal() ? (
                <>
                  <a
                    href="./opportunities.html?search=&location_type=&job_type=&ordering=&page=1"
                    className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-teal-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                  >
                    Opportunities
                    <svg
                      className="w-5 h-5 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  {/* <a
                    href="./student-profiles.html"
                    className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                  >
                    Student profiles
                  </a> */}
                </>
              ) : (
                <>
                  <a
                    href="/opportunities?search=&location_type=&job_type=&ordering=&page=1"
                    className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-teal-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                  >
                    Opportunities
                    <svg
                      className="w-5 h-5 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  {/* <a
                    href="/student-profiles"
                    className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                  >
                    Student profiles
                  </a> */}
                </>
              )}
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <LoadingImage
              imageUri={Image2}
              className="rounded lg:flex lg:mt-0 mt-12 h-auto max-w-full"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Index />);
