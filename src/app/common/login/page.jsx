"use client";
import { React, useState, InputField, PasswordField, SubmitButton, validate_login_submit_form, SIGNUP_URL, HOME_URL, Link, auth, signInWithEmailAndPassword, useRouter } from '@/app/api/routes/page';

const login = () => {
  const router = useRouter();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const loginFormSubmit = async (e) => {
    e.preventDefault();
    const validation_errors = validate_login_submit_form(formData);
    if (Object.keys(validation_errors).length === 0) {
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        if (auth.currentUser.email === formData.email) {
          router.push(HOME_URL);
        } else {
          console.log('Login failed. Please try again.');
        }
      }
      catch (err) {
        console.log('Account not created with this email. Please create your account.' + err);
      }
    } else {
      setErrors(validation_errors);
    }
  }

  return (
    <>
      <div className="container">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={loginFormSubmit}>
              <div className="login_email">
                <InputField label_heading="Email" id="email" className="email" name="email" placeholder="Email" div_name="login_email" value={formData.email} onChange={handleInputChange} error={errors.email} />
              </div>
              <div className="login_password">
                <PasswordField label_heading="Password" id="password" className="password" name="password" placeholder="Password" div_name="login_password" value={formData.password} onChange={handleInputChange} error={errors.password} />
              </div>
              <div className="login_button">
                <SubmitButton className="login_submit_button" id="login_submit_button" name="login_submit_button" div_name="login_submit_button" />
              </div>
            </form>
            <div>
              <p className="mt-3 text-center text-sm text-gray-500"> Not a member? <Link href={SIGNUP_URL} className="underline underline-offset-4 italic text-blue-500">Sign up here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
