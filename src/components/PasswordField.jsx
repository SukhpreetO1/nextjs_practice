"use client"
import React, { useState } from "react";
import { FontAwesomeIcon, faEye, faEyeSlash } from "@/app/api/routes/page"
import PasswordChecklist from "react-password-checklist";

const PasswordField = ({ label_heading, placeholder, name, id, className, div_name, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    const passwordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <div className="container mb-3">
                <div className={`${div_name} sm:col-span-4`}>
                    <label htmlFor={className} className="block text-sm font-medium leading-6 text-gray-900" >{label_heading} <span className="important_mark text-red-500">*</span> </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 mt-2 relative">
                        <input type={showPassword ? 'text' : 'password'} name={name} id={id} className={`${className} block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`} placeholder={placeholder} value={value} onChange={onChange} onFocus={onChange} />
                        <span className="absolute right-2 top-1 cursor-pointer" onClick={passwordVisibility}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    
                    {className === "password" && value && value.length >= 1 && (
                        <PasswordChecklist rules={["lowercase", "capital", "number", "minLength", "maxLength" ]} minLength={6} maxLength={20} value={value} 
                            messages={{
                                lowercase: "Must contain at least one lowercase letter.",
                                capital: "Must contain at least one uppercase letter.",
                                number: "Must contain at least one number",
                                minLength: "Must have at least 6 characters long.",
                                maxLength: "Must not be greater than 20 characters.",
                            }}
                            className="checklist_password"
                        />
                    )}
                    <span className="text-red-500 font-semibold text-xs" >{error}</span>
                </div>
            </div>
        </>
    );
};

export default PasswordField;