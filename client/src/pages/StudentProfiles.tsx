import * as React from "react";
import NavBar from "../components/Navbar";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import Footer from "../components/Footer";

const StudentProfiles = () => {
  return (
    <>
      <NavBar />
      <div className="container py-5">This is the student profile(s) page</div>
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<StudentProfiles />);
