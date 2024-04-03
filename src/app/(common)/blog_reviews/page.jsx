"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from "@/app/api/routes/page";

const BlogReviews = ({ id }) => {
  const [data, setData] = useState([]);
  const router = useRouter();

  // useEffect(() => { 
  //   const fetchData = async () => {
  //     const response = await fetch(`/api/blog_reviews/${id}`);
  //     const responseData = await response.json();
  //     console.log(responseData);
  //     setData(responseData);
  //   };

  //   fetchData();
  // }, [id]);

  return (
    <>
      <section>
        <div>
          BlogReviews
        </div>
      </section>
    </>
  );
};

export default BlogReviews;