import CheckoutAddressesList from "@/components/User/Checkout/CheckoutAddressesList";
import DefaultAddressCard from "@/components/User/Checkout/DefaultAddressCard";
import { getUserAddresses } from "@/store/slices/user/userAddressSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Address from "@/components/User/Checkout/Address";
import ProductPreview from "@/components/User/Checkout/ProductPreview";
import Payment from "@/components/User/Cart/Payment";

const CheckoutIndex = () => {
  const { addresses, loadingAddress, selectedDeliveryAddress } = useSelector(
    (state) => state.userAddressSlice
  );
  const { cartList } = useSelector((state) => state.cartSlice);
  const [showPayment, setShowPayment] = useState(false);
  const { loggedIn, isLoading } = useSelector((state) => state.userAuthSlice);
  const dispatch = useDispatch();

  // check if user is logged in or not
  React.useEffect(() => {
    if (!loggedIn && !isLoading) {
      return Router.back();
    }
  }, [loggedIn, isLoading]);

  // fetch user addresses
  React.useEffect(() => {
    dispatch(getUserAddresses());
  }, []);

  const showPaymentHandler = () => {
    setShowPayment(true);
  };
  const closePaymentHandler = () => {
    setShowPayment(false);
  };

  if (loadingAddress) {
    return (
      <div className="mt-32 h-screen container">
        <p className="text-center font-bold text-zinc-600 text-2xl mt-14">
          Loading...
        </p>
      </div>
    );
  } else {
    return (
      <>
        <Address
          selectedDeliveryAddress={selectedDeliveryAddress}
          addresses={addresses}
        />
        {selectedDeliveryAddress.addressId ? (
          <ProductPreview
            showPaymentHandler={showPaymentHandler}
            showPayment={showPayment}
          />
        ) : null}
        {showPayment ? <Payment /> : null}
      </>
    );
  }
};

export default CheckoutIndex;
