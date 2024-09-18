import * as React from "react";
import { createRoot } from "react-dom/client";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/styles.css";

const Signup = () => {
  return (
    <>
      <NavBar />
      <p className="py-5">This is the signup page</p>
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Signup />);
