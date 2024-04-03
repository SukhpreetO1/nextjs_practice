"use client";
import React, { useEffect, useState } from 'react';
import { SubmitButton, TextAreaField, auth, collection, db, getDocs, getFirestore, query, serverTimestamp, where } from "@/app/api/routes/page";

const BlogReviews = ({ id, updatedComments }) => {
  const [blogReviews, setBlogReviews] = useState([]);
  const [blogReviewsCount, setBlogReviewsCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [replyFormData, setReplyFormData] = useState({ blog_comment_reply: "" });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/blog_reviews/${id}`);
      const responseData = await response.json();
      setBlogReviews(responseData.data);
      setBlogReviewsCount(responseData.data.length);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setBlogReviews(updatedComments);
    setBlogReviewsCount(updatedComments.length);
  }, [updatedComments]);

  const replyFormSubmit = async (e) => {
    e.preventDefault();
    console.log("replyFormData", replyFormData);

    const firestore = getFirestore();
    const usersRef = collection(firestore, 'users');
    const q = query(usersRef, where("email", "==", auth.currentUser.email));
    const querySnapshot = await getDocs(q);
    const userFirestoreId = querySnapshot.docs[0].id;

    const user_data = {
      user_id: userFirestoreId,
      blog_id: id,
      // blog_comment_id : ,
      blog_comment_reply: replyFormData.blog_comment_reply,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    }
    console.log(user_data);
    // await addDoc(collection(db, 'blogs_comment_reply'), user_data);
    // toast.success("Reply added successfully", { position: "top-right" });

    // setReplyFormData({ blog_comment_reply: '' });
    // setShowModal(false);
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
            <div key={blogReview.id} className="header flex my-4 leading-loose border-2 border-gray-300 rounded-lg px-6 py-6">
              <div className='w-11/12'>
                <input type="hidden" name="blog_comment_id" value={blogReview.id} id="blog_comment_id"/>
                <div className="blog_commented_name font-bold">
                  <p className="">{blogReview.blog_comment_name}</p>
                </div>
                <div className="blog_commented_comments ms-8 break-all text-justify w-11/12">
                  <pre className="whitespace-pre-wrap">{blogReview.blog_comment}</pre>
                </div>
              </div>
              <div className="reply_button">
                <button type='Submit' name='blog_reviews_reply_button' id='blog_reviews_reply_button' className='blog_reviews_reply_button hover:text-blue-500' onClick={() => setShowModal(true)}> Reply </button>
              </div>
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
          {showModal && (
            <div id="default-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-80 h-full">
              <div className="relative p-4 w-4/6 max-h-full blog_modal">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Blog Comment Reply
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={() => setShowModal(false)}>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                    </button>
                  </div>
                  <form method='POST' onSubmit={replyFormSubmit}>
                    <div className="blog_details py-8 px-8">
                      <div className="comment_reply">
                        <TextAreaField label_heading="" id="blog_comment_reply" name="blog_comment_reply" className="blog_comment_reply" value={replyFormData.blog_comment_reply} onChange={(e) => setReplyFormData({ ...replyFormData, blog_comment_reply: e.target.value })} div_name="blog_comment_reply" placeholder="Add reply here" />
                      </div>
                      <div className="comment_reply_submit">
                        <SubmitButton name="blog_comment_reply_submit" id="blog_comment_reply_submit" className="blog_comment_reply_submit" div_name="blog_comment_reply_submit -mt-1" label="Submit Reply" />
                      </div>
                    </div>
                  </form>
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