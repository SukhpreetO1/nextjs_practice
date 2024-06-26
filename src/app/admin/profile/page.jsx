"use client"
import { Image, AVATAR_IMAGE_URL, InputField, fetchUserDataFromToken, DateField, CheckboxField, RadioButtonField, Loader, Link, ADMIN_DASHBOARD } from '@/app/api/routes/page';
import React, { useEffect, useState } from 'react';

const genderOptions = [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
    { label: 'Other', value: '3' },
];

const hobbiesOptions = [
    { label: 'Football', value: '1', selected: false },
    { label: 'Cricket', value: '2', selected: false },
    { label: 'Basketball', value: '3', selected: false },
    { label: 'Tennis', value: '4', selected: false },
    { label: 'Others', value: '5', selected: false },
];

const AdminProfile = () => {
    const [userData, setUserData] = useState(null);
    const [gender, setGender] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const cleanup = await fetchUserDataFromToken(setUserData);
            return cleanup;
        };
        fetchData();
    }, []);

    const handleGenderChange = (value) => {
        setGender(value);
    };

    const handleHobbiesChange = (values) => {
        setHobbies(values);
    };

    return (
        <>
            <section>
                <div className="admin_terms_and_conditions_heading ml-60">
                    <div className="heading text-center text-5xl font-bold mt-8 mb-12">
                        Profile
                    </div>
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
                                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Profile</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className='admin_profile_detail_page w-2/5 '>
                    <div className='profile_page flex justify-center'>
                        <Image src={AVATAR_IMAGE_URL} width={150} height={150} alt='logo' />
                    </div>
                    <div className="first_name_last_name flex col-span-6">
                        <InputField value={userData && userData.first_name ? userData.first_name : ''} className='profile_first_name' label_heading="First name" id="profile_first_name" name="profile_first_name" div_name="profile_first_name" onChange={(e) => { e.target.value }} />
                        <InputField value={userData && userData.last_name ? userData.last_name : ''} className='profile_last_name' label_heading="Last name" id="profile_last_name" name="profile_last_name" div_name="profile_last_name" onChange={(e) => { e.target.value }} />
                    </div>
                    <div className="email_username flex col-span-6">
                        <InputField value={userData && userData.email ? userData.email : userData} className='profile_email' label_heading="Email" id="profile_email" name="profile_email" div_name="profile_email" onChange={(e) => { e.target.value }} />
                        <InputField value={userData && userData.username ? userData.username : ''} className='profile_username' label_heading="Username" id="profile_username" name="profile_username" div_name="profile_username" onChange={(e) => { e.target.value }} />
                    </div>
                    <div className="date_of_birth_mobile_number flex col-span-6">
                        <DateField value={userData && userData.date_of_birth ? userData.date_of_birth : ''} className='profile_date_of_birth' label_heading="Date of Birth" id="profile_date_of_birth" name="profile_date_of_birth" div_name="profile_date_of_birth" onChange={(e) => { e.target.value }} />
                        <InputField value={userData && userData.mobile_number ? userData.mobile_number : ''} className='profile_mobile_number' label_heading="Mobile Number" id="profile_mobile_number" name="profile_mobile_number" div_name="profile_mobile_number" onChange={(e) => { e.target.value }} />
                    </div>
                    <div className="gender">
                        <RadioButtonField label_heading="Gender" div_name="profile_gender" className="profile_gender" options={genderOptions} onChange={handleGenderChange} />
                    </div>
                    <div className="hobbies">
                        <CheckboxField className='profile_hobbies' label_heading="Hobbies" id="profile_hobbies" name="profile_hobbies" div_name="profile_hobbies" options={hobbiesOptions} onChange={handleHobbiesChange} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminProfile;