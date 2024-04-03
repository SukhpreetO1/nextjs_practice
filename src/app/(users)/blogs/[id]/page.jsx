"use client"
import { BlogCommetForm, BlogReviews, CardWithDetail, Link, Loader, NAVBAR_BLOGS, NAVBAR_DASHBOARD } from '@/app/api/routes/page';
import React, { useEffect, useState } from 'react'

const SingleBlogsContent = (req) => {
    const [blog, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const id = req.params.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoader(true);
                const response = await fetch(`/api/blogs/blog_detail/${id}`);
                const data = await response.json();
                setData(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        setLoader(false);
    }, [id]);

    return (
        <>
            <section>
                {loader ? (<Loader />) : (
                    <div>
                        <div className='blogs_page'>
                            <div className="breadcrumbs">
                                <nav className="flex px-5 py-3 text-gray-700 dark:bg-gray-800 dark:border-gray-700 w-72" aria-label="Breadcrumb">
                                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                        <li className="inline-flex items-center">
                                            <Link href={NAVBAR_DASHBOARD} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                                Home
                                            </Link>
                                        </li>
                                        <li className="inline-flex items-center">
                                            <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                            </svg>
                                            <Link href={NAVBAR_BLOGS} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                                Blogs
                                            </Link>
                                        </li>
                                        <li aria-current="page">
                                            <div className="flex items-center">
                                                <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                                </svg>
                                                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Blog Detail</span>
                                            </div>
                                        </li>
                                    </ol>
                                </nav>
                            </div>

                            <div>
                                <CardWithDetail image_src={blog.image} image_name={blog.title} title={blog.title} content={blog.description} index="1" className="blogs_cards" />
                            </div>
                        </div>
                        <div className='user_comment_reviews_page flex'>
                            <div className="reviews w-2/3">
                                <BlogReviews id={id} />
                            </div>
                            <div className="comment w-1/3 mr-6">
                                <BlogCommetForm />
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}

export default SingleBlogsContent