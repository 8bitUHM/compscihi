import * as React from "react";
import { createRoot } from "react-dom/client";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/styles.css";

const EmployerLogin = () => {
  return (
    <>
      <NavBar />

      {/* Notes:
       * This is out of the page.
       * Footer works if you remove NavBar.
       */}
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<EmployerLogin />);
