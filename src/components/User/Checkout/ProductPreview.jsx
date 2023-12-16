import { removeCartItemById } from "@/store/slices/user/cartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductPreview = ({ showPaymentHandler, showPayment }) => {
  const { cartList } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  return (
    <div className="mb-4 mx-0 sm:mx-4 md:mx-8  py-2 bg-slate-50 rounded-xl p-3">
      <h3 className="font-bold text-admin-primary text-md">Order Items</h3>
      {/* <p className="text-gray-400 uppercase my-2">Products</p> */}
      {/* <div className="max-w-screen-md mx-auto"> */}
      <table className="min-w-full  my-3 ">
        <thead>
          <tr>
            <th className="py-2 pr-1 border-b text-left text-gray-500">
              PRODUCTS
            </th>
            <th className="py-2 pr-1 border-b  text-right text-gray-500">
              QTY
            </th>
            <th className="py-2 pr-1  border-b  text-right text-gray-500">
              PRICE ($)
            </th>
            <th className="py-2 pr-1  border-b  text-right text-gray-500 ">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {cartList.map((product) => (
            <tr key={product.id}>
              <td className="py-2  pr-1 border-b text-left">
                <img
                  src={product.img}
                  className="w-auto h-20"
                  alt={`img-${product.id}`}
                />
              </td>
              <td className="py-2  pr-1 border-b text-right">{product.qty}</td>
              <td className="py-2  pr-1 border-b text-right font-semibold">
                ${product.price}
              </td>
              <td className="py-2  pr-1 border-b ">
                <img
                  src="/delete-icon.svg"
                  className="w-4 h-6 float-right hover:cursor-pointer"
                  alt="remove"
                  onClick={() => {
                    if (cartList.length > 1) {
                      dispatch(removeCartItemById(product.id));
                    }
                  }}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td className="py-2  pr-1 text-left">Total</td>
            <td className="py-2  pr-1 text-right"></td>
            <td className="py-2  pr-1 text-right font-semibold">
              $ {cartList.reduce((prev, current) => prev + current.price, 0)}
            </td>
            <td className="py-2  pr-1 "></td>
          </tr>
          {!showPayment ? (
            <tr>
              <td colSpan={4} className="w-full text-right ">
                <button
                  className="my-2 bg-admin-primary text-white rounded-sm px-10 py-2 uppercase"
                  onClick={() => {
                    if (cartList.length > 1) {
                      showPaymentHandler();
                    }
                  }}
                >
                  continue
                </button>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
      {/* </div> */}
    </div>
  );
};

export default ProductPreview;
