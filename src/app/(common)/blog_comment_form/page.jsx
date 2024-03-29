"use client";
import { InputField, Link, NAVBAR_DASHBOARD, SubmitButton, TextAreaField, addDoc, auth, collection, db, getDocs, getFirestore, query, serverTimestamp, toast, validate_blog_comment_form, where } from '@/app/api/routes/page'
import React, { useState } from 'react'

const BlogCommetForm = () => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({ blog_comment_name: '', blog_comment_email: '', blog_comment_message: '' })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const validation_errors = validate_blog_comment_form({ ...formData, [name]: value });
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: validation_errors[name] || null }));

    };

    const blogCommentForm = async (event) => {
        event.preventDefault();
        const validation_errors = validate_blog_comment_form(formData);

        if (Object.keys(validation_errors).length > 0) {
            setErrors(validation_errors);
            return;
        }

        const firestore = getFirestore();
        const usersRef = collection(firestore, 'users');
        const q = query(usersRef, where("email", "==", auth.currentUser.email));
        const querySnapshot = await getDocs(q);
        const userFirestoreId = querySnapshot.docs[0].id;

        const user_data = {
            user_id: userFirestoreId,
            blog_comment_name: formData.blog_comment_name,
            blog_comment_email: formData.blog_comment_email,
            blog_comment_message: formData.blog_comment_message,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp()
        }
        await addDoc(collection(db, 'blog_comment_form'), user_data)
        toast.success("Your message has been sent successfully", { position: "top-right" } );
        resetBlogCommentForm();
    }

    const resetBlogCommentForm = () => {
        setFormData({ blog_comment_name: '', blog_comment_email: '', blog_comment_message: '' });
        setErrors({});
    }
    return (
        <>
            <section>
                <div className='blog_comment_heading text-center mx-6 mb-8'>
                    <p className='text-5xl font-bold mb-5'>Leave a Comment</p>
                </div>
                <div className="blog_comment_form flex mx-12 mt-12 mb-8">
                    <div className="blog_comment_sending_form w-1/4 ml-32">
                        <form className="blog_comment_form" onSubmit={blogCommentForm}>
                            <InputField label_heading="Name" id="blog_comment_name" name="blog_comment_name" div_name="blog_comment_name" value={formData.blog_comment_name} onChange={handleInputChange} error={errors.blog_comment_name}/>
                            <InputField label_heading="Email" id="blog_comment_email" name="blog_comment_email" div_name="blog_comment_email" value={formData.blog_comment_email} onChange={handleInputChange} error={errors.blog_comment_email}/>
                            <TextAreaField label_heading="Message" id="blog_comment_message" name="blog_comment_message" div_name="blog_comment_message" value={formData.blog_comment_message} onChange={handleInputChange} error={errors.blog_comment_message}/>
                            <SubmitButton name="blog_comment_submit" id="blog_comment_submit" className="blog_comment_submit" div_name="blog_comment_submit" label="Submit" />
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BlogCommetForm