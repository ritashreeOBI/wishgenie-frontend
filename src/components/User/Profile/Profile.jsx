import {
  asyncSendOtp,
  asyncVerifyOtp,
  userLogoutHandler,
  userVerifiedHandler,
} from "@/store/slices/user/userAuth";
import Router, { useRouter } from "next/router";
import React, { useState, useRef, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ModalContainer from "../../../components/shared-components/Modal/Modal";
import { unwrapResult } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const Profile = () => {
  const { user, loggedIn, isLoading, showOtpForm } = useSelector(
    (state) => state.userAuthSlice
  );

  const otpRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const logoutHandler = () => {
    dispatch(userLogoutHandler());
    toast.success("Logout Successfully",{autoClose:1000});
    router.push("/");
  };

  React.useEffect(() => {
    if (!loggedIn && !isLoading) {
      return Router.back();
    }
  }, [loggedIn, isLoading]);

  const sendOtpToEmail = () => {
    setIsSubmitting(true);
    dispatch(asyncSendOtp(user.email))
      .then(unwrapResult)
      .then((response) => {
        // toast.success(response.message);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error);
        setIsSubmitting(false);
      });
  };

  const otpVerifyHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = { email: user.email, otp: otpRef.current.value };
    dispatch(asyncVerifyOtp(data))
      .then(unwrapResult)
      .then((response) => {
        toast.success(response.message);
        setIsSubmitting(false);
        dispatch(userVerifiedHandler());
      })
      .catch((error) => {
        toast.error(error);
        setIsSubmitting(false);
      });
  };

  if (isLoading) {
    return (
      <div className="mt-32 h-screen container">
        <p className="text-center font-bold text-zinc-600 text-2xl mt-14">
          Loading...
        </p>
      </div>
    );
  }

  return (
    // <div className="mt-32 h-screen container">
    // {/* <div className="bg-slate-50 mx-10 p-4 shadow  rounded-3xl min-h-[300px]"> */}
    <div className="bg-slate-50 p-4 shadow  rounded-3xl min-h-[300px]">
      <div className="">
        <div className="flex justify-between ">
          <h3 className="font-bold">Profile Details</h3>
          <p
            className="px-4 py-2 bg-cyan-500 text-white hover:cursor-pointer rounded-md"
            onClick={openModal}
          >
            Logout
          </p>
        </div>
        <hr className="my-2" />
        <div className="flex my-4">
          <p className="mr-10 text-slate-500">User Name </p>
          <p className="font-bold capitalize">{user.userName}</p>
        </div>
        {/* //email */}
        <div className="flex ">
          <p className="mr-4 text-slate-500">Email Address </p>
          {user.verified ? (
            <p className="font-bold">
              {user.email} &nbsp;&nbsp;
              <span className="bg-green-500 text-white font-thin text-sm py-1 px-2 rounded-lg">
                verified
              </span>
            </p>
          ) : (
            <div className="flex justify-between items-center w-full">
              <p className="font-bold">{user.email}</p>
              <button
                disabled={isSubmitting}
                className={`bg-orange-400 text-white p-1 px-3 rounded-2xl text-sm hover:bg-orange-500 ${
                  isSubmitting ? "cursor-wait" : "cursor-pointer"
                }`}
                onClick={sendOtpToEmail}
              >
                Verify Email
              </button>
            </div>
          )}
        </div>
        {user.dob ? (
          <div className="flex my-4">
            <p className="mr-8 text-slate-500">Date of Birth </p>
            <p className="font-bold">{dayjs(user.dob).format("DD-MMM-YYYY")}</p>
          </div>
        ) : null}
      </div>

      {/* ////////////////////////////////// */}

      <Modal isOpen={isOpen} onClose={closeModal} logoutHandler={logoutHandler}>
        <h2 className="font-bold text-xl">Are you sure?</h2>
        <p className="text-slate-600 my-4">Do you want to logout!</p>
      </Modal>

      <ModalContainer isOpen={showOtpForm}>
        <div className="flex justify-center">
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
                An OTP has been sent to your email address : <b>{user.email}</b>
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
                  className=" appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
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
      </ModalContainer>
    </div>
  );
};

export default Profile;

const Modal = ({ isOpen, onClose, children, logoutHandler }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      // onClick={onClose}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-8 z-10 min-w-[350px]">
        {children}
        <div className="flex justify-start mt-8">
          <button
            className="px-4 py-2 border border-cyan-500 text-cyan-500 hover:cursor-pointer rounded-md min-w-[100px]"
            onClick={onClose}
          >
            No
          </button>{" "}
          &nbsp;
          <button
            className="px-4 py-2 bg-cyan-500 text-white hover:cursor-pointer rounded-md min-w-[140px]"
            onClick={logoutHandler}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

// export default Modal;
