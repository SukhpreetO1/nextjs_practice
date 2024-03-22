"use client"
import { ADMIN_BLOGS, InputField, SubmitButton, TextAreaField, addDoc, collection, db, useRouter } from "@/app/api/routes/page";
import { useState } from "react";

const AddBlogs = () => {
    const router = useRouter();
    const [error, setError] = useState({
        title: "",
        description: ""
    });

    const [blogForm, setBlogForm] = useState({
        title: "",
        description: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // const validation_errors = validate_login_submit_form({ ...formData, [name]: value });
        setBlogForm(prevFormData => ({ ...prevFormData, [name]: value }));
        // setError(prevErrors => ({ ...prevErrors, [name]: validation_errors[name] || null }));
    };

    const blogFormSubmit = async (event) => {
        event.preventDefault();
        const blogData = {
            title: String(blogForm.title),
            description: String(blogForm.description)
        }

        await addDoc(collection(db, "blogs"), blogData);

        localStorage.setItem('hasShownBlogAddedToast', false);

        router.push(ADMIN_BLOGS);
    }

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