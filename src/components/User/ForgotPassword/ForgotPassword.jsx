import {
  FORGOT_PASSWORD,
  Facebook_Register,
  Google_Register,
  LOGIN,
} from "@/api/Api";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

import axios from "axios";
import { useDispatch } from "react-redux";
import { userLoginHandler } from "@/redux/slice/user/userAuth";
import Loader from "../../shared-components/Loader/Loader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;

      default:
        break;
    }
  };

  const emailSendHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios({
      url: FORGOT_PASSWORD,
      method: "POST",
      data: {
        email: email,
      },
    })
      .then((response) => {
        const { message } = response.data;
        toast.success(message, { autoClose: 3000 });

        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsSubmitting(false);
      });
  };

  return (
    <div className="mt-32 h-screen flex justify-center">
      <div className="w-full max-w-sm">
        <form
          className="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4"
          onSubmit={emailSendHandler}
        >
          <div className="flex justify-center pb-4">
            <img src="/logo.png" alt="logo" className="w-28 h-auto" />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-1"
              htmlFor="Email"
            >
              Email Address
            </label>
            <br />
            <input
              className=" appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
              id="Email"
              type="text"
              placeholder="Email address"
              name="email"
              value={email}
              onChange={changeHandler}
            />
            <p className="text-sm text-slate-400 my-2 ml-2">
              An email will be send to the email address.
            </p>
          </div>

          <div className="flex items-center justify-between mt-8">
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
                Forgot Password
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
