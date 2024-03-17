export const validate_login_submit_form = (data) => {
    const errors = {};
    if (!data.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Invalid email format. Format must be like abc@gmail.com';
    }

    if (!data.password.trim()) {
        errors.password = 'Password is required';
    }

    return errors;
}