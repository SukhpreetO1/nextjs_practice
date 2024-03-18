import React, { useState } from 'react'

const RadioButtonField = ({ label_heading, div_name, options, onSelect, className, error, setError }) => {
    const [gender, setGender] = useState(null);

    const handleOptionChange = (event) => {
        const value = event.target.value;
        setGender(value);
        onSelect(value);
    };

    return (
        <>
            <div className="container mb-3">
                <div className={`${div_name} sm:col-span-4`}>
                    <label className="block text-sm font-medium leading-6 text-gray-900" >{label_heading} <span className="important_mark text-red-500">*</span> </label>
                    <div className={`${className} flex justify-between mt-2`}>
                        {options.map((option) => (
                            <div key={option.value} >
                                <input type="radio" id={option.label.toLowerCase()} className={`${option.label.toLowerCase()} mr-2`} name={option.label.toLowerCase()} value={option.value} checked={gender === option.value} onChange={handleOptionChange} onFocus={handleOptionChange}/>
                                <label htmlFor={option.label.toLowerCase()}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                    <span className={`${error} text-red-500 font-semibold text-xs`} >{error}</span>
                </div>
            </div>
        </>
    )
}

export default RadioButtonField