import * as React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";
import { auth } from "../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  useEffect(() => initFlowbite(), []);

  return (
    <>
      <NavBar />
      {/* Implement forgot password in here */}
      Forgot password
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<ForgotPassword />);
