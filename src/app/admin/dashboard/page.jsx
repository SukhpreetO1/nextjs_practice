"use client";
import { ADMIN_BLOGS, Link } from "@/app/api/routes/page";
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin_dashboard');
        const responseData = await response.json();
        setCount(responseData.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <section>
      <div className="admin_dashboard ml-60">
        <div className="cards mt-4">
          <Link href={ADMIN_BLOGS} className="block max-w-80 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Blogs uploaded</h1>
            <p className="my-2 text-xl tracking-tight dark:text-white">{count}</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;