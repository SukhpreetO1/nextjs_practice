"use client";
import { SubmitButton, TextAreaField, addDoc, auth, collection, db, getDocs, getFirestore, query, serverTimestamp, toast, validate_blog_comment_form, where } from '@/app/api/routes/page'
import React, { useState } from 'react'

const BlogCommetForm = ({ id, fetchUpdatedComments }) => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({ blog_comment: '' })

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
        const userData = querySnapshot.docs[0].data();

        const user_data = {
            user_id: userFirestoreId,
            blog_id : id,
            blog_comment_name: userData.first_name + " " + userData.last_name,
            blog_comment_email: userData.email,
            blog_comment: formData.blog_comment,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp()
        }
        await addDoc(collection(db, 'blogs_comment'), user_data);
        toast.success("Comment added successfully", { position: "top-right" } );
        fetchUpdatedComments();
        resetBlogCommentForm();
    }

    const resetBlogCommentForm = () => {
        setFormData({ blog_comment: '' });
        setErrors({});
    }
    return (
        <>
            <section>
                <div>
                    <div className="blog_comment_form mt-12 mb-8 mx-6">
                        <div className="blog_comment_sending_form">
                            <form className="blog_comment_form flex mx-16 w-11/12" onSubmit={blogCommentForm}>
                                <div className='w-11/12'>
                                    <TextAreaField label_heading="" id="blog_comment" name="blog_comment" className="blog_comment" div_name="blog_comment" value={formData.blog_comment} onChange={(e) => setFormData({ ...formData, blog_comment: e.target.value })} error={errors.blog_comment} placeholder="Leave a Comment here"/>
                                </div>
                                <div className='w-1/12'>
                                    <SubmitButton name="blog_comment_submit" id="blog_comment_submit" className="blog_comment_submit" div_name="blog_comment_submit -mt-1" label="Add comment" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BlogCommetForm