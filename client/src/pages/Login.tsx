import * as React from "react";
import { createRoot } from "react-dom/client";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import "../styles/styles.css";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";

const Login = () => {
  useEffect(() => initFlowbite(), []);

  return (
    <>
      <NavBar />
      <LoginForm />
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<Login />);
