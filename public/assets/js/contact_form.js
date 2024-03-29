export const validate_contact_form = (data) => {
    const errors = {};

    if (!data.contact_name.trim()) {
        errors.contact_name = 'Name field is required.';
    } else if (!/^[a-zA-Z]+$/.test(data.contact_name)){
        errors.contact_name = 'Name field should contain only letters.';
    }
    
    if (!data.contact_email.trim()) {
        errors.contact_email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(data.contact_email)) {
        errors.contact_email = 'Invalid email format.';
    }

    if (!data.contact_message.trim()) {
        errors.contact_message = 'Message field is required.';
    } 

    return errors;
};
