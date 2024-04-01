export const validate_blog_comment_form = (data) => {
    const errors = {};
    if (!data.blog_comment_name.trim()) {
        errors.blog_comment_name = 'Name field is required.';
    } else if (!/^[a-zA-Z]+$/.test(data.blog_comment_name)){
        errors.blog_comment_name = 'Name field should contain only letters.';
    }
    
    if (!data.blog_comment_email.trim()) {
        errors.blog_comment_email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(data.blog_comment_email)) {
        errors.blog_comment_email = 'Invalid email format.';
    }

    if (!data.blog_comment.trim()) {
        errors.blog_comment = 'Message field is required.';
    } 

    return errors;
};
