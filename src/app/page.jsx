"use client"
import { Navbar, React, toast, ToastContainer, useEffect } from '@/app/api/routes/page';

export default function CommonHome() {
  useEffect(() => {
    if (localStorage.getItem("hasShownLoginToast") === "false") {
      toast.success("Login successfully", {
        position: "top-right",
      });
    }
    localStorage.removeItem("hasShownLoginToast");
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer />
    </>
  );
}