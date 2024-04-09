"use client"
import { Image, AVATAR_IMAGE_URL, InputField, fetchUserDataFromToken, DateField, Link, NAVBAR_DASHBOARD, SubmitButton, RadioButtonField, validate_profile_form, CheckboxField, serverTimestamp, toast, updateDoc, doc, db } from '@/app/api/routes/page';
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

const Profile = () => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        date_of_birth: '',
        mobile_number: '',
        gender: '',
        hobbies:[],
    });
    const [selectedGender, setSelectedGender] = useState(formData.gender);
    const [selectedHobbies, setSelectedHobbies] = useState(formData.hobbies);

    useEffect(() => {
        const fetchData = async () => {
            const cleanup = await fetchUserDataFromToken(setFormData);
            return cleanup;
        };
        fetchData();
    }, []);

    useEffect(() => {
        setSelectedGender(formData.gender);
        setSelectedHobbies(formData.hobbies);
    }, [formData.gender, formData.hobbies]);

    const handleFieldChange = (name, value) => {
        const validation_errors = validate_profile_form({ ...formData, [name]: value });
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: validation_errors[name] || null }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleFieldChange(name, value);
    };

    const handleOptionSelect = (value) => {
        setFormData(prevFormData => ({ ...prevFormData, gender: value }));
        handleFieldChange('gender', value);
    };

    const handleCheckboxSelect = (selectedHobbies) => handleFieldChange('hobbies', selectedHobbies);

    const userUpdateProfile = async (e) => {
        e.preventDefault();

        const validation_errors = validate_profile_form(formData);

        if (Object.keys(validation_errors).length > 0) {
            setErrors(validation_errors);
            return;
        }

        try {
            const hobbiesArray = Array.isArray(formData.hobbies) ? formData.hobbies : [formData.hobbies];
            const userRef = doc(db, 'users', formData.id);
            await updateDoc(userRef, {
                first_name: String(formData.first_name),
                last_name: String(formData.last_name),
                email: String(formData.email),
                username: String(formData.username),
                date_of_birth: String(formData.date_of_birth),
                mobile_number: Number(formData.mobile_number),
                gender: Number(formData.gender),
                role_id: Number(2),
                hobbies: hobbiesArray,
                updated_at: serverTimestamp()
            });
            toast.success('Profile updated successfully');
        } catch (error) {
            console.log(error);
        }
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
                                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Profile</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className='user_profile_detail_page w-2/5 mb-8'>
                    {formData ? (
                        <form action="" method='PUT' onSubmit={userUpdateProfile}>
                            <div className='profile_page flex justify-center'>
                                <Image src={AVATAR_IMAGE_URL} width={150} height={150} alt='logo' />
                            </div>
                            <div className="first_name_last_name flex col-span-6">
                                <InputField value={formData.first_name ? formData.first_name : ''} className='first_name' label_heading="First name" id="first_name" name="first_name" div_name="first_name mr-4" onChange={handleInputChange} error={errors.first_name} />
                                <InputField value={formData.last_name ? formData.last_name : ''} className='last_name' label_heading="Last name" id="last_name" name="last_name" div_name="last_name" onChange={handleInputChange} error={errors.last_name} />
                            </div>
                            <div className="email_username flex col-span-6">
                                <InputField value={formData.email ? formData.email : ''} className='email' label_heading="Email" id="email" name="email" div_name="email mr-4" onChange={handleInputChange} error={errors.email} />
                                <InputField value={formData.username ? formData.username : ''} className='username' label_heading="Username" id="username" name="username" div_name="username" onChange={handleInputChange} error={errors.username} />
                            </div>
                            <div className="date_of_birth_mobile_number flex col-span-6">
                                <DateField value={formData.date_of_birth ? formData.date_of_birth : ''} className='date_of_birth' label_heading="Date of Birth" id="date_of_birth" name="date_of_birth" div_name="date_of_birth mr-4" onChange={handleInputChange} error={errors.date_of_birth} />
                                <InputField value={formData.mobile_number ? formData.mobile_number : ''} className='mobile_number' label_heading="Mobile Number" id="mobile_number" name="mobile_number" div_name="mobile_number" onChange={handleInputChange} error={errors.mobile_number} />
                            </div>
                            <div className="gender">
                                <RadioButtonField value={selectedGender} label_heading="Gender" div_name="gender" className="gender" name="gender" options={genderOptions} id="gender" onSelect={handleOptionSelect} error={errors.gender}/>
                            </div>
                            <div className="hobbies">
                                <CheckboxField value={selectedHobbies} className='hobbies' label_heading="Hobbies" options={hobbiesOptions} id="hobbies" name="hobbies" div_name="hobbies" onChange={handleOptionSelect} onSelect={handleCheckboxSelect} error={errors.hobbies} />
                            </div>
                            <div className="submit_button mt-4">
                                <SubmitButton className="submit_button" id="submit_button" name="submit_button" div_name="submit_button" label="Update" />
                            </div>
                        </form>
                    ) : null}
                </div>
            </section>
        </>
    )
}

export default Profile;