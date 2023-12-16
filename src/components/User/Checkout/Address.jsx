import React, { useEffect, useState } from "react";
import DefaultAddressCard from "./DefaultAddressCard";
import CheckoutAddressesList from "./CheckoutAddressesList";

const Address = ({ selectedDeliveryAddress, addresses }) => {
  const [showFullAddressList, setShowFullAddressList] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const showAddressListHandler = () => {
    setShowFullAddressList(true);
  };
  const hideAddressListHandler = () => {
    setShowFullAddressList(false);
  };

  // find the default selected address from the addesses list
  useEffect(() => {
    const index = addresses.findIndex((address) => address.defaultAddress);
    if (index > -1) {
      setDefaultAddress(addresses[index]);
    }
  }, [addresses]);

  return (
    <div
      className={`mt-32 mx-0 sm:mx-4 md:mx-8  py-2 ${
        !selectedDeliveryAddress.addressId ? "min-h-[500px]" : ""
      }`}
    >
      {selectedDeliveryAddress &&
      selectedDeliveryAddress.addressId &&
      !showFullAddressList ? (
        <DefaultAddressCard
          address={selectedDeliveryAddress}
          showAddressListHandler={showAddressListHandler}
          hideAddressListHandler={hideAddressListHandler}
        />
      ) : defaultAddress && !showFullAddressList ? (
        <DefaultAddressCard
          address={defaultAddress}
          showAddressListHandler={showAddressListHandler}
          hideAddressListHandler={hideAddressListHandler}
        />
      ) : (
        <CheckoutAddressesList
          hideAddressListHandler={hideAddressListHandler}
        />
      )}
    </div>
  );
};

export default Address;
