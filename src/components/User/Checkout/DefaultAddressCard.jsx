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
import { MdDeleteForever, MdEdit, CheckIcon } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
const DefaultAddressCard = ({
  address,
  showAddressListHandler,
  hideAddressListHandler,
}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { selectedDeliveryAddress } = useSelector(
    (state) => state.userAddressSlice
  );
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
    <div className={`rounded-xl p-3 my-4 shadow-sm w-auto bg-slate-50 `}>
      <Modal isOpen={showModal} onClose={closeConfirmModal}>
        <h2 className="font-bold text-xl">Are you sure?</h2>
        <p className="text-slate-600 my-4">
          Do you want to delete the address!
        </p>

        <div className="flex justify-start mt-8">
          <button
            className="px-4 py-2 border border-admin-primary text-cyan-500 hover:cursor-pointer rounded-md min-w-[100px]"
            onClick={closeConfirmModal}
          >
            No
          </button>{" "}
          &nbsp;&nbsp;
          <button
            className="px-4 py-1 bg-admin-primary text-white hover:cursor-pointer rounded-md min-w-[140px]"
            onClick={deleteHandler}
          >
            Yes
          </button>
        </div>
      </Modal>
      <div className="flex justify-between items-center">
        <div className="flex items-center pb-2">
          <h3 className="font-bold text-admin-primary text-md">
            Delivery Addresses{" "}
          </h3>
          {selectedDeliveryAddress.addressId ? (
            <img src="/check.svg" className="h-6 w-auto ml-4" />
          ) : null}
        </div>
        <div className="flex">
          <p
            className="bg-slate-200 rounded-full p-2  text-xs hover:cursor-pointer hover:font-semibold"
            onClick={showAddressListHandler}
          >
            Change Address
            {/* <MdDeleteForever className="text-gray-500 text-xl " /> */}
          </p>{" "}
        </div>
      </div>
      <p className="font-semibold  capitalize">{address.name} </p>{" "}
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
      {!selectedDeliveryAddress || !selectedDeliveryAddress.addressId ? (
        <button
          // type="button"
          className="my-2 bg-admin-primary text-white rounded-sm px-4 py-2"
          onClick={() => {
            dispatch(setSelectedAddressForDelivery(address));
          }}
        >
          Deliver Here
        </button>
      ) : null}
    </div>
  );
};

export default DefaultAddressCard;
