"use client"
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon, faPenToSquare, faTrashCan, faInfo, faPlus, Link, ADMIN_ADD_BLOGS, toast, ADMIN_DASHBOARD, ADMIN_EDIT_BLOGS, doc, db, deleteDoc, ADMIN_BLOG_MODAL, ADMIN_BLOGS, Image } from '@/app/api/routes/page';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    const [blogModalDetail, setBlogModalDetail] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [selectedBlogId, setSelectedBlogId] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("hasShownBlogAddedToast") === "false") {
            toast.success("New blog added successfully", {
                position: "top-right",
            });
            localStorage.removeItem("hasShownBlogAddedToast");
        } else if (localStorage.getItem("hasShownBlogUpdatedToast") === "false") {
            toast.success("Blog updated successfully", {
                position: "top-right",
            });
            localStorage.removeItem("hasShownBlogUpdatedToast");
        }

        async function fetchData() {
            const response = await fetch("/api/blogs");
            const data = await response.json();
            setBlogs(data.data);
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedBlogId !== null) {
            async function fetchData(modal_id) {
                const response = await fetch("/api/blogs/blog_modal/" + modal_id);
                const data = await response.json();
                setBlogModalDetail(data.data);
            }
            fetchData(selectedBlogId);
        }
    }, [selectedBlogId]);

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

    return (
        <>
            <section>
                <div className="blogs_page ml-60">
                    <div className="heading text-center text-5xl font-bold mt-8 mb-12">
                        Blogs
                    </div>

                    <div className="breadcrumbs">
                        <nav className="flex px-5 py-3 text-gray-700 dark:bg-gray-800 dark:border-gray-700 w-64" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <Link href={ADMIN_DASHBOARD} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
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
                                            <Link href="#" onClick={() => {setShowModal(true); setSelectedBlogId(blog.id);}}>
                                                <FontAwesomeIcon icon={faInfo} className="w-4 h-4 mr-2" />
                                            </Link>
                                            <Link href={`${ADMIN_EDIT_BLOGS}/${blog.id}`}>
                                                <FontAwesomeIcon icon={faPenToSquare} className="w-4 h-4 mr-2" />
                                            </Link>
                                            <Link href="#" onClick={() => deleteBlog(blog.id)}>
                                                <FontAwesomeIcon icon={faTrashCan} className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {blogs?.length < 1 && <div className="py-2 text-center text-xl">No data found</div>}
                        {showModal && (
                            <div id="default-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-80">
                                <div className="relative p-4 w-4/6 max-h-full blog_modal">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                Blog Details
                                            </h3>
                                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={() => setShowModal(false)}>
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="blog_details py-8 px-8">
                                            <div className='flex mb-4'>
                                                <div className="uploaded_image mr-4">
                                                    <Image src={blogModalDetail.image} alt="Uploaded Image" width={400} height={100} />
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
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Blogs;