"use client"
import { toast, DashboardHome } from '@/app/api/routes/page';
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
    </>
  )
}

export default Dashboard