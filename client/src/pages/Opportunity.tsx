import * as React from "react";
import { createRoot } from "react-dom/client";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import "../styles/styles.css";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";
import { useState } from "react";

const Opportunity = () => {
  const [opportunityId, setOpportunityId] = useState<string | null>(null);

  useEffect(() => {
    initFlowbite();

    const params = new URLSearchParams(window.location.search);
    const opportunityId = params.get("opportunity-id");
    setOpportunityId(opportunityId);
  }, []);

  return (
    <>
      <NavBar />
      <div>Opportunity page, search for opportunity {opportunityId}</div>
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Opportunity />);
