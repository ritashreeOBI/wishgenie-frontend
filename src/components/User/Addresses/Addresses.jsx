import Router from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "./AddressCard";
import {
  getUserAddresses,
  setSelectedAddress,
} from "@/redux/slice/user/userAddressSlice";
import AddAddress from "./AddAddress";
import EditAddress from "./EditAddress";

const Addresses = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { loggedIn, isLoading } = useSelector((state) => state.userAuthSlice);
  const { addresses, loadingAddress, selectedAddress } = useSelector(
    (state) => state.userAddressSlice
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUserAddresses());
  }, []);
  React.useEffect(() => {
    if (!loggedIn && !isLoading) {
      return Router.back();
    }
  }, [loggedIn, isLoading]);

  if (isLoading || loadingAddress) {
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
        <h3 className="font-bold">My Addresses </h3>
      </div>
      <hr className="my-2" />
      <div>
        {!addresses || addresses.length === 0 ? <AddAddress /> : null}

        {showAddressForm ? (
          <AddAddress
            showForm={showAddressForm}
            onFormClose={() => setShowAddressForm(false)}
          />
        ) : addresses && addresses.length > 0 ? (
          <div
            className="border rounded-xl p-3 my-4 shadow-sm w-auto text-blue-500 hover:cursor-pointer"
            onClick={() => {
              setShowAddressForm(true);
              if (selectedAddress.addressId) {
                dispatch(setSelectedAddress({}));
              }
            }}
          >
            Add A New Address
          </div>
        ) : null}

        {selectedAddress.addressId && (
          <EditAddress onFormClose={() => dispatch(setSelectedAddress({}))} />
        )}

        {addresses.map((address) => (
          <AddressCard key={address.addressId} address={address} />
        ))}
      </div>
    </div>
  );
};

export default Addresses;
