import { InputField, Link, NAVBAR_DASHBOARD, SubmitButton } from '@/app/api/routes/page'
import React from 'react'

const Contact = () => {
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
                <div className="contact_form flex mx-12 mt-12">
                    <div className="contact_details w-2/4 text-justify mb-8 font-light leading-loose">
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem aliquam voluptate in voluptatem perferendis, cum itaque laudantium dolores, officia debitis aspernatur, velit tempore! Dolorum error ex quod ipsa similique iste esse, praesentium molestias repudiandae, quaerat itaque nam quis alias at.</p>
                    </div>
                    <div className="contact_sending_form w-1/4 ml-32">
                        <form action="#" method="POST">
                            <InputField label_heading="Name" id="contact_name" name="contact_name" div_name="contact_name" />
                            <InputField label_heading="Email" id="contact_email" name="contact_email" div_name="contact_email" />
                            <InputField label_heading="Message" id="contact_message" name="contact_message" div_name="contact_message" />
                            <SubmitButton name="contact_submit" id="contact_submit" className="contact_submit" div_name="contact_submit" label="Submit" />
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact