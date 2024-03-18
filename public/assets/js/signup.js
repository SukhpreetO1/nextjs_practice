export const validate_signup_submit_form = (data) => {
    const errors = {};

    if (!data.first_name.trim()) {
        errors.first_name = 'First name is required';
    } else if (!/^[a-zA-Z]+$/.test(data.first_name)){
        errors.first_name = 'First name should contain only letters';
    }

    if (!data.last_name.trim()) {
        errors.last_name = 'Last name is required';
    } else if (!/^[a-zA-Z]+$/.test(data.last_name)){
        errors.last_name = 'Last name should contain only letters';
    }
    
    if (!data.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Invalid email format. Format must be like abc@gmail.com';
    }

    if (!data.username.trim()) {
        errors.username = 'Username is required';
    } else if (!/^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test(data.username)){
        errors.username = 'Username must contain letters and numbers only';
    }

    if (!data.date_of_birth.trim()) {
        errors.date_of_birth = 'Date of birth is required';
    }

    if (!data.mobile_number.trim()) {
        errors.mobile_number = 'Mobile number is required';
    } else if (!/^\d{10,12}$/.test(data.mobile_number)){
        errors.mobile_number = 'Mobile number must contain 10 to 12 numbers only.';
    }

    if (!data.gender.trim()) {
        errors.gender = 'Gender is required';        
    }

    if (!data.hobbies) {
        errors.hobbies = 'Hobby field is required';        
    }

    if (!data.password.trim()) {
        errors.password = 'Password is required';
    } else if(!/^(?=.*\d)(?=.*[a-z]|[A-Z]).{6,20}$/.test(data.password)) {
        errors.password = 'Invalid password format. Must contain at least 6 characters, 1 capital letter and 1 number.';
    }

    if (!data.confirm_password.trim()) {
        errors.confirm_password = 'Confirm password is required';
    } else if (data.confirm_password != data.password) {
        errors.confirm_password = 'Confirm password does not match.';
    }

    return errors;
};
