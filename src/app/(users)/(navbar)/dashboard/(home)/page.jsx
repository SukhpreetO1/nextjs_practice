"use client";
import { CardWithDetail } from "@/app/api/routes/page";
import React, { useEffect, useState } from "react";

const DashboardHome = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        setData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section>
        {data.some(blog => blog.dashboard_visible === 2) ? (
          data.map((blog, index) => (
            <div key={index} className={`section_${index + 1}`}>
              {blog.dashboard_visible === 2 ? (
                <CardWithDetail image_src={blog.image} image_name={blog.title} title={blog.title} content={blog.description} index={index} className="dashboard_home_images"/>
              ) : null}
            </div>
          ))
        ) : (
          <div>No blog visible right now.</div>
        )}
      </section>
    </>
  );
};

export default DashboardHome;
