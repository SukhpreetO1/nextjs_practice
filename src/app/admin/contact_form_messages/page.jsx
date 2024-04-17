"use client"
import { ADMIN_DASHBOARD, FontAwesomeIcon, Image, InputField, Link, Loader, SubmitButton, TextAreaField, addDoc, collection, db, faInfo, faPenToSquare, faReply, getDocs, getFirestore, query, serverTimestamp, toast, where } from "@/app/api/routes/page";
import { useEffect, useState } from "react";

const ContactFormMessages = () => {
    const [contactMessages, setContactMessages] = useState([]);
    const [contactMessagesDetail, setContactMessagesDetail] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [selectedReplyMessages, setSelectedReplyMessages] = useState([]);
    const [selectedContactMessagesId, setSelectedContactMessagesId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({ blog_contact_message_reply: "" })

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const response = await fetch("/api/contact_messages");
            const data = await response.json();
            setContactMessages(data.data);
            setIsLoading(false);
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (selectedContactMessagesId !== null) {
            async function fetchData(modal_id) {
                const response = await fetch("/api/contact_messages/contact_messages_modal/" + modal_id);
                const data = await response.json();
                setContactMessagesDetail(data.data);
                setSelectedReplyMessages(data.data);
            }
            fetchData(selectedContactMessagesId);
        }
    }, [selectedContactMessagesId]);

    const modalHandler = () => {
        setShowModal(false);
        setContactMessagesDetail('');
        setShowReplyModal(false);
        setSelectedReplyMessages('');
    }

    const truncateContactMessage = (message, limit) => {
        if (message.length > limit) {
            return message.slice(0, limit) + '...';
        } else {
            return message;
        }
    };

    const commentMessagereply = async (e, selectedReplyMessages, selectedReplyMessages_id) => {
        e.preventDefault();
        const blog_contact_form_reply = formData.blog_contact_message_reply;

        const requestData = {
            selectedReplyMessages: selectedReplyMessages,
            blog_contact_form_reply: blog_contact_form_reply
        };

        const mail = await fetch("/api/mails/contact_form_reply", {method: "POST", body: JSON.stringify(requestData)})
        const response = await mail.json();

        if (response.status === 200) {
            const newReplyData = {
                contact_form_id: selectedReplyMessages_id,
                contact_email: selectedReplyMessages.contact_email,
                contact_name: selectedReplyMessages.contact_name,
                blog_contact_form_reply: blog_contact_form_reply,
                created_at: serverTimestamp(),
                updated_at: serverTimestamp()
            };
            await addDoc(collection(db, 'contact_form_reply'), newReplyData);
            toast.success("Reply has been sent successfully", { position: "top-right" });
            setShowReplyModal(false);
            setFormData({ blog_contact_message_reply: '' });
        } else {
            toast.error("Failed to send reply", { position: "top-right" });
        }
    }

    return (
        <>
            <section>
                {isLoading ? (<Loader />) : (
                    <div className="contact_form_messages_page ml-60">
                        <div className="heading text-center text-5xl font-bold mt-8 mb-12">
                            Contact Form Messages
                        </div>

                        <div className="admin_breadcrumbs">
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
                                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Contact Messages</span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Message</th>
                                        <th scope="col" className="px-6 py-3">User Name</th>
                                        <th scope="col" className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contactMessages.map((contactMessage, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4">{contactMessage.contact_name}</td>
                                            <td className="px-6 py-4">{contactMessage.contact_email}</td>
                                            <td className="px-6 py-4">{truncateContactMessage(contactMessage.contact_message, 15)}</td>
                                            <td className="px-6 py-4">{contactMessage.user_first_name + ' ' + contactMessage.user_last_name}</td>
                                            <td className="px-6 py-4 flex">
                                                <Link href="#" onClick={() => { setShowModal(true); setSelectedContactMessagesId(contactMessage.id); }}>
                                                    <FontAwesomeIcon icon={faInfo} className="w-4 h-4 mr-2 mt-1" />
                                                </Link>
                                                <Link href="#" onClick={() => { setShowReplyModal(true); setSelectedContactMessagesId(contactMessage.id) }}>
                                                    <FontAwesomeIcon icon={faReply} className="w-4 h-4 mr-2 mt-1" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {contactMessages?.length < 1 && <div className="py-2 text-center text-xl">No data found</div>}
                            {showModal && (
                                <div id="default-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-80">
                                    <div className="relative p-4 w-4/6 max-h-full contact_form_message_modal">
                                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    Contact Form Message Details
                                                </h3>
                                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={modalHandler}>
                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="contact_form_message_details py-8 px-8">
                                                <div className='flex mb-2'>
                                                    <div className="title">
                                                        <p className='break-words text-justify italic text-2xl leading-loose mb-4'>{contactMessagesDetail.contact_name ? 'Name : ' + contactMessagesDetail.contact_name : ''}</p>
                                                    </div>
                                                </div>
                                                <div className="description mb-2">
                                                    <div className="description-content break-words">
                                                        <p className='break-words text-justify font-light leading-loose text-base'>{contactMessagesDetail.contact_message ? "Message : " + contactMessagesDetail.contact_message : ''}</p>
                                                    </div>
                                                </div>
                                                <div className="send_by">
                                                    <div className="send_by">
                                                        <p className='break-words text-justify font-light leading-loose text-base'>{contactMessagesDetail.user_first_name ? "Send by : " + contactMessagesDetail.user_first_name : '' + ' ' + contactMessagesDetail.user_last_name ? contactMessagesDetail.user_last_name : ''}</p>
                                                    </div>
                                                </div>
                                                <hr className="my-4" />
                                                {contactMessagesDetail.replyData && contactMessagesDetail.replyData.length > 0 ? (
                                                    <div className="mb-2"><span className="font-medium italic text-xl">Reply : </span>
                                                        {contactMessagesDetail.replyData.map((reply, index) => (
                                                            <div className="contact_message_reply" key={index}>
                                                                <p className='break-words text-justify font-light leading-loose text-base'>{reply.blog_contact_form_reply}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showReplyModal && (
                                <div id="default-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-80">
                                    <div className="relative p-4 w-4/6 max-h-full contact_form_message_modal">
                                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    Contact Form Reply
                                                </h3>
                                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={modalHandler}>
                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="contact_form_message_details py-8 px-8">
                                                <div className="description mb-2">
                                                    <div className="description-content break-words">
                                                        <p className='break-words text-justify font-light leading-loose text-base'><span>Email : </span>{selectedReplyMessages.contact_email}</p>
                                                    </div>
                                                </div>
                                                <form action="#" method="POST" onSubmit={(e) => commentMessagereply(e, selectedReplyMessages, selectedReplyMessages.id)}>
                                                    <div>
                                                        <TextAreaField label_heading="Reply" id="blog_contact_message_reply" name="blog_contact_message_reply" className="blog_contact_message_reply h-10" div_name="blog_contact_message_reply" value={formData.blog_contact_message_reply} onChange={(e) => setFormData({ ...formData, blog_contact_message_reply: e.target.value })} placeholder="Add reply" />
                                                    </div>
                                                    <div>
                                                        <SubmitButton className="submit_button" label="Submit" id="submit_button" name="submit_button" />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}

export default ContactFormMessages;