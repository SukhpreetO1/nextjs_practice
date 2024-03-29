import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

// getting data from components
import CardWithDetail from "@/components/CardWithDetail";
import CheckboxField from "@/components/CheckboxField";
import DateField from "@/components/DateField";
import ImageUploading from "@/components/ImageUploading";
import InputField from "@/components/InputField";
import PasswordField from "@/components/PasswordField";
import RadioButtonField from "@/components/RadioButtonField";
import SubmitButton from "@/components/SubmitButton";
import TextAreaField from "@/components/TextAreaField";

// importing from common folder
import Navbar from "@/app/(common)/navbar/page";
import Footer from "@/app/(common)/footer/page";
import BlogCommetForm from "@/app/(common)/blog_comment_form/page";
import BlogReviews from "@/app/(common)/blog_reviews/page";

// importing from users/navbar/dashboard folder
import DashboardHome from "@/app/(users)/dashboard/(home)/page";

// importing from the admin folder
import Sidebar from "@/app/admin/(sidebar)/page";

// js validation files
import { validate_signup_submit_form } from "@/../public/assets/js/signup";
import { validate_login_submit_form } from "@/../public/assets/js/login";
import { validate_forgot_password_submit_form } from "@/../public/assets/js/forgot_password";
import { validate_contact_form } from "@/../public/assets/js/contact_form"

// page redirection files
import {
  HOME_URL,
  LOGIN_URL,
  SIGNUP_URL,
  FORGOT_PASSWORD,
  LOGO_IMAGE_URL,
  AVATAR_IMAGE_URL,
  AVATAR_ABOUT_IMAGE,
  GOOGLE_LOGO,
  PHONE_NUMBER_LOGO,
  NAVBAR_DASHBOARD,
  NAVBAR_CONTACT,
  NAVBAR_ABOUT,
  NAVBAR_PROFILE,
  NAVBAR_BLOGS,
  ADMIN_DASHBOARD,
  ADMIN_BLOGS,
  ADMIN_ADD_BLOGS,
  ADMIN_EDIT_BLOGS,
  USER_DETAILS,
  ADMIN_CONTACT_MESSAGES,
  ADMIN_PRIVACY_POLICIES,
  ADMIN_TERMS_AND_CONDITION,
  ADMIN_PROFILE,
  PRIVACY_POLICIES,
  TERMS_AND_CONDITION,
} from "@/app/api/redirection_route/page";

// firebase import
import { auth, db } from "@/db/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
  signInWithCustomToken,
  sendPasswordResetEmail,
  signInWithPopup, 
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithCredential
} from "firebase/auth";

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  getFirestore,
  doc,
  getDoc,
  onSnapshot,
  deleteDoc,
  updateDoc
} from "firebase/firestore";

import { 
  ref, 
  uploadBytes, 
  getStorage, 
  getDownloadURL 
} from "firebase/storage";

// use toastify for notification
import { ToastContainer, toast } from "react-toastify";

// use fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faPenToSquare, faTrashCan, faEye, faEyeSlash, faPlus } from "@fortawesome/free-solid-svg-icons";

// used to store data in cookies
import Cookies from "js-cookie";

// use for hashing password
import bcrypt, { hash } from "bcryptjs";

// use for jwt
import jwt from "jsonwebtoken";

// use for getting data from helper
import { fetchUserDataFromToken } from "@/helpers/helpers";

export {
  Link,
  useRouter,
  usePathname,
  Image,

  CardWithDetail,
  CheckboxField,
  DateField,
  ImageUploading,
  InputField,
  PasswordField,
  RadioButtonField,
  SubmitButton,
  TextAreaField,

  Navbar,
  Footer,
  BlogCommetForm,
  BlogReviews,
  DashboardHome,

  Sidebar,

  validate_signup_submit_form,
  validate_login_submit_form,
  validate_forgot_password_submit_form,
  validate_contact_form,

  HOME_URL,
  LOGIN_URL,
  SIGNUP_URL,
  FORGOT_PASSWORD,
  LOGO_IMAGE_URL,
  AVATAR_IMAGE_URL,
  AVATAR_ABOUT_IMAGE,
  GOOGLE_LOGO,
  PHONE_NUMBER_LOGO,
  NAVBAR_DASHBOARD,
  NAVBAR_CONTACT,
  NAVBAR_ABOUT,
  NAVBAR_PROFILE,
  NAVBAR_BLOGS,
  ADMIN_DASHBOARD,
  ADMIN_BLOGS,
  ADMIN_ADD_BLOGS,
  ADMIN_EDIT_BLOGS,
  USER_DETAILS,
  ADMIN_CONTACT_MESSAGES,
  ADMIN_PRIVACY_POLICIES,
  ADMIN_TERMS_AND_CONDITION,
  ADMIN_PROFILE,
  PRIVACY_POLICIES,
  TERMS_AND_CONDITION,

  auth,
  db,

  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
  signInWithCustomToken,
  sendPasswordResetEmail,
  signInWithPopup, 
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithCredential,
  
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  getFirestore,
  doc,
  getDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,

  ref, 
  uploadBytes, 
  getStorage, 
  getDownloadURL,

  ToastContainer,
  toast,

  FontAwesomeIcon,
  faInfo, 
  faPenToSquare, 
  faTrashCan,
  faEye, 
  faEyeSlash, 
  faPlus,

  Cookies,

  bcrypt,
  hash,

  jwt,

  fetchUserDataFromToken,
};