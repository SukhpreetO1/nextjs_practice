export const validate_forgot_password_submit_form = (data) => {
    const errors = {};
    if (!data.email.trim()) {
        errors.email = 'Email cannot be empty.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Invalid email format. Format must be like abc@gmail.com';
    }

    return errors;
}