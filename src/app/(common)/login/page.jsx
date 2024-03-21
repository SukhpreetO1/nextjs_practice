"use client";
import { React, useState, InputField, PasswordField, SubmitButton, validate_login_submit_form, SIGNUP_URL, Link, auth, signInWithEmailAndPassword, useRouter, toast, ToastContainer, Cookies, useEffect, NAVBAR_DASHBOARD, FORGOT_PASSWORD, GOOGLE_LOGO, PHONE_NUMBER_LOGO, Image, signInWithPopup, GoogleAuthProvider } from '@/app/api/routes/page';

const Login = () => {
  const router = useRouter();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (localStorage.getItem("hasShownAccountCreatedToast") === "false") {
      toast.success("New account created successfully", {
        position: "top-right",
      });
      localStorage.removeItem("hasShownAccountCreatedToast");
    } else if (localStorage.getItem("hasShownLoggedOutToast") === "true") {
      toast.success("Logout successfully", {
        position: "top-right",
      });
      localStorage.removeItem("hasShownLoggedOutToast");
    } else if (localStorage.getItem("hasShownForgotPasswordToast") === "false") {
      toast.success("Forgot password mail send successfully", {
        position: "top-right",
      });
      localStorage.removeItem("hasShownForgotPasswordToast");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const validation_errors = validate_login_submit_form({ ...formData, [name]: value });
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: validation_errors[name] || null }));
  };

  const loginFormSubmit = async (e) => {
    e.preventDefault();
    const validation_errors = validate_login_submit_form(formData);
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 10 * 60 * 1000);
    if (Object.keys(validation_errors).length === 0) {
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        if (auth.currentUser.email === formData.email) {
          Cookies.set('currentUserToken', JSON.stringify(auth.currentUser.accessToken), {
            expires: expirationTime
          });
          localStorage.setItem("hasShownLoginToast", false);
          router.push(NAVBAR_DASHBOARD);
        } else {
          toast.error("Login failed. Please try again.", {
            position: "top-right",
          });
        }
      }
      catch (err) {
        console.log(err);
        toast.error("Invalid credential", {
          position: "top-right",
        });
      }
    } else {
      setErrors(validation_errors);
    }
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 10 * 60 * 1000);
    try {
      await signInWithPopup(auth, provider);
      Cookies.set('currentUserToken', JSON.stringify(auth.currentUser.accessToken), {
        expires: expirationTime
      });
      localStorage.setItem("hasShownLoginToast", false);
      router.push(NAVBAR_DASHBOARD);
    } catch (err){
      console.log(err);
    }
  }

  const signInWithPhone = () => {
    // router.push(LOGIN_URL);
  }

  return (
    <>
      <section>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"> Login </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-4" action="#" method="POST" onSubmit={loginFormSubmit}>
              <div className="login_email">
                <InputField label_heading="Email" id="email" className="email" name="email" placeholder="Email" div_name="login_email" value={formData.email} onChange={handleInputChange} error={errors.email} />
              </div>
              <div className="login_password">
                <PasswordField label_heading="Password" id="password" className="password" name="password" placeholder="Password" div_name="login_password" value={formData.password} onChange={handleInputChange} error={errors.password} />
              </div>
              <div className="forgot_password text-end text-blue-600 italic font-medium">
                <Link href={FORGOT_PASSWORD} className="forgot_password_link">Forgot Password?</Link>
              </div>
              <div className="login_button">
                <SubmitButton className="login_submit_button" id="login_submit_button" name="login_submit_button" div_name="login_submit_button" label="Login" />
              </div>
            </form>
            <div>
              <p className="mt-3 text-center text-sm text-gray-500"> Not a member? <Link href={SIGNUP_URL} className="underline underline-offset-4 italic text-blue-500">Sign up here</Link></p>
            </div>
            <div className="other_autherization_method flex justify-center mt-4">
              <div>Other ways to login :
                <div className='flex justify-center mt-4'>
                  <div className="google_autherization cursor-pointer">
                    <Image src={GOOGLE_LOGO} width={50} height={50} alt="google_logo" className='w-8 h-8 me-3 rounded-lg' onClick={() => signInWithGoogle()}/>
                  </div>
                  <div className="phone_number_autherization cursor-pointer">
                    <Image src={PHONE_NUMBER_LOGO} width={50} height={50} alt="google_logo" className='w-8 h-8 me-3 rounded-lg' onClick={() => signInWithPhone()}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Login;
