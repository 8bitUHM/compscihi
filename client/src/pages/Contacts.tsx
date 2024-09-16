import * as React from "react";
import NavBar from "../components/Navbar";
import { createRoot } from "react-dom/client";
import * as pic from "../assets/t.png";
import "../styles/styles.css";

const Contacts = () => {
  return (
    <>
      <NavBar />
      <div className="container text-left ttt">
        this is the contacts page.
      </div>
    </>
  );
};

export default Contacts;
const root = document.getElementById("root");
createRoot(root).render(<Contacts />);
