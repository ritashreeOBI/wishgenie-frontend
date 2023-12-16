"use client";

import {
  USER_REGISTER,
  VERIFY_EMAIL_ADDRESS,
  Google_Register,
} from "@/api/Api";
import { ROLE } from "@/api/UserRole";
import axios from "axios";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { useGoogleLogin } from "@react-oauth/google";
import {
  userLoginHandler,
  userVerifiedHandler,
} from "@/redux/slice/user/userAuth";
import { useDispatch } from "react-redux";
import Select from "react-select";
import Modal from "../../shared-components/Modal/Modal";
import Loader from "../../shared-components/Loader/Loader";
const DATE = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];
const MONTH = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getLast30Years() {
  const currentYear = new Date().getFullYear();
  const last30Years = [];

  for (let i = 0; i < 45; i++) {
    last30Years.push(currentYear - i);
  }
  return last30Years;
}

const SignUpForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [date, setDate] = useState(0);

  const otpRef = useRef();

  const recaptchaRef = useRef(); //For Recaptcha
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    let isSubmitted = JSON.parse(localStorage.getItem("submitted"));
    console.log("isSubmitted", typeof isSubmitted);
    let regEmail = localStorage.getItem("regEmail");
    if (isSubmitted) {
      setShowOtpForm(true);
      setIsSubmitting(false);
      setEmail(regEmail || "");
    }
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "name":
        setName(value);
        break;

      default:
        break;
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();
      let formData = {
        userName: name,
        email: email,
        password: password,
        // roleType: ROLE.MEMBER,
        token,
      };
      if (year && month && date) {
        formData["dob"] = `${year}-${month}-${date} 06:30:00`;
      }
      const response = await axios({
        url: USER_REGISTER,
        method: "POST",
        data: formData,
      });
      if (response) {
        const { message, user, token } = response.data;
        dispatch(userLoginHandler({ user, token }));
        toast.success(message);
        setShowOtpForm(true);
        localStorage.setItem("submitted", true);
        localStorage.setItem("regEmail", email);
        setPassword("");
        setIsSubmitting(false);
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setIsSubmitting(false);
    }
  };

  const otpVerifyHandler = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await axios({
        method: "POST",
        url: VERIFY_EMAIL_ADDRESS,
        data: {
          otp: otpRef.current.value,
          email: localStorage.getItem("regEmail"),
        },
      });
      const { message, verified } = response.data;
      toast.success(message);
      localStorage.removeItem("submitted");
      localStorage.removeItem("regEmail");
      dispatch(userVerifiedHandler());
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setIsSubmitting(false);
    }
  };
  //############### Google Login #############
  const googleSignUp = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        const response = await axios({
          method: "POST",
          url: Google_Register,
          data: { tokenResponse },
        });
        console.log("response", response);
        const { message, user, token } = response.data;
        dispatch(userLoginHandler({ user, token }));
        setLoading(false);
        toast.success(message);
        router.push("/");
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(err.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        setLoading(false);
      }
    },
    onError: (err) => {
      console.log("error", err);
      toast.error(err.message);
    },
  });

  //after signup this component will render
  if (showOtpForm) {
    return (
      <div className="mt-32 h-screen flex justify-center">
        <div className="w-full  max-w-sm">
          <form
            className="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4"
            onSubmit={otpVerifyHandler}
          >
            <div className="flex justify-center pb-5">
              <img src="/logo.png" alt="logo" className="w-28 h-auto" />
            </div>
            <p className="text-xl font-bold pb-3">Verify Email Address</p>

            <p>
              An OTP has been sent to your email address : <b>{email}</b>
            </p>
            <br />
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-1"
                htmlFor="otp"
              >
                Enter OTP
              </label>
              <br />
              <input
                className="appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                id="otp"
                autoFocus
                type="password"
                required={true}
                minLength={4}
                maxLength={4}
                placeholder="****"
                name="otp"
                ref={otpRef}
              />
            </div>
            <div className="flex items-center justify-end">
              {isSubmitting ? (
                <button
                  disabled
                  type="submit"
                  className="text-white bg-blue-500 w-full hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Please wait...
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-2xl focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Verify Email{" "}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-32 h-screen flex justify-center">
      <div className="w-full  max-w-sm">
        <form
          className="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4"
          onSubmit={registerHandler}
        >
          <ReCAPTCHA
            sitekey="6LdMdH4mAAAAAJvMTdlfi-6rekjpgerlwZI_bxDv" //real server
            // sitekey="6Le2dHwmAAAAAFLHUpIodMxqWS5TER_XfBjgfmlA" //localhost
            size="invisible"
            ref={recaptchaRef}
          />
          <div className="flex justify-center pb-4">
            <img src="/logo.png" alt="logo" className="w-28 h-auto" />
          </div>

          {/* #############---NAME---############ */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <br />
            <input
              className=" appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
              id="name"
              type="text"
              placeholder="Your name"
              minLength={3}
              required={true}
              name="name"
              value={name}
              onChange={changeHandler}
            />
          </div>
          {/* #############---DOB---############ */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dob"
            >
              Date of Birth
            </label>
            <br />
            <div className="flex justify-between">
              <Select
                id={Date.now().toString() + "" + "date"}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: "16px",
                  textALign: "center",
                })}
                onChange={(e) => {
                  setDate(e.value);
                }}
                options={DATE.map((item) => {
                  return { value: item, label: item };
                })}
                placeholder="Date"
              />
              <Select
                id={Date.now().toString() + "" + "month"}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: "16px",
                  textALign: "center",
                })}
                options={MONTH.map((item, i) => {
                  return { value: i + 1, label: item };
                })}
                onChange={(e) => {
                  setMonth(e.value);
                }}
                placeholder="Month"
              />
              <Select
                id={Date.now().toString() + "" + "year"}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: "16px",
                  textALign: "center",
                })}
                options={getLast30Years().map((item) => {
                  return { value: item, label: item };
                })}
                onChange={(e) => {
                  setYear(e.value);
                }}
                placeholder="Year"
              />
            </div>
          </div>
          {/* #############---EMAIL---############ */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Email"
            >
              Email
            </label>
            <br />
            <input
              className=" appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
              id="Email"
              type="email"
              required={true}
              placeholder="Email address"
              name="email"
              value={email}
              onChange={changeHandler}
            />
          </div>
          {/* #############---PASSWORD---############ */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <br />
            <input
              className=" appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
              id="password"
              type="password"
              required={true}
              minLength={6}
              placeholder="******************"
              name="password"
              value={password}
              onChange={changeHandler}
            />
          </div>
          {/* #############---BUTTONS---############ */}
          <div className="flex items-center justify-between">
            {isSubmitting ? (
              <button
                disabled
                type="button"
                className="text-white bg-blue-500 w-full hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Please wait...
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white  w-full text-center font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isSubmitting}
              >
                Sign Up
              </button>
            )}
          </div>
          <div className="flex justify-center my-4">
            <span className="text-gray-400">---------</span>
            <p className="text-gray-500">&nbsp;OR&nbsp;</p>
            <span className="text-gray-400">---------</span>
          </div>
          <div className="flex justify-evenly">
            <img
              src="/google.png"
              className="h-[50px] w-[auto] hover:cursor-pointer"
              alt="google"
              onClick={() => googleSignUp()}
            />{" "}
            <img
              src="/facebook.png"
              className="h-[50px] w-[auto] hover:cursor-pointer"
              alt="google"
              // onClick={googleSignUp}
            />
          </div>

          <p className="pt-8 text-zinc-500">
            Already have an account ?{" "}
            <Link href="/signin" className="text-sky-700 hover:font-bold">
              Sign In
            </Link>
          </p>
        </form>

        {/* <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p> */}
        {loading ? <Loader /> : ""}
      </div>
    </div>
  );
};

export default SignUpForm;
