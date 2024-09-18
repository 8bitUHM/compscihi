import * as React from "react";
import NavBar from "../components/Navbar";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

const StudentProfile = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userIdParam = params.get("user-id");
    setUserId(userIdParam);
  }, []);
  return (
    <>
      <NavBar />
      <div className="container py-5">This is the student profile page</div>
      <div>{userId}</div>
      <Footer />
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<StudentProfile />);
