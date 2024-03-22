"use client"
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon, faPenToSquare, faTrashCan, faInfo, faPlus, Link, ADMIN_ADD_BLOGS, toast, ToastContainer } from '@/app/api/routes/page';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("hasShownBlogAddedToast") === "false") {
            toast.success("New blog added successfully", {
                position: "top-right",
            });
            localStorage.removeItem("hasShownBlogAddedToast");
        }

        async function fetchData() {
            const response = await fetch("/api/blogs");
            const data = await response.json();
            setBlogs(data.data);
        }

        fetchData();
    }, []);

    const truncateDescription = (description) => {
        const words = description.match(/.{1,10}/g);
        if (words && words.length > 10) {
            return words.slice(0, 13).join(' ') + '...';
        }
        return description;
    };    

    return (
        <>
            <section>
                <div className="blogs_page ml-60">
                    <div className="heading text-center text-5xl font-bold mt-8 mb-12">
                        Blogs
                    </div>

                    <div className="add_blogs_page absolute right-20 top-16">
                        <Link href={ADMIN_ADD_BLOGS} >
                            <FontAwesomeIcon icon={faPlus} className='w-12 h-12' />
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
                                            <Link href="#">
                                                <FontAwesomeIcon icon={faInfo} className="w-4 h-4 mr-2" />
                                            </Link>
                                            <Link href="#">
                                                <FontAwesomeIcon icon={faPenToSquare} className="w-4 h-4 mr-2" />
                                            </Link>
                                            <Link href="#">
                                                <FontAwesomeIcon icon={faTrashCan} className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}

export default Blogs;