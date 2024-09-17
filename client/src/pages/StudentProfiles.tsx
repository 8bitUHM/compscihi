import * as React from "react";
import NavBar from "../components/Navbar";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";

const StudentProfiles = () => {
  return (
    <>
      <NavBar />
      <div className="container py-24">This is the student profile(s) page</div>
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<StudentProfiles />);
