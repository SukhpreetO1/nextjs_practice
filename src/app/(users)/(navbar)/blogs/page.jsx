"use client";
import { CardWithDetail, Link, NAVBAR_BLOGS } from "@/app/api/routes/page";
import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [data, setData] = useState([]);

  function truncateWords(text, limit, NAVBAR_BLOGS, id) {
    const words = text.split(' ');
    if (words.length > limit) {
      return (
        <span>
          {words.slice(0, limit).join(' ') + '   '}
          <a href={`${NAVBAR_BLOGS}/${id}`} style={{ color: 'blue', textDecoration: 'underline' }}>See more....</a>
        </span>
      );
    } else {
      return text;
    }
  }

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
      <section className="mb-16">
        {data.map((blog, index) => (
          <div key={index} className={`section_${index + 1}`}>
            <CardWithDetail image_src={blog.image} image_name={blog.title} title={blog.title} content={truncateWords(blog.description, 100, NAVBAR_BLOGS, blog.id)} index={index} className="blogs_cards"/>
          </div>
        ))}
      </section>
    </>
  );
};

export default Blogs;
