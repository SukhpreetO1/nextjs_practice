"use client";
import { CardWithDetail, Link, Loader, NAVBAR_BLOGS, NAVBAR_DASHBOARD } from "@/app/api/routes/page";
import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  function truncateWords(text, limit, NAVBAR_BLOGS, id) {
    if (text.length > limit) {
      return (
        <span>
          {text.slice(0, limit) + ' '}
          <Link href={`${NAVBAR_BLOGS}/${id}`} className="text-cyan-800 font-extrabold mr-4"> Continue Reading ....</Link>
        </span>
      );
    } else {
      return text;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const response = await fetch('/api/blogs');
        const data = await response.json();
        setData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    setLoader(false);
  }, []);

  return (
    <>
      <section className="mb-20">
        {loader ? (<Loader />) : (
          <div>
            <div className="breadcrumbs">
              <nav className="flex px-5 py-3 text-gray-700 dark:bg-gray-800 dark:border-gray-700 w-64" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  <li className="inline-flex items-center">
                    <Link href={NAVBAR_DASHBOARD} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                      </svg>
                      <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Blogs</span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>

            {data.map((blog, index) => (
              <div key={index} className={`px-20 section_${index + 1}`}>
                <CardWithDetail image_src={blog.image} image_name={blog.title} title={blog.title} content={truncateWords(blog.description, 200, NAVBAR_BLOGS, blog.id)} index={index} className="blogs_cards" />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Blogs;
