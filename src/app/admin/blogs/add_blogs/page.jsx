"use client"
import { ADMIN_BLOGS, InputField, SubmitButton, TextAreaField, addDoc, collection, db, useRouter, ImageUploading, Image, Link, ADMIN_DASHBOARD, ref, uploadBytes, getStorage, getDownloadURL, } from "@/app/api/routes/page";
import { useState } from "react";

const AddBlogs = () => {
    const router = useRouter();

    const storage = getStorage();

    const [imagePreview, setImagePreview] = useState("");

    const [error, setError] = useState({
        title: "",
        description: "",
        image: null,
    });

    const [blogForm, setBlogForm] = useState({
        title: "",
        description: "",
        image: null,
    });

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "image" && files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(files[0]);
            setBlogForm(prevFormData => ({ ...prevFormData, [name]: value, files}));
        } else {
            // const validation_errors = validate_login_submit_form({ ...formData, [name]: value });
            setBlogForm(prevFormData => ({ ...prevFormData, [name]: value }));
            // setError(prevErrors => ({ ...prevErrors, [name]: validation_errors[name] || null }));
        }
    };

    const blogFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const imageName = blogForm.files[0].name;
            const storageRef = ref(storage, `blogs/${imageName}`);
            
            const uploadedFile = await uploadBytes(storageRef, blogForm.files[0])
            console.log('Image uploaded successfully');
    
            const downloadURL = await getDownloadURL(storageRef);

            const firestore = getFirestore();
            const usersRef = collection(firestore, 'users');
            const q = query(usersRef, where("email", "==", auth.currentUser.email));
            const querySnapshot = await getDocs(q);
            const userFirestoreId = querySnapshot.docs[0].id;

            const blogData = {
                user_id: userFirestoreId,
                image: downloadURL,
                title: String(blogForm.title),
                description: String(blogForm.description),
                dashboard_visible: Number(1),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
            await addDoc(collection(db, "blogs"), blogData);    
            localStorage.setItem('hasShownBlogAddedToast', false);

            router.push(ADMIN_BLOGS);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <section>
                <div className="add_blogs ml-60">
                    <div className="add_blog_heading text-5xl text-center font-bold mt-8 mb-12">
                        <h1>Add Blog</h1>
                    </div>

                    <div className="admin_breadcrumbs">
                        <nav className="flex px-5 py-3 text-gray-700 dark:bg-gray-800 dark:border-gray-700 w-64" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <Link href={ADMIN_DASHBOARD} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                        Home
                                    </Link>
                                </li>
                                <li className="inline-flex items-center">
                                    <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <Link href={ADMIN_BLOGS} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                        Blogs
                                    </Link>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Add Blogs</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    <div className="form flex justify-center">
                        <form className="form w-2/5" action="#" method="POST" onSubmit={blogFormSubmit}>
                            <div className="bloag_heading_name">
                                <InputField className="blog_name" id="blog_name" name="title" div_name="blog_name" label_heading="Title" placeholder="Enter the blog title" value={blogForm.title} onChange={handleInputChange} error={error.title} />
                            </div>
                            <div className="bloag_desctiption_part">
                                <TextAreaField className="blog_description" id="blog_description" name="description" div_name="blog_description" label_heading="Description" placeholder="Enter the description" value={blogForm.description} onChange={handleInputChange} error={error.description} />
                            </div>
                            <div className="blog_images">
                                <ImageUploading className="upload_blog_image" id="blog_image" name="image" div_name="upload_blog_image" label_heading="Image" value={blogForm.image} onChange={handleInputChange} error={error.image} accept="image/*" />
                            </div>
                            <div>
                                {imagePreview && <h5 className="my-4">Preview Image :</h5>}
                                {imagePreview && (<Image src={imagePreview} alt="Uploaded Preview" className="uploading_images_preview image-preview mb-3 relative" width={800} height={100} encType="multipart/form-data" />)}
                            </div>
                            <div className="submit_button">
                                <SubmitButton className="submit" name="submit" id="submit" label="Add blog" />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddBlogs