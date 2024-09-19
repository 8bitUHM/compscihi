import * as React from "react";
import { createRoot } from "react-dom/client";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import SignupForm from "../components/SignupForm";
import "../styles/styles.css";

const Signup = () => {
  return (
    <>
      <NavBar />
      <SignupForm />
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Signup />);
