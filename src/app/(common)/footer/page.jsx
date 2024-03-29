import { Link, PRIVACY_POLICIES, TERMS_AND_CONDITION } from "@/app/api/routes/page"

const Footer = () => {
  return (
    <>
        <footer className='mt-auto'>
            <div className='footer_content bg-gray-200 font-normal leading-loose py-2'>
                <div className='flex justify-between px-96 my-6'>
                    <Link href={PRIVACY_POLICIES}><p className='footer_privacy_policy'>Privacy Policy </p></Link>
                    <Link href={TERMS_AND_CONDITION}><p className='footer_terms_and_conditions'>Terms and Condition</p></Link>
                    <Link href="#"><p className='footer_contact_us'>Contact Us</p></Link>
                    <Link href="#"><p className='footer_about_us'>About Us</p></Link>
                </div>
                <hr className='border-gray-400 border-t-2'/>
                <div>
                    <p className='text-gray-600 flex justify-center my-4'>© 2024 blog website. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer