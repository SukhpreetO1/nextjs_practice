"use client";
import { InputField, Link, NAVBAR_DASHBOARD, SubmitButton, TextAreaField, addDoc, auth, collection, db, getDocs, getFirestore, query, serverTimestamp, toast, validate_contact_form, where } from '@/app/api/routes/page'
import React, { useState } from 'react'

const Contact = () => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({ contact_name: '', contact_email: '', contact_message: '' })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const validation_errors = validate_contact_form({ ...formData, [name]: value });
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: validation_errors[name] || null }));

    };

    const contactForm = async (event) => {
        event.preventDefault();
        const validation_errors = validate_contact_form(formData);

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
            user_email: userFirestoreId,
            contact_name: formData.contact_name,
            contact_email: formData.contact_email,
            contact_message: formData.contact_message,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp()
        }
        await addDoc(collection(db, 'contact_form'), user_data)
        toast.success("Your message has been sent successfully", { position: "top-right" } );
        resetContactForm();
    }

    const resetContactForm = () => {
        setFormData({ contact_name: '', contact_email: '', contact_message: '' });
        setErrors({});
    }
    return (
        <>
            <section>
                <div className="breadcrumbs">
                    <nav className="flex px-5 py-3 text-gray-700 dark:bg-gray-800 dark:border-gray-700 w-64" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <Link href={NAVBAR_DASHBOARD} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
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

                <div className='contact_heading text-center mx-6 mb-8'>
                    <p className='text-5xl font-bold mb-5'>Contact Us</p>
                    <p className='font-light'>You can contact us through the following details or you can send your message through email as well.</p>
                </div>
                <div className="contact_form flex mx-12 mt-12 mb-8">
                    <div className="contact_details w-2/4 text-justify mb-8 font-light leading-loose">
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem aliquam voluptate in voluptatem perferendis, cum itaque laudantium dolores, officia debitis aspernatur, velit tempore! Dolorum error ex quod ipsa similique iste esse, praesentium molestias repudiandae, quaerat itaque nam quis alias at.</p>
                    </div>
                    <div className="contact_sending_form w-1/4 ml-32">
                        <form className="contact_form" onSubmit={contactForm}>
                            <InputField label_heading="Name" id="contact_name" name="contact_name" div_name="contact_name" value={formData.contact_name} onChange={handleInputChange} error={errors.contact_name}/>
                            <InputField label_heading="Email" id="contact_email" name="contact_email" div_name="contact_email" value={formData.contact_email} onChange={handleInputChange} error={errors.contact_email}/>
                            <TextAreaField label_heading="Message" id="contact_message" name="contact_message" div_name="contact_message" value={formData.contact_message} onChange={handleInputChange} error={errors.contact_message}/>
                            <SubmitButton name="contact_submit" id="contact_submit" className="contact_submit" div_name="contact_submit" label="Submit" />
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact