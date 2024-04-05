"use client"
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon, faPenToSquare, faTrashCan, faInfo, faPlus, Link, ADMIN_ADD_BLOGS, toast, ADMIN_EDIT_BLOGS, doc, db, deleteDoc, Image, getFirestore, getDocs, collection, Loader, TextAreaField, SubmitButton, where, query, auth, serverTimestamp, addDoc, faReply, Tooltip } from '@/app/api/routes/page';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [blogModalDetail, setBlogModalDetail] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const [blogReviews, setBlogReviews] = useState([]);
    const [replyFormData, setReplyFormData] = useState({ blog_comment_reply: "" });
    const [blogCommentId, setBlogCommentId] = useState();

    const [blogReviewReply, setShowCommentsReply] = useState(false);
    const [blogReviewCommentReplies, setBlogReviewCommentReplies] = useState([]);
    const [blogReviewsCount, setBlogReviewsCount] = useState(0);

    useEffect(() => {
        if (localStorage.getItem("hasShownBlogAddedToast") === "false") {
            showToast("New blog added successfully");
        } else if (localStorage.getItem("hasShownBlogUpdatedToast") === "false") {
            showToast("Blog updated successfully");
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedBlogId !== null) {
            fetchBlogData(selectedBlogId);
        }
    }, [selectedBlogId]);

    useEffect(() => {
        const initialCheckedState = blogs.map((blog) => blog.dashboard_visible === 1 ? false : true);
        setIsChecked(initialCheckedState);
    }, [blogs]);

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch("/api/blogs");
        const data = await response.json();
        setBlogs(data.data);
        setLoading(false);
    };
    const fetchBlogData = async (blog_id) => {
        const response = await fetch(`/api/blogs/blog_modal/${blog_id}`);
        const data = await response.json();
        setBlogModalDetail(data.data);

        const reviews_response = await fetch(`/api/blog_reviews/${blog_id}`);
        const reviews_data = await reviews_response.json();
        setBlogReviewsCount(reviews_data.data.length);
        setBlogReviews(reviews_data.data);

        const reviews_comment_response = await fetch(`/api/blog_reviews_reply/${blog_id}`);
        const reviews_comment_data = await reviews_comment_response.json();
        setBlogReviewCommentReplies(reviews_comment_data.data);
    };

    const showToast = (message) => {
        toast.success(message, { position: "top-right" });
        localStorage.removeItem("hasShownBlogAddedToast");
    };

    const modalHandler = () => {
        setShowModal(false);
        setBlogModalDetail("")
    };

    const handleCheckboxChange = async (e, blogId) => {
        const dashboard_visible_value = e.target.checked ? 1 : 2;
        setIsChecked(e.target.checked);

        try {
            const hasDashboardVisibleTwo = await checkIfAnyBlogHasDashboardVisibleTwo();

            if (hasDashboardVisibleTwo && dashboard_visible_value === 2) {
                toast.error("Another blog is already visible on the dashboard.", { position: "top-right" });
            } else {
                const response = await fetch('/api/blogs', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: blogId, dashboard_visible: dashboard_visible_value }),
                });

                if (response.ok) {
                    if (dashboard_visible_value === 2) {
                        toast.success("Blog is not visible on the dashboard now.", { position: "top-right" });
                    } else {
                        toast.success("Now blog visible on the dashboard.", { position: "top-right" });
                    }
                } else {
                    toast.error("Something went wrong. Please try again later.", { position: "top-right" });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleReplyButtonClick = (blog_comment_id) => {
        setBlogCommentId(blog_comment_id);
        setShowCommentsReply(!blogReviewReply);
    };

    const handleLikeButtonClick = (blog_comment_id) => {
        console.log("like button", blog_comment_id);
    }

    const handleDislikeButtonClick = (blog_comment_id) => {
        console.log("dislike button", blog_comment_id);
    }

    async function checkIfAnyBlogHasDashboardVisibleTwo() {
        const firestore = getFirestore();
        const querySnapshot = await getDocs(collection(firestore, "blogs"));
        let hasDashboardVisibleTwo = false;
        querySnapshot.forEach((doc) => {
            const blogData = doc.data();
            if (blogData.dashboard_visible === 2) {
                hasDashboardVisibleTwo = true;
                return;
            }
        });

        return hasDashboardVisibleTwo;
    }

    const truncateDescription = (description) => {
        const words = description.match(/.{1,10}/g);
        if (words && words.length > 10) {
            return words.slice(0, 13).join(' ') + '...';
        }
        return description;
    };

    const deleteBlog = async (blogId) => {
        try {
            const ref = doc(db, "blogs", blogId);
            deleteDoc(ref)
                .then(() => {
                    toast.success("Blog deleted successfully", {
                        position: "top-right",
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    }

    const replyFormSubmit = async (e) => {
        e.preventDefault();
        const firestore = getFirestore();
        const usersRef = collection(firestore, 'users');
        const q = query(usersRef, where("email", "==", auth.currentUser.email));
        const querySnapshot = await getDocs(q);
        const userFirestoreId = querySnapshot.docs[0].id;
        const userData = querySnapshot.docs[0].data();

        const user_data = {
            user_id: userFirestoreId,
            blog_id: selectedBlogId,
            blog_comment_reply_name: userData.first_name + " " + userData.last_name,
            blog_comment_id: blogCommentId,
            blog_comment_reply: replyFormData.blog_comment_reply,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp()
        }
        await addDoc(collection(db, 'blogs_comment_reply'), user_data);
        fetchBlogData(selectedBlogId);
        toast.success("Reply added successfully", { position: "top-right" });

        setReplyFormData({ blog_comment_reply: '' });
        setShowCommentsReply(false);
    }

    return (
        <>
            <section>
                {loading ? (
                    <Loader />
                ) : (
                    <div className="blogs_page ml-60">
                        <div className="heading text-center text-5xl font-bold mt-8 mb-12">
                            Blogs
                        </div>

                        <div className="add_blogs_page absolute right-24 top-20">
                            <Link href={ADMIN_ADD_BLOGS} >
                                <FontAwesomeIcon icon={faPlus} className='w-8 h-8' />
                            </Link>
                        </div>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 w-1/6">
                                            Blog name
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-2/3">
                                            Description
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogs.map((blog, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4">{blog.title}</td>
                                            <td className="px-6 py-4">{truncateDescription(blog.description)}</td>
                                            <td className="px-6 py-4 flex">
                                                <Link href="#" onClick={() => { setShowModal(true); setSelectedBlogId(blog.id); }}>
                                                    <FontAwesomeIcon icon={faInfo} className="w-4 h-4 mr-2 mt-1" />
                                                </Link>
                                                <Link href={`${ADMIN_EDIT_BLOGS}/${blog.id}`}>
                                                    <FontAwesomeIcon icon={faPenToSquare} className="w-4 h-4 mr-2 mt-1" />
                                                </Link>
                                                <Link href="#" onClick={() => deleteBlog(blog.id)}>
                                                    <FontAwesomeIcon icon={faTrashCan} className="w-4 h-4 mr-2 mt-1" />
                                                </Link>
                                                <div className="toggle_button">
                                                    <label className="inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" value={blog.dashboard_visible} className="sr-only peer" checked={blog.dashboard_visible === 2 ? isChecked : ''} onChange={(e) => handleCheckboxChange(e, blog.id)} />
                                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {blogs?.length < 1 && <div className="py-2 text-center text-xl">No data found</div>}
                            {showModal && (
                                <div id="default-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-80">
                                    <div className="relative p-4 w-4/6 max-h-full blog_modal">
                                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    Blog Details
                                                </h3>
                                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={modalHandler}>
                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="blog_details py-8 px-8">
                                                <div className='flex mb-4'>
                                                    <div className="uploaded_image mr-4">
                                                        {blogModalDetail.image && (
                                                            <Image src={blogModalDetail.image} alt="Uploaded Image" className="modal_showing_images" width={400} height={100} />
                                                        )}
                                                    </div>

                                                    <div className="title">
                                                        <p className='break-words text-justify italic text-2xl leading-loose mb-4'>{blogModalDetail.title}</p>
                                                    </div>
                                                </div>
                                                <div className="description">
                                                    <div className="description-content break-words">
                                                        <p className='break-words text-justify font-light leading-loose text-base'>{blogModalDetail.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className='border-t-2 border-gray-400 w-11/12 ml-12' />
                                            <div className="reviews p-7">
                                                <div className="reviews_heading text-2xl italic font-thin mb-5">
                                                    <span>{blogReviewsCount}</span> Comments
                                                </div>
                                                {blogReviews.map((blogReview) => (
                                                    <div key={blogReview.id} className="header my-4 leading-loose border-2 border-gray-300 rounded-lg px-6 py-6">
                                                        <div className='flex'>
                                                            <div className='w-11/12'>
                                                                <div className="blog_commented_name font-bold">
                                                                    <p className="">{blogReview.blog_comment_name}</p>
                                                                </div>
                                                                <div className="blog_commented_comments ms-8 break-all text-justify w-11/12">
                                                                    <pre className="whitespace-pre-wrap">{blogReview.blog_comment}</pre>
                                                                </div>
                                                            </div>
                                                            <div className="reply_button">
                                                                <Tooltip showArrow={true} content="I am a tooltip">
                                                                    <button type='Submit' name='blog_reviews_like_button' id='blog_reviews_like_button' className='blog_reviews_like_button hover:text-blue-500 mr-4' onClick={() => handleLikeButtonClick(blogReview.id)} data-tip='Like Button Tooltip'><FontAwesomeIcon icon={faThumbsUp} /></button>
                                                                </Tooltip>
                                                                <Tooltip showArrow={true} content="I am a tooltip">
                                                                    <button type='Submit' name='blog_reviews_dislike_button' id='blog_reviews_dislike_button' className='blog_reviews_dislike_button hover:text-blue-500 mr-4' onClick={() => handleDislikeButtonClick(blogReview.id)}><FontAwesomeIcon icon={faThumbsDown} /></button>
                                                                </Tooltip>
                                                                <Tooltip showArrow={true} content="I am a tooltip">
                                                                    <button type='Submit' name='blog_reviews_reply_button' id='blog_reviews_reply_button' className='blog_reviews_reply_button hover:text-blue-500' onClick={() => handleReplyButtonClick(blogReview.id)}> <FontAwesomeIcon icon={faReply} /> </button>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        {blogCommentId === blogReview.id && blogReviewReply && (
                                                            <form method='POST' onSubmit={replyFormSubmit}>
                                                                <div className='flex'>
                                                                    <div className="comments_reply w-5/6 mr-3 ml-6">
                                                                        <TextAreaField label_heading="" id="blog_comment_reply" name="blog_comment_reply" className="blog_comment_reply h-10" value={replyFormData.blog_comment_reply} onChange={(e) => setReplyFormData({ ...replyFormData, blog_comment_reply: e.target.value })} div_name="blog_comment_reply" placeholder="Add reply here" />
                                                                    </div>
                                                                    <div className="comment w-32">
                                                                        <SubmitButton name="blog_comment_reply_submit" id="blog_comment_reply_submit" className="blog_comment_reply_submit" div_name="blog_comment_reply_submit -mt-1" label="Add Reply" />
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        )}
                                                        {blogReviewCommentReplies.map((blogReviewCommentReply) => (
                                                            (blogReviewCommentReply.blog_comment_id === blogReview.id) ?
                                                                (<div key={blogReviewCommentReply.id} className="header my-4 leading-loose px-6">
                                                                    <hr className='border-t-2 border-gray-300 my-4 w-11/12 ml-6' />
                                                                    <div className='flex'>
                                                                        <div className='w-11/12'>
                                                                            <div className="blog_commented_name font-bold">
                                                                                <p className="">{blogReviewCommentReply.blog_comment_reply_name}</p>
                                                                            </div>
                                                                            <div className="blog_commented_comments ms-8 break-all text-justify w-11/12">
                                                                                <pre className="whitespace-pre-wrap">{blogReviewCommentReply.blog_comment_reply}</pre>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>) : null
                                                        ))}
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}

export default Blogs;