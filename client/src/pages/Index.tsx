import * as React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";

const Index = () => {
  return (
    <>
      <NavBar />
      <div className="container py-5">This is the home page.</div>
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Index />);
