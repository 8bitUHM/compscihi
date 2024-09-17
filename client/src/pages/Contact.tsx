import * as React from "react";
import NavBar from "../components/Navbar";
import { createRoot } from "react-dom/client";
import * as pic from "../assets/t.png";
import "../styles/styles.css";

const Contact = () => {
  return (
    <>
      <NavBar />
      <div className="container text-left ttt">
        this is the contact page.
      </div>
    </>
  );
};

export default Contact;
const root = document.getElementById("root");
createRoot(root).render(<Contact />);
