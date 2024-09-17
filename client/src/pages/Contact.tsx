import * as React from "react";
import NavBar from "../components/Navbar";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";

const Contact = () => {
  return (
    <>
      <NavBar />
      <div className="container py-5">this is the contact page.</div>
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Contact />);
