import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAddress } from "@/store/slices/user/userAddressSlice";
import AddAddress from "../Addresses/AddAddress";
import EditAddress from "../Addresses/EditAddress";
import CheckoutAddressCard from "../Addresses/CheckoutAddressCard";

const CheckoutAddressesList = ({ hideAddressListHandler }) => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { addresses, selectedAddress } = useSelector(
    (state) => state.userAddressSlice
  );
  const dispatch = useDispatch();

  return (
    <div className="bg-slate-50 p-4 shadow  rounded-3xl min-h-[300px]">
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
          <CheckoutAddressCard
            key={address.addressId}
            address={address}
            hideAddressListHandler={hideAddressListHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckoutAddressesList;
