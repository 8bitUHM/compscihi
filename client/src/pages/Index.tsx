import * as React from "react";
import NavBar from "../components/Navbar";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";

const Index = () => {
  return (
    <>
      <NavBar />
      <div className="container py-24">This is the home page.</div>
    </>
  );
};

export default Index;
const root = document.getElementById("root");
createRoot(root).render(<Index />);
