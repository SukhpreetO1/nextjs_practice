import Link from 'next/link';
import React, {useState} from "react";
import InputField from "@/components/InputField";
import DateField from "@/components/DateField";
import RadioButtonField from "@/components/RadioButtonField";
import CheckboxField from "@/components/CheckboxField";
import PasswordField from "@/components/PasswordField";
import SubmitButton from "@/components/SubmitButton";
import { useRouter } from 'next/navigation'

// js validation files
import { validate_signup_submit_form } from '@/../public/assets/js/signup';
import { validate_login_submit_form } from '@/../public/assets/js/login';

// page redirection files
import { LOGIN_URL, SIGNUP_URL, HOME_URL } from '@/app/api/redirection_route/page';

// firebase import
import { auth } from "@/db/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

export {
  Link,
  React,
  useState,
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
  useRouter,


  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
};