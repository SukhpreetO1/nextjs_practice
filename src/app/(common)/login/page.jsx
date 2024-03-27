"use client";
import { InputField, PasswordField, SubmitButton, validate_login_submit_form, SIGNUP_URL, Link, auth, signInWithEmailAndPassword, useRouter, toast, Cookies, NAVBAR_DASHBOARD, FORGOT_PASSWORD, GOOGLE_LOGO, PHONE_NUMBER_LOGO, Image, signInWithPopup, GoogleAuthProvider, collection, db, where, query, getDocs, ADMIN_DASHBOARD, serverTimestamp, addDoc } from '@/app/api/routes/page';
import React, { useState, useEffect } from 'react';

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
          const checkUserEmailInFirestore = async (email) => {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', email));

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                const userData = doc.data();
                if (userData.role_id === 2) {
                  Cookies.set('currentAdminToken', JSON.stringify(auth.currentUser.accessToken), {
                    expires: expirationTime
                  });
                  localStorage.setItem("hasShownLoginToast", false);
                  router.push(ADMIN_DASHBOARD);
                } else {
                  Cookies.set('currentUserToken', JSON.stringify(auth.currentUser.accessToken), {
                    expires: expirationTime
                  });
                  localStorage.setItem("hasShownLoginToast", false);
                  router.push(NAVBAR_DASHBOARD);
                }
              });
            }
          };
          checkUserEmailInFirestore(formData.email);
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
      const full_name = auth.currentUser.displayName;
      if (full_name !== null){
        var first_name = full_name.split(' ')[0];
        var last_name = full_name.split(' ')[1];
      }
      const user_data = {
        first_name: String(first_name),
        last_name: String(last_name),
        email: String(auth.currentUser.email),
        username: '',
        date_of_birth: '',
        mobile_number: '',
        gender: '',
        role_id: '',
        hobbies: '',
        password: '',
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      };
      await addDoc(collection(db, 'users'), user_data);

      Cookies.set('currentUserToken', JSON.stringify(auth.currentUser.accessToken), {
        expires: expirationTime
      });
      localStorage.setItem("hasShownLoginToast", false);
      router.push(NAVBAR_DASHBOARD);
    } catch (err) {
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
              <div><span className='flex justify-center font-light italic text-gray-500'>- - - - - - - - - Other ways - - - - - - - - -</span>
                <div className='my-4'>
                  <div className="google_autherization cursor-pointer flex my-4" onClick={() => signInWithGoogle()}>
                    <Image src={GOOGLE_LOGO} width={50} height={50} alt="google_logo" className='w-8 h-8 me-3 rounded-lg' />
                    <span className='font-light text-gray-500'>Log in with google account</span>
                  </div>
                  <div className="phone_number_autherization cursor-pointer flex" onClick={() => signInWithPhone()} >
                    <Image src={PHONE_NUMBER_LOGO} width={50} height={50} alt="google_logo" className='w-8 h-8 me-3 rounded-lg' />
                    <span className='font-light text-gray-500'>Log in with phone number</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
