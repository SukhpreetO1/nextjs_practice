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

            const blogData = {
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

                    <div className="form flex justify-center">
                        <form className="form w-2/5" action="#" method="POST" onSubmit={blogFormSubmit}>
                            <div className="bloag_heading_name">
                                <InputField className="blog_name" id="blog_name" name="title" div_name="blog_name" label_heading="Title" placeholder="Enter the blog title" value={blogForm.title} onChange={handleInputChange} error={error.title} />
                            </div>
                            <div className="bloag_desctiption_part">
                                <TextAreaField className="blog_description" id="blog_description" name="description" div_name="blog_description" label_heading="Description" placeholder="Enter the description" value={blogForm.description} onChange={handleInputChange} error={error.description} />
                            </div>
                            <div className="blog_images">
                                <ImageUploading className="blog_image" id="blog_image" name="image" div_name="blog_image" label_heading="Image" value={blogForm.image} onChange={handleInputChange} error={error.image} accept="image/*" />
                            </div>
                            <div>
                                {imagePreview && <h5 className="my-4">Preview Image :</h5>}
                                {imagePreview && (<Image src={imagePreview} alt="Uploaded Preview" className="image-preview mb-3" width={800} height={100} encType="multipart/form-data" />)}
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