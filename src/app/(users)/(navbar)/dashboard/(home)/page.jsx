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
        {data.map((blog, index) => (
          <div key={index} className={`section_${index + 1}`}>
            <CardWithDetail image_src={`/${blog.image}`} image_name={blog.image} title={blog.title} content={blog.description} index={index} />
          </div>
        ))}
      </section>
    </>
  );
};

export default DashboardHome;
