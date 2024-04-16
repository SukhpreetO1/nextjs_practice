export const validate_login_submit_form = (data) => {
    const errors = {};
    if (!data.email.trim()) {
        errors.email = 'Email cannot be empty.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Invalid email format.';
    }

    if (!data.password.trim()) {
        errors.password = 'Password cannot be empty.';
    }

    return errors;
}