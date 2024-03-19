"use client"
import { React, Cookies, toast, useEffect, useState, Image, AVATAR_IMAGE_URL, InputField, getAuth } from '@/app/api/routes/page';

const Profile = () => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const currentUserAccessToken = Cookies.get('currentUserToken');
        
        if (currentUserAccessToken) {
            const auth = getAuth();
            // setEmail(currentUserEmail);
        } else {
            console.log("currentUserToken cookie not found");
        }
    }, []);

    return (
        <>
            <section>
                <div className='user_profile_detail_page w-1/4 '>
                    <div className='profile_page'>
                        <Image src={AVATAR_IMAGE_URL} width={500} height={500} alt='logo'/>
                    </div>
                    <div className="user_email">
                        <InputField value={email} className='profile_email' label_heading="Email" id="profile_email" name="profile_email" div_name="profile_email" onChange={(e) => {e.target.value}}/>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile;