import * as React from "react";
import NavBar from "../components/Navbar";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

const Opportunity = () => {
  const [opportunityId, setOpportunityId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const opportunityId = params.get("opportunity-id");
    setOpportunityId(opportunityId);
  }, []);
  return (
    <>
      <NavBar />
      <div className="container py-5">This is the opportunity page  page</div>
      <div>{opportunityId}</div>
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Opportunity />);
