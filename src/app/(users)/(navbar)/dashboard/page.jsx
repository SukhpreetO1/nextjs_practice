"use client"
import { toast, ToastContainer, DashboardHome } from '@/app/api/routes/page';
import React, { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    if (localStorage.getItem("hasShownLoginToast") === "false") {
      // toast.success("Login successfully", {
      //   position: "top-right",
      // });
    }
    localStorage.removeItem("hasShownLoginToast");
  }, []);
  return (
    <>
      <DashboardHome />
      <ToastContainer />
    </>
  )
}

export default Dashboard