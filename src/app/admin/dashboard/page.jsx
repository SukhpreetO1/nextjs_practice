"use client";
import { ADMIN_BLOGS, ADMIN_CONTACT_MESSAGES, Link, Loader, USER_DETAILS } from "@/app/api/routes/page";
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [blogsCount, setBlogsCount] = useState(0);
  const [usersCount, setUserCount] = useState(0);
  const [contactFormCount, setContactFormCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin_dashboard');
        const responseData = await response.json();
        setBlogsCount(responseData.count);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    }
    fetchData();

    const fetchUsersData = async () => {
      const response = await fetch('/api/users');
      const usersCount = await response.json();
      setUserCount(usersCount.data.length);
    }
    fetchUsersData();

    const fetchContactFormData = async () => {
      const response = await fetch('/api/contact_messages');
      const contactFormMessagesCount = await response.json();
      setContactFormCount(contactFormMessagesCount.data.length);
    }
    fetchContactFormData();
  }, []);

  return (
    <section>
      <div className="admin_dashboard ml-60 flex flex-wrap">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="cards mt-4 mr-4 w-80">
              <Link href={ADMIN_BLOGS} className="block max-w-80 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Blogs uploaded</h1>
                <p className="my-2 text-xl tracking-tight dark:text-white">{blogsCount}</p>
              </Link>
            </div>
            <div className="cards mt-4 mr-4 w-80">
              <Link href={USER_DETAILS} className="block max-w-80 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Users Details</h1>
                <p className="my-2 text-xl tracking-tight dark:text-white">{usersCount}</p>
              </Link>
            </div>
            <div className="cards mt-4 mr-4 w-80">
              <Link href={ADMIN_CONTACT_MESSAGES} className="block max-w-80 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Contact Form Details</h1>
                <p className="my-2 text-xl tracking-tight dark:text-white">{contactFormCount}</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;