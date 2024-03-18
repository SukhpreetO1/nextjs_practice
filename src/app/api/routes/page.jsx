import Link from 'next/link';
import React, {useState, useEffect} from "react";
import InputField from "@/components/InputField";
import DateField from "@/components/DateField";
import RadioButtonField from "@/components/RadioButtonField";
import CheckboxField from "@/components/CheckboxField";
import PasswordField from "@/components/PasswordField";
import SubmitButton from "@/components/SubmitButton";
import { useRouter, usePathname } from 'next/navigation'
import Image from "next/image";

import Navbar from '@/app/common/navbar/page';

// js validation files
import { validate_signup_submit_form } from '@/../public/assets/js/signup';
import { validate_login_submit_form } from '@/../public/assets/js/login';

// page redirection files
import { LOGIN_URL, SIGNUP_URL, HOME_URL, LOGO_IMAGE_URL, AVATAR_IMAGE_URL, PROFILE } from '@/app/api/redirection_route/page';

// firebase import
import { auth } from "@/db/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// use toastify for notification
import { ToastContainer, toast } from "react-toastify";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export {
  Link,
  React,
  useState,
  useEffect,

  InputField,
  DateField,
  RadioButtonField,
  CheckboxField,
  PasswordField,
  SubmitButton,

  validate_signup_submit_form,
  validate_login_submit_form,

  LOGIN_URL,
  SIGNUP_URL,
  HOME_URL,
  LOGO_IMAGE_URL,
  AVATAR_IMAGE_URL,
  PROFILE,

  useRouter,
  usePathname,
  Image,

  Navbar,


  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,

  toast,
  ToastContainer,
  FontAwesomeIcon
};