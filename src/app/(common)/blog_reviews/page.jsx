"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from "@/app/api/routes/page";

const BlogReviews = ({ id }) => {
  const [blogReviews, setBlogReviews] = useState([]);
  const [blogReviewsCount, setBlogReviewsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/blog_reviews/${id}`);
      const responseData = await response.json();
      setBlogReviews(responseData.data);
      setBlogReviewsCount(responseData.data.length);
    };

    fetchData();
  }, [id]);

  return (
    <>
      <section>
        <div className='mx-24'>
          <div className="title">
            <p className="text-xl font-bold mb-5">{blogReviewsCount} Comments</p>
          </div>
          {blogReviews.map((blogReview) => (
            <div key={blogReview.id} className="header flex my-4 leading-loose ">
              <div className='w-11/12'>
                <div className="blog_commented_name font-bold">
                  <p className="">{blogReview.blog_comment_name}</p>
                </div>
                <div className="blog_commented_comments ms-8 break-all text-justify w-11/12 whitespace-pre-wrap">
                  <pre className="">{blogReview.blog_comment}</pre>
                </div>
              </div>
              <div className="reply_button">
                <button type='Submit' name='blog_reviews_reply_button' id='blog_reviews_reply_button' className='blog_reviews_reply_button hover:text-blue-500'> Reply </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogReviews;