"use client";

import { InputField, LOGIN_URL, Link, SubmitButton, useRouter, useState, validate_forgot_password_submit_form, sendPasswordResetEmail, auth, collection, db, where, query, getDocs, toast, ToastContainer } from "@/app/api/routes/page";

const ForgotPassword = () => {
  const router = useRouter();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: '',
  });

  const forgotPasswordFormSubmit = async (e) => {
    e.preventDefault();
    const validation_errors = validate_forgot_password_submit_form(formData);
    if (Object.keys(validation_errors).length === 0) {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', formData.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          await sendPasswordResetEmail(auth, formData.email);;
          if (formData.email !== null) {
            localStorage.setItem("hasShownForgotPasswordToast", false);
            router.push(LOGIN_URL);
            return; 
          }
        }
        throw new Error("Email not found. Please check it again");
      } catch (err) {
        toast.error(err.message || "An error occurred. Please try again.", {
          position: "top-right",
        });
      }
    } else {
      setErrors(validation_errors);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const validation_errors = validate_forgot_password_submit_form({ ...formData, [name]: value });
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: validation_errors[name] || null }));
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password</h1>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="" action="#" method="POST" onSubmit={forgotPasswordFormSubmit}>
            <div className="email">
              <InputField label_heading="Email" className="email" id="email" name="email" div_name="email" placeholder="Enter your email here" value={formData.email} onChange={handleInputChange} error={errors.email} />
            </div>
            <div className="login_redirection text-end text-blue-600 italic font-medium">
              <Link href={LOGIN_URL} className="forgot_password_link">Login....</Link>
            </div>
            <div className="forgot_password_button">
              <SubmitButton className="forgot_password_submit_button" id="forgot_password_submit_button" name="forgot_password_submit_button" div_name="forgot_password_submit_button" label="Forgot Password" />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
