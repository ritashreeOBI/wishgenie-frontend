import Router, { useRouter } from "next/router";
import React, { useState, useRef, use } from "react";
import { useDispatch, useSelector } from "react-redux";

const Orders = () => {
  const { user, loggedIn, isLoading } = useSelector(
    (state) => state.userAuthSlice
  );

  React.useEffect(() => {
    if (!loggedIn && !isLoading) {
      return Router.back();
    }
  }, [loggedIn, isLoading]);

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
    <div className="bg-slate-50 p-4 shadow  rounded-3xl min-h-[300px]">
      <div className="flex justify-between ">
        <h3 className="font-bold">My Orders </h3>
      </div>
      <hr className="my-2" />
    </div>
  );
};

export default Orders;
