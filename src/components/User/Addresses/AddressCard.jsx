import Modal from "@/components/shared-components/Modal/Modal";
import {
  deleteUserAddress,
  getUserAddresses,
  setDetaultAddress,
  setSelectedAddress,
} from "@/redux/slice/user/userAddressSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
const AddressCard = ({ address }) => {
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
      className={`border rounded-xl p-3 my-4 shadow-sm w-auto ${
        address.defaultAddress ? "border-admin-primary border-2" : ""
      }`}
    >
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
        <div className="flex items-center">
          <p className="font-semibold text-slate-600 capitalize text-sm">
            {address.type}{" "}
          </p>{" "}
          {address.defaultAddress ? (
            <p className="bg-admin-primary text-white text-[10px] ml-12 px-1 py-[2px] rounded-sm">
              Default
            </p>
          ) : (
            <button
              className="ml-12 text-blue-400 text-sm hover:font-semibold"
              onClick={setDefaultHandler}
            >
              Set Default
            </button>
          )}
        </div>
        <div className="flex">
          <p
            className="bg-slate-200 rounded-full p-1 hover:cursor-pointer "
            onClick={() => setShowModal(true)}
          >
            <MdDeleteForever className="text-gray-500 text-xl " />
          </p>{" "}
          &nbsp; &nbsp;
          <p
            className="bg-blue-200 rounded-full p-1 hover:cursor-pointer"
            onClick={() => dispatch(setSelectedAddress(address))}
          >
            <MdEdit className="text-admin-primary text-xl " />
          </p>
        </div>
      </div>
      <p className="font-semibold  capitalize">{address.name} </p>{" "}
      <p className="my-1">
        {address.street},&nbsp;{address.city},&nbsp;{address.state}&nbsp;-{" "}
        {address.zipcode}
      </p>
      <p>{address.phone}</p>
      <p></p>
    </div>
  );
};

export default AddressCard;
