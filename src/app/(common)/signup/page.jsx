"use client";
import { React, useState, InputField, DateField, RadioButtonField, CheckboxField, PasswordField, SubmitButton, validate_signup_submit_form, LOGIN_URL, Link, toast, ToastContainer, useRouter, hash, collection, query, where, getDocs, addDoc, serverTimestamp, db, auth, createUserWithEmailAndPassword, onAuthStateChanged, getAuth } from '@/app/api/routes/page';

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
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        date_of_birth: '',
        mobile_number: '',
        gender: '',
        hobbies: '',
        password: '',
        confirm_password: '',
    });

    const handleFieldChange = (name, value) => {
        const validation_errors = validate_signup_submit_form({ ...formData, [name]: value });
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: validation_errors[name] || null }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleFieldChange(name, value);
    };

    const handleOptionSelect = (value) => {
        handleFieldChange('gender', value);
    };

    const handleCheckboxSelect = (selectedHobbies) => {
        handleFieldChange('hobbies', selectedHobbies);
    };

    // checking the unique value
    const checkUniqueFields = async (field, value) => {
        const q = query(collection(db, 'users'), where(field, '==', value));
        const querySnapshot = await getDocs(q);
        return querySnapshot.empty;
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        const validation_errors = validate_signup_submit_form(formData);

        if (Object.keys(validation_errors).length > 0) {
            setErrors(validation_errors);
            return;
        }

        const fieldsToCheck = ['email', 'username', 'mobile_number'];
        const uniqueErrors = {};

        await Promise.all(fieldsToCheck.map(async (field) => {
            const isUnique = await checkUniqueFields(field, formData[field].trim());
            if (!isUnique) {
                uniqueErrors[field] = `${field === 'mobile_number' ? 'Mobile number' : field.charAt(0).toUpperCase() + field.slice(1)} is already registered`;
            }
        }));

        if (Object.keys(uniqueErrors).length > 0) {
            setErrors({ ...validation_errors, ...uniqueErrors });
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const hashedPassword = await hash(formData.password, 10);
            const { confirm_password, ...userData } = formData;
            const hobbiesArray = Array.isArray(formData.hobbies) ? formData.hobbies : [formData.hobbies];

            const user_data = {
                first_name: String(formData.first_name.trim()),
                last_name: String(formData.last_name.trim()),
                email: String(formData.email.trim()),
                username: String(formData.username.trim()),
                date_of_birth: String(formData.date_of_birth.trim()),
                mobile_number: Number(formData.mobile_number.trim()),
                gender: Number(formData.gender),
                role_id: Number(1),
                hobbies: hobbiesArray,
                password: String(hashedPassword),
                created_at: serverTimestamp(),
                updated_at: serverTimestamp()
            };
            await addDoc(collection(db, 'users'), user_data);

            localStorage.setItem("hasShownAccountCreatedToast", false);

            router.push(LOGIN_URL);
        } catch (error) {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                toast.error("Email is already in use. Please choose a different email.", {
                    position: "top-right",
                });
            } else {
                toast.error(error.message, { position: 'top-right' });
            }
        }
    };

    return (
        <>
            <div className="sign_up_form -2/5">
                <div className="heading font-bold text-center">
                    <h1 className="text-3xl mt-16">Signup</h1>
                </div>

                <form className="signup_form mt-8" onSubmit={formSubmit}>
                    <div className="first_name_last_name flex col-span-6">
                        <InputField label_heading="First Name" id="first_name" className="first_name" name="first_name" placeholder="First name" div_name="signup_first_name" value={formData.first_name} onChange={handleInputChange} error={errors.first_name} />
                        <InputField label_heading="Last Name" id="last_name" className="last_name" name="last_name" placeholder="Last name" div_name="signup_last_name" value={formData.last_name} onChange={handleInputChange} error={errors.last_name} />
                    </div>

                    <div className="email_username flex col-span-6">
                        <InputField label_heading="Email" id="email" className="email" name="email" placeholder="Email" div_name="signup_email" value={formData.email} onChange={handleInputChange} error={errors.email} />
                        <InputField label_heading="Username" id="username" className="username" name="username" placeholder="Username" div_name="signup_username" value={formData.username} onChange={handleInputChange} error={errors.username} />
                    </div>

                    <div className="date_of_birth_mobile_number flex">
                        <DateField label_heading="Date of birth" id="date_of_birth" className="date_of_birth" name="date_of_birth" div_name="signup_date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} error={errors.date_of_birth} />
                        <InputField label_heading="Mobile Number" id="mobile_number" className="mobile_number" name="mobile_number" placeholder="Mobile Number" div_name="signup_mobile_number" value={formData.mobile_number} onChange={handleInputChange} error={errors.mobile_number} />
                    </div>

                    <div className="gender">
                        <RadioButtonField label_heading="Gender" div_name="signup_gender" className="gender" options={genderOptions} onSelect={handleOptionSelect} error={errors.gender} />
                    </div>

                    <div className="hobbies">
                        <CheckboxField label_heading="Hobbies" div_name="signup_hobbies" className="hobbies" options={hobbiesOptions} onSelect={handleCheckboxSelect} error={errors.hobbies} />
                    </div>

                    <div className="password_confirm_password flex">
                        <PasswordField label_heading="Password" id="password" className="password" name="password" placeholder="Password" div_name="signup_password" value={formData.password} onChange={handleInputChange} error={errors.password} />
                        <PasswordField label_heading="Confirm Password" id="confirm_password" className="confirm_password" name="confirm_password" placeholder="Confirm Password" div_name="signup_confirm_password" value={formData.confirm_password} onChange={handleInputChange} error={errors.confirm_password} />
                    </div>

                    <div className="submit_button">
                        <SubmitButton className="signup_submit_button" id="signup_submit_button" name="signup_submit_button" div_name="signup_submit_button" label="Signup" />
                    </div>
                </form>
                <div>
                    <p className="mt-3 text-center text-sm text-gray-500">Already have an account? <Link href={LOGIN_URL} className="underline underline-offset-4 italic text-blue-500">Login here.</Link></p>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Signup;