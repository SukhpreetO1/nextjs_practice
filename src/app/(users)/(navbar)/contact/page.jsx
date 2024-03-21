import InputField from '@/components/InputField'
import SubmitButton from '@/components/SubmitButton'
import React from 'react'

const Contact = () => {
  return (
    <>
        <section>
            <div className='contact_heading text-center mx-6'>
                <p className='text-5xl font-bold mb-5'>Contact Us</p>
                <p>You can contact us through the following details or you can send your message through email as well.</p>
            </div>
            <div className="contact_form flex mx-12 mt-12">
                <div className="contact_details w-2/4 text-justify mb-8">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum nisi, libero delectus neque laboriosam excepturi perferendis cupiditate voluptates consectetur commodi similique molestiae dolores vero ipsum!</p>
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