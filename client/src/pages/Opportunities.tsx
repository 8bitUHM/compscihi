import * as React from "react";
import NavBar from "../components/Navbar";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";

const Opportunities = () => {
  return (
    <>
      <NavBar />
      <div className="container py-5">This is the opportunities page.</div>
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Opportunities />);
