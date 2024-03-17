export const validate_signup_submit_form = (data) => {
    const errors = {};

    if (!data.first_name.trim()) {
        errors.first_name = 'First name is required';
    }

    if (!data.last_name.trim()) {
        errors.last_name = 'Last name is required';
    }
    
    if (!data.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Invalid email format. Format must be like abc@gmail.com';
    }

    if (!data.username.trim()) {
        errors.username = 'Username is required';
    }

    if (!data.date_of_birth.trim()) {
        errors.date_of_birth = 'Date of birth is required';
    }

    if (!data.mobile_number.trim()) {
        errors.mobile_number = 'Mobile number is required';
    }

    if (!data.gender.trim()) {
        errors.gender = 'Gender is required';        
    }

    if (!data.hobbies) {
        errors.hobbies = 'Hobby field is required';        
    }

    if (!data.password.trim()) {
        errors.password = 'Password is required';
    }

    if (!data.confirm_password.trim()) {
        errors.confirm_password = 'Confirm password is required';
    }



    return errors;
};
