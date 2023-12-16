import { logoutHandler } from "@/store/slices/admin/adminSlice";
import { userLogoutHandler } from "@/store/slices/user/userAuth";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
const Profile = () => {
  const { user } = useSelector((state) => state.adminSlice);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
console.log('user', user)
  return (
    <div className="mt-1 h-screen container">
      <div className="bg-slate-50  p-4 shadow  rounded-2xl min-h-[300px] ">
        <div className="flex justify-between ">
          <h3 className="font-bold text-admin-dark-text">Profile Details</h3>
        </div>
        <hr className="my-2" />
        <div className="flex my-4">
          <p className="mr-10 text-slate-500">User Name </p>
          <p className="font-bold text-admin-dark-text">{user.userName}</p>
        </div>
        <div className="flex ">
          <p className="mr-4 text-slate-500">Email Address </p>
          <p className="font-bold text-admin-dark-text">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
