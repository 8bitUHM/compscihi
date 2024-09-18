import * as React from "react";
import NavBar from "../components/Navbar";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import Footer from "../components/Footer";

const Opportunities = () => {
  return (
    <>
      <NavBar />
      <div className="container py-5">This is the opportunities page.</div>
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Opportunities />);
