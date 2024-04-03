export const validate_blog_comment_form = (data) => {
    const errors = {};
    if (!data.blog_comment.trim()) {
        errors.blog_comment = 'Message field is required.';
    } 

    return errors;
};
