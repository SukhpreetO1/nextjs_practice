"use client";
import { InputField, PasswordField, SubmitButton, validate_login_submit_form, SIGNUP_URL, Link, auth, signInWithEmailAndPassword, useRouter, toast, Cookies, NAVBAR_DASHBOARD, FORGOT_PASSWORD, GOOGLE_LOGO, PHONE_NUMBER_LOGO, Image, signInWithPopup, GoogleAuthProvider, signInWithPhoneNumber, collection, db, where, query, getDocs, ADMIN_DASHBOARD, serverTimestamp, addDoc, RecaptchaVerifier, PhoneAuthProvider, signInWithCredential } from '@/app/api/routes/page';
import React, { useState, useEffect } from 'react';

const Login = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');

  useEffect(() => {
    const showToast = (item, message) => {
      if (localStorage.getItem(item) === "false") {
        toast.success(message, { position: "top-right" });
        localStorage.removeItem(item);
      }
    };

    showToast("hasShownAccountCreatedToast", "New account created successfully");
    showToast("hasShownLoggedOutToast", "Logout successfully");
    showToast("hasShownForgotPasswordToast", "Forgot password mail sent successfully");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const validation_errors = validate_login_submit_form({ ...formData, [name]: value });
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: validation_errors[name] || null }));
  };

  const handleClick = () => setDisabled(true);

  const loginFormSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate_login_submit_form(formData);
    const expirationTime = new Date(Date.now() + 10 * 60 * 1000);

    const getUserDataFromFirestore = async (email) => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email));

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data());
      } catch (error) {
        console.error("Error fetching user data from Firestore:", error);
        return null;
      }
    };

    if (Object.keys(validationErrors).length === 0) {
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const userData = await getUserDataFromFirestore(formData.email);
        const role_id = userData[0]?.role_id;
        const token = JSON.stringify(auth.currentUser.accessToken);
        const cookieName = role_id === 1 ? 'currentAdminToken' : 'currentUserToken';

        Cookies.set(cookieName, token, { expires: expirationTime });
        localStorage.setItem("hasShownLoginToast", false);
        setDisabled(false);
        router.push(role_id === 1 ? ADMIN_DASHBOARD : NAVBAR_DASHBOARD);
      } catch (error) {
        setDisabled(false);
        toast.error(error.code === "auth/wrong-password" ? "Invalid credential" : "Login failed. Please try again.", { position: "top-right" });
        console.log(error);
      }
    } else {
      setDisabled(false);
      setErrors(validationErrors);
    }
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 10 * 60 * 1000);
    try {
      await signInWithPopup(auth, provider);
      const fullName = auth.currentUser.displayName || '';
      const [first_name, last_name] = fullName.split(' ');
      const user_data = {
        first_name: String(first_name),
        last_name: String(last_name),
        email: String(auth.currentUser.email),
        username: '',
        date_of_birth: '',
        mobile_number: '',
        gender: '',
        role_id: Number(1),
        hobbies: '',
        password: '',
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      };
      await addDoc(collection(db, 'users'), user_data);

      Cookies.set('currentUserToken', JSON.stringify(auth.currentUser.accessToken), { expires: expirationTime });
      localStorage.setItem("hasShownLoginToast", false);
      router.push(NAVBAR_DASHBOARD);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSendCode = async () => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'send-code-button', { size: 'invisible' });
    try {
      const verificationId = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      toast.success("OTP sent successfully", { position: "top-right" })
      setVerificationId(verificationId);
    } catch (error) {
      toast.success("Phone number is not correct" + error, { position: "top-right" })
      console.error(error);
    }
  };

  const signInWithPhone = async () => {
    let validation_errors = {};
    let isValid = true;

    if (!phoneNumber.trim()) {
      validation_errors.mobile_number = "Mobile number is required";
      isValid = false;
    } else if (!/^\+\d{12}$/i.test(phoneNumber)) {
      validation_errors.mobile_number = "Mobile number should be 13 digits including country code";
      isValid = false;
    }

    if (!verificationCode.trim()) {
      validation_errors.verificationCode = "OTP is required";
      isValid = false;
    }

    if (isValid) {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      try {
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, credential);
        const userCredential = await confirmationResult.confirm(verificationCode);
        console.log("userCredential", userCredential);
        console.log("User signed in successfully");
        setShowModal(false);
        // router.push(LOGIN_URL);
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors(validation_errors);
    }
  };

  return (
    <>
      <section>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"> Login </h2>
          </div>

          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
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
                <SubmitButton className="login_submit_button" id="login_submit_button" name="login_submit_button" div_name="login_submit_button" label="Login" disabled={disabled} onClick={handleClick} />
              </div>
            </form>
            <div>
              <p className="mt-3 text-center text-sm text-gray-500"> Not a member? <Link href={SIGNUP_URL} className="underline underline-offset-4 italic text-blue-500">Sign up</Link></p>
            </div>
            <div className="other_autherization_method flex justify-center mt-4">
              <div><span className='flex justify-center font-light italic text-gray-500'>- - - - - - - - - Other ways - - - - - - - - -</span>
                <div className='my-4'>
                  <div className="google_autherization cursor-pointer flex my-4" onClick={() => signInWithGoogle()}>
                    <Image src={GOOGLE_LOGO} width={50} height={50} alt="google_logo" className='w-8 h-8 me-3 rounded-lg' />
                    <span className='font-light text-gray-500'>Log in with google account</span>
                  </div>
                  <div className="phone_number_autherization cursor-pointer flex" onClick={() => setShowModal(true)}>
                    <Image src={PHONE_NUMBER_LOGO} width={50} height={50} alt="google_logo" className='w-8 h-8 me-3 rounded-lg' />
                    <span className='font-light text-gray-500'>Log in with phone number</span>
                  </div>
                  {showModal && (
                    <div id="default-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-80">
                      <div className="relative p-4 w-full max-w-2xl max-h-full sign_in_with_mobile_number">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          <div className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              Signin with Mobile Number
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={() => setShowModal(false)}>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                              </svg>
                            </button>
                          </div>
                          <div className='mx-8 pb-5'>
                            <div className="singin_with_mobile_number flex">
                              <InputField label_heading="Enter your mobile number" id="mobile_number" className="mobile_number" name="mobile_number" placeholder="Enter your mobile number" div_name="mobile_number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} error={errors.mobile_number} />
                              <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 h-9 w-36 mt-8 ml-4' id="send-code-button" onClick={handleSendCode}>Send Code</button>
                            </div>
                            <div className="verificationCode">
                              <InputField label_heading="Enter OTP" id="verificationCode" className="verificationCode" name="verificationCode" placeholder="Enter OTP" div_name="verificationCode" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} error={errors.verificationCode} />
                            </div>
                            <div className='text-center'>
                              <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={signInWithPhone}>Submit</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
