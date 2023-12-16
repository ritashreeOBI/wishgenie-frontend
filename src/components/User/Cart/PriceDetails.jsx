import React from "react";

const PriceDetails = ({ data }) => {
  let productCount = 0;
  let price = 0;
  const deliveryFee = 50;
  data.forEach((product) => {
    productCount = productCount + product.qty;
    price = price + product.qty * product.price;
  });
  return (
    <div className="w-full max-w-sm rounded-md shadow-md bg-white sticky top-[20px]">
      <p className="px-6 py-3 text-slate-500 border-b font-semibold">
        Price Details
      </p>
      <div className="py-4 px-6">
        <div className="flex justify-between">
          <p>Price ({productCount} items)</p>
          <p>${price}</p>
        </div>
        <div className="flex justify-between py-3 border-b">
          <p>Delivery Fee </p>
          <p>${deliveryFee}</p>
        </div>
        <div className="flex justify-between py-3 font-semibold">
          <p>Total Payable</p>
          <p>${deliveryFee + price}</p>
        </div>
      </div>
      <div className="mx-8  px-16 py-3 bg-amber-400 rounded-md text-base text-center  text-white hover:cursor-pointer">
        Proceed to Buy
      </div>
      <br />
    </div>
  );
};

export default PriceDetails;
