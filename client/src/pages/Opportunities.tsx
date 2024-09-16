import * as React from "react";
import NavBar from "../components/Navbar";
import { createRoot } from "react-dom/client";
import * as pic from "../assets/t.png";
import "../styles/styles.css";

const Opportunities = () => {
  return (
    <>
      <NavBar />
      <div className="container text-left ttt">
        This is the opportunities page.
      </div>
    </>
  );
};

export default Opportunities;
const root = document.getElementById("root");
createRoot(root).render(<Opportunities />);
