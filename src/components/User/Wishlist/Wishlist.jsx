import { Text } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import React, { useState, useRef, use } from "react";
import { useDispatch, useSelector } from "react-redux";

const Wishlist = () => {
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
    <div className="  min-h-[300px]">
      <div className="flex justify-between ">
        <h3 className="font-bold">Wishlist</h3>
      </div>
      <hr className="my-2" />
      <Text textAlign={'center'} my={8}>No wishlisted items</Text>
      {/* // */}
    </div>
  );
};

export default Wishlist;
