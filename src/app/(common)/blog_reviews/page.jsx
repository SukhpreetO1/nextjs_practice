"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from "@/app/api/routes/page";

const BlogReviews = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const id = router.query;
  console.log( router );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/blog_reviews/${id}`);
      const responseData = await response.json();
      setData(responseData);
    };

    fetchData();
  }, [id]);

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