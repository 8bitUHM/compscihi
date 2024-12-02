import * as React from "react";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";

const StudentProfiles = () => {
  useEffect(() => initFlowbite(), []);

  return (
    <>
      <div className="container py-5 mt-16">This is the student profile(s) page</div>
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<StudentProfiles />);
