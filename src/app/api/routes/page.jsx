import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

// getting data from components
import InputField from "@/components/InputField";
import DateField from "@/components/DateField";
import RadioButtonField from "@/components/RadioButtonField";
import CheckboxField from "@/components/CheckboxField";
import PasswordField from "@/components/PasswordField";
import SubmitButton from "@/components/SubmitButton";

import Navbar from "@/app/(common)/navbar/page";

// js validation files
import { validate_signup_submit_form } from "@/../public/assets/js/signup";
import { validate_login_submit_form } from "@/../public/assets/js/login";
import { validate_forgot_password_submit_form } from "@/../public/assets/js/forgot_password";

// page redirection files
import {
  HOME_URL,
  LOGIN_URL,
  SIGNUP_URL,
  FORGOT_PASSWORD,
  LOGO_IMAGE_URL,
  AVATAR_IMAGE_URL,
  GOOGLE_LOGO,
  PHONE_NUMBER_LOGO,
  NAVBAR_DASHBOARD,
  NAVBAR_PROFILE,
  NAVBAR_ABOUT,
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
  GoogleAuthProvider
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
} from "firebase/firestore";

// use toastify for notification
import { ToastContainer, toast } from "react-toastify";

// use fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  React,
  useState,
  useEffect,
  useRouter,
  usePathname,
  Image,

  InputField,
  DateField,
  RadioButtonField,
  CheckboxField,
  PasswordField,
  SubmitButton,

  Navbar,

  validate_signup_submit_form,
  validate_login_submit_form,
  validate_forgot_password_submit_form,

  HOME_URL,
  LOGIN_URL,
  SIGNUP_URL,
  FORGOT_PASSWORD,
  LOGO_IMAGE_URL,
  AVATAR_IMAGE_URL,
  GOOGLE_LOGO,
  PHONE_NUMBER_LOGO,
  NAVBAR_DASHBOARD,
  NAVBAR_PROFILE,
  NAVBAR_ABOUT,

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

  ToastContainer,
  toast,

  FontAwesomeIcon,

  Cookies,

  bcrypt,
  hash,

  jwt,

  fetchUserDataFromToken,
};