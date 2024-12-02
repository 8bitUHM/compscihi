import * as React from "react";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import { useState, useEffect } from "react";
import { initFlowbite } from "flowbite";

const StudentProfile = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userIdParam = params.get("user-id");
    setUserId(userIdParam);
    initFlowbite();
  }, []);

  return (
    <>
      <div className="container py-5 mt-16">This is the student profile page</div>
      <div>{userId}</div>
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<StudentProfile />);
