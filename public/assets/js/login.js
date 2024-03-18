export const validate_login_submit_form = (data) => {
    const errors = {};
    if (!data.email.trim()) {
        errors.email = 'Email cannot be empty.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Invalid email format. Format must be like abc@gmail.com';
    }

    if (!data.password.trim()) {
        errors.password = 'Password cannot be empty.';
    } else if (!/^(?=.*\d)(?=.*[a-z]|[A-Z]).{6,20}$/.test(data.password)) {
        errors.password = 'Invalid password format. Must contain at least 6 characters, 1 capital letter and 1 number.';   
    }

    return errors;
}