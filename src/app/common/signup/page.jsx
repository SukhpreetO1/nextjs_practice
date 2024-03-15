"use client";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import DateField from "@/components/DateField";
import RadioButtonField from "@/components/RadioButtonField";
import CheckboxField from "@/components/CheckboxField";
import PasswordField from "@/components/PasswordField";
import SubmitButton from "@/components/SubmitButton";

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

const Signup = () => {
    const [error, setError] = useState({
        first_name: '',
        last_name: '',
        email: '',
        date_of_birth: '',
        mobile_number: '',
        gender: '',
        hobbies: '',
        password: '',
        confirm_password: '',
    });

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        date_of_birth: '',
        mobile_number: '',
        gender: '',
        hobbies: '',
        password: '',
        confirm_password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleOptionSelect = (value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            gender: value,
        }));
    };

    const handleCheckboxSelect = (selectedHobbies) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            hobbies: selectedHobbies
        }));
    };

    const formSubmit = (e) => {
        setError(prevState => ({
            ...prevState,
            [e.target.name]: 'Error message for this field'
        }));

        e.preventDefault();
        console.log('gender : ' + formData.gender);
        console.log('hobbies : ' + formData.hobbies);
    };

    return (
        <>
            <div className="sign_up_form -2/5">
                <div className="heading font-bold text-center">
                    <h1 className="text-3xl mt-16">Signup</h1>
                </div>

                <form className="signup_form mt-8" onSubmit={formSubmit}>
                    <div className="first_name_last_name flex col-span-6">
                        <InputField label_heading="First Name" id="first_name" className="first_name" name="first_name" placeholder="First name" div_name="signup_first_name" value={formData.first_name} onChange={handleInputChange} error={error} setError={setError} />
                        <InputField label_heading="Last Name" id="last_name" className="last_name" name="last_name" placeholder="Last name" div_name="signup_last_name" value={formData.last_name} onChange={handleInputChange} error={error} setError={setError} />
                    </div>

                    <div className="email col-span-12">
                        <InputField label_heading="Email" id="email" className="email" name="email" placeholder="Email" div_name="signup_email" value={formData.email} onChange={handleInputChange} error={error} setError={setError} />
                    </div>

                    <div className="date_of_birth_mobile_number flex">
                        <DateField label_heading="Date of birth" id="date_of_birth" className="date_of_birth" name="date_of_birth" div_name="signup_date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} error={error} setError={setError} />
                        <InputField label_heading="Mobile Number" id="mobile_number" className="mobile_number" name="mobile_number" placeholder="Mobile Number" div_name="signup_mobile_number" value={formData.mobile_number} onChange={handleInputChange} error={error} setError={setError} />
                    </div>

                    <div className="gender">
                        <RadioButtonField label_heading="Gender" div_name="signup_gender" className="gender" options={genderOptions} onSelect={handleOptionSelect} error={error} setError={setError} />
                    </div>

                    <div className="hobbies">
                        <CheckboxField label_heading="Hobbies" div_name="signup_hobbies" className="hobbies" options={hobbiesOptions} onSelect={handleCheckboxSelect} error={error} setError={setError} />
                    </div>

                    <div className="password_confirm_password flex">
                        <PasswordField label_heading="Password" id="password" className="password" name="password" placeholder="Password" div_name="signup_password" value={formData.password} onChange={handleInputChange} error={error} setError={setError} />
                        <PasswordField label_heading="Confirm Password" id="confirm_password" className="confirm_password" name="confirm_password" placeholder="Confirm Password" div_name="signup_confirm_password" value={formData.confirm_password} onChange={handleInputChange} error={error} setError={setError} />
                    </div>

                    <div className="submit_button">
                        <SubmitButton className="signup_submit_button" id="signup_submit_button" name="signup_submit_button" div_name="signup_submit_button" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Signup;