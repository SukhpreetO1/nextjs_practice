"use client";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon, SubmitButton, TextAreaField, Tooltip, collection, doc, faReply, faThumbsDown, faThumbsUp, getFirestore, increment, toast, updateDoc } from "@/app/api/routes/page";

const BlogReviews = ({ id, updatedComments }) => {
  const [blogReviews, setBlogReviews] = useState([]);
  const [blogReviewsCount, setBlogReviewsCount] = useState(0);

  // getting all blogs reply
  const [blogReviewReply, setBlogReviewReply] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/blog_reviews/${id}`);
      const responseData = await response.json();
      setBlogReviews(responseData.data);
      setBlogReviewsCount(responseData.data.length);
    };
    fetchData();

    const fetchReplyData = async () => {
      const response = await fetch(`/api/blog_reviews_reply/${id}`);
      const responseData = await response.json();
      setBlogReviewReply(responseData.data);
    };
    fetchReplyData()
  }, [id]);

  useEffect(() => {
    setBlogReviews(updatedComments);
    setBlogReviewsCount(updatedComments.length);
  }, [updatedComments]);

  const handleLikeButtonClick = (blog_comment_id) => {
    const firestore = getFirestore();
    const docRef = doc(collection(firestore, 'blogs_comment'), blog_comment_id);

    updateDoc(docRef, {
      blogs_comment_like: increment(1)
    })
      .then(() => {
        toast.success("Blog comment liked successfully!", { position: "top-right" });
      })
      .catch((error) => {
        console.error('Error updating blogs comment like count: ', error);
      });
  }

  const handleDislikeButtonClick = (blog_comment_id) => {
    const firestore = getFirestore();
    const docRef = doc(collection(firestore, 'blogs_comment'), blog_comment_id);

    updateDoc(docRef, {
      blogs_comment_dislike: increment(1)
    })
      .then(() => {
        toast.success("Blog comment disliked", { position: "top-right" });
      })
      .catch((error) => {
        console.error('Error updating blogs comment dislike count: ', error);
      });
  }

  return (
    <>
      <section>
        <div className='mx-24'>
          <div className="title">
            <p className="text-2xl italic font-thin mb-5"><span>{blogReviewsCount}</span> Comments</p>
          </div>
          <hr className='border-t-2 border-gray-400' />
          {blogReviews.map((blogReview) => (
            <div key={blogReview.id} className="header my-4 leading-loose border-2 border-gray-300 rounded-lg px-6 py-6">
              <div className='flex'>
                <div className='w-11/12'>
                  <input type="hidden" name="blog_comment_id" value={blogReview.id} id="blog_comment_id" />
                  <div className="blog_commented_name font-bold">
                    <p className="">{blogReview.blog_comment_name} <span className='font-light text-sm ml-2 italic'>{new Date(blogReview.created_at.seconds * 1000).toLocaleString('en-GB', {day: '2-digit',month: 'short',year: 'numeric'})}</span></p>
                  </div>
                  <div className="blog_commented_comments ms-8 break-all text-justify w-11/12">
                    <pre className="whitespace-pre-wrap">{blogReview.blog_comment}</pre>
                  </div>
                </div>
                <div className="reply_button flex w-28">
                  <div>
                    <Tooltip showArrow={true} content="Like" className='text-blue-800'>
                      <button type='Submit' name='blog_reviews_like_button' id='blog_reviews_like_button' className='blog_reviews_like_button hover:text-blue-500 mr-4' onClick={() => handleLikeButtonClick(blogReview.id)} data-tip='Like Button Tooltip'><FontAwesomeIcon icon={faThumbsUp} /></button>
                    </Tooltip>
                    <span className='mr-3 -ml-2'>{blogReview.blogs_comment_like}</span>
                  </div>
                  <div>
                    <Tooltip showArrow={true} content="Dislike" className='text-red-700'>
                      <button type='Submit' name='blog_reviews_dislike_button' id='blog_reviews_dislike_button' className='blog_reviews_dislike_button hover:text-blue-500 mr-4' onClick={() => handleDislikeButtonClick(blogReview.id)}><FontAwesomeIcon icon={faThumbsDown} /></button>
                    </Tooltip>
                    <span className='mr-3 -ml-2'>{blogReview.blogs_comment_dislike}</span>
                  </div>
                </div>
              </div>
              {blogReviewReply.map((blogReviewReply) => (
                (blogReviewReply.blog_comment_id === blogReview.id) ?
                  (<div key={blogReviewReply.id} className="header my-4 leading-loose px-6">
                    <hr className='border-t-2 border-gray-300 mb-6 w-11/12 ml-16' />
                    <div className='flex'>
                      <div className='w-11/12 ml-16'>
                        <input type="hidden" name="blog_comment_reply_id" value={blogReviewReply.id} id="blog_comment_reply_id" />
                        <div className="blog_commented_name font-bold">
                          <p className="">{blogReviewReply.blog_comment_reply_name}</p>
                        </div>
                        <div className="blog_commented_comments ms-8 break-all text-justify w-11/12">
                          <pre className="whitespace-pre-wrap">{blogReviewReply.blog_comment_reply}</pre>
                        </div>
                      </div>
                    </div>
                  </div>) : null
              ))}
            </div>
          ))}
          {blogReviewsCount === 0 && (
            <div className="header flex my-4 leading-loose ">
              <div className='w-11/12'>
                <div className="blog_commented_name text-center">
                  <p className="">No comment found.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogReviews;