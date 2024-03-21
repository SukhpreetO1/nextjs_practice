"use client"
import { React, toast, ToastContainer, useEffect, DashboardHome } from '@/app/api/routes/page';

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