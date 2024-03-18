import React from "react";
import { FontAwesomeIcon, useState } from "@/app/api/routes/page"
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const PasswordField = ({ label_heading, placeholder, name, id, className, div_name, value, onChange, error, setError }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <div className="container mb-3">
                <div className={`${div_name} sm:col-span-4`}>
                    <label htmlFor={className} className="block text-sm font-medium leading-6 text-gray-900" >{label_heading} <span className="important_mark text-red-500">*</span> </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 mt-2 relative">
                        <input type={showPassword ? 'text' : 'password'} name={name} id={id} className={`${className} block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`} placeholder={placeholder} value={value} onChange={onChange} onFocus={onChange} />
                        <span className="absolute right-2 top-1 cursor-pointer" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    <span className={`${error} text-red-500 font-semibold text-xs`} >{error}</span>
                </div>
            </div>
        </>
    );
};

export default PasswordField;