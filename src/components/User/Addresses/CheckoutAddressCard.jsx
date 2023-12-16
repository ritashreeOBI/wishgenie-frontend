import Modal from "@/components/shared-components/Modal/Modal";
import {
  deleteUserAddress,
  getUserAddresses,
  setDetaultAddress,
  setSelectedAddress,
  setSelectedAddressForDelivery,
} from "@/store/slices/user/userAddressSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
const CheckoutAddressCard = ({ address, hideAddressListHandler }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const setDefaultHandler = () => {
    dispatch(setDetaultAddress(address.addressId))
      .then(unwrapResult)
      .then(() => {
        dispatch(getUserAddresses());
      });
  };

  const closeConfirmModal = () => {
    setShowModal(false);
  };

  const deleteHandler = () => {
    dispatch(deleteUserAddress(address.addressId));
  };
  return (
    <div
      className={`border rounded-xl p-3 my-4 shadow-xs w-auto ${
        address.defaultAddress ? "border-admin-primary border-1" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <p className="font-semibold  capitalize">{address.name} </p>{" "}
          {address.defaultAddress ? (
            <p className="bg-admin-dark-text text-white text-[10px] ml-12 px-1 py-[2px] rounded-sm">
              Default
            </p>
          ) : (
            <button
              className="ml-12 text-blue-400 text-xs hover:font-semibold"
              onClick={setDefaultHandler}
            >
              Set Default
            </button>
          )}
        </div>
        <div className="flex">
          <p
            className="bg-blue-200 rounded-full p-1 hover:cursor-pointer"
            onClick={() => dispatch(setSelectedAddress(address))}
          >
            <MdEdit className="text-admin-primary text-xl " />
          </p>
        </div>
      </div>
      {/* <p className="font-semibold  capitalize">{address.name} </p>{" "} */}
      <p className="font-medium  capitalize">{address.company} </p>{" "}
      <p className="font-medium  capitalize">{address.phoneNo} </p>{" "}
      {address.company ? (
        <p className="font-medium  capitalize">{address.email} </p>
      ) : null}
      <p className="my-1">
        {address.addressLineOne},{" "}
        {address.addressLineTwo ? address.addressLineTwo + " ," : null}&nbsp;
        {address.state},&nbsp;{address.country}
        &nbsp;- {address.zipcode}
      </p>
      <p>{address.phone}</p>
      <p></p>
      <button
        // type="button"
        className="my-2 bg-admin-primary text-white rounded-sm px-4 py-2"
        onClick={() => {
          dispatch(setSelectedAddressForDelivery(address));
          hideAddressListHandler();
        }}
      >
        Deliver Here
      </button>
    </div>
  );
};

export default CheckoutAddressCard;
