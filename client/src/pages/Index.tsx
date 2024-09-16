import * as React from "react";
import NavBar from "../components/Navbar";
import { createRoot } from "react-dom/client";
import * as pic from "../assets/t.png";
import "../styles/styles.css";

const Index = () => {
  return (
    <>
      <NavBar />
      <div className="container text-left ttt">
        This is the home page.
      </div>
    </>
  );
};

export default Index;
const root = document.getElementById("root");
createRoot(root).render(<Index />);
