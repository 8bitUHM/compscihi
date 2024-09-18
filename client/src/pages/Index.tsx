import * as React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import * as Image1 from '../assets/projectday.jpeg';
import * as Image2 from '../assets/postbuilding.jpg';
import * as Image3 from '../assets/icsclasses.jpg';
import * as Image4 from '../assets/hackathon.jpeg';

const Index = () => {
  return (
    <>
      <NavBar />
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Tech opportunities for UH students</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Bringing Hawaii tech opportunities to University of Hawaii students, all in one place.</p>
            <a href="./opportunities.html" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-teal-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              View opportunities
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
            {/* <a href="./opportunities.html" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-teal-500 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              View Opportunities
            </a> */}
            <a href="./student-profiles.html" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              View student profiles
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            {/* <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" /> */}

            <div id="default-carousel" className="relative w-full" data-carousel="static">
              {/* <!-- Carousel wrapper --> */}
              <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {/* <!-- Item 1 --> */}
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src={Image1} alt="Image 1" />
                </div>
                {/* <!-- Item 2 --> */}
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src={Image2} alt="Image 2" />
                </div>
                {/* <!-- Item 3 --> */}
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src={Image3} alt="Image 3" />
                </div>
                {/* <!-- Item 4 --> */}
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src={Image4} alt="Image 4" />
                </div>
                {/* <!-- Item 5 --> */}
                {/* <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src={Image5} alt="Image 5" />
                </div> */}
              </div>
              {/* <!-- Slider indicators --> */}
              <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
              </div>
              {/* <!-- Slider controls --> */}
              <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                  </svg>
                  <span className="sr-only">Previous</span>
                </span>
              </button>
              <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                  </svg>
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Index />);
