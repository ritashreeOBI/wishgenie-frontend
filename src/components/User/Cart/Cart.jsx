import React, { useEffect, useState } from "react";
import PriceDetails from "./PriceDetails";
import { sentenceCase } from "sentence-case";
import { GET_CART_PRODUCTS } from "@/api/Api";
import axios from "axios";

const CARTDATA = [
  {
    id: 100,
    name: "Levi's Men's Slim Jeans (18298-1234_Dark Indigo_32)",
    size: "M",
    color: "Blue",
    price: 99,
    qty: 1,
    image:
      "https://st2.depositphotos.com/1987851/6621/i/450/depositphotos_66216685-stock-photo-mans-legs.jpg",
  },
  {
    id: 102,
    name: "WILD MODA Womania Shoulder and Tote Bag For Ladies (Red)",
    size: "M",
    color: "Red",
    price: 199,
    qty: 1,
    image:
      "https://st2.depositphotos.com/3280027/7348/i/450/depositphotos_73488881-stock-photo-chic-red-handbag.jpg",
  },
  {
    id: 103,
    name: "HAMMONDS FLYCATCHER Genuine NDM Leather Ladies Handbag|WB3002V Women",
    size: "L",
    color: "Red",
    price: 109,
    qty: 1,
    image:
      "https://static8.depositphotos.com/1258191/903/i/450/depositphotos_9032676-stock-photo-woman-sexy-legs-with-handbag.jpg",
  },
  {
    id: 104,
    name: "Fire-Boltt Phoenix Smart Watch with Bluetooth Calling 1.3",
    size: "L",
    color: "Silver",
    price: 140,
    qty: 1,
    image:
      "https://st.depositphotos.com/3230977/4235/i/450/depositphotos_42354059-stock-photo-man-with-suit-and-watch.jpg",
  },
  {
    id: 105,
    name: "Item 5",
    size: "M",
    color: "Blue,Red",
    price: 120,
    qty: 1,
    image:
      "https://st2.depositphotos.com/4720955/8101/i/450/depositphotos_81014300-stock-photo-beautiful-and-fashion-young-woman.jpg",
  },
  {
    id: 106,
    name: "OPHELIA Open Toe Block Heels",
    size: "L",
    color: "White",
    price: 135,
    qty: 1,
    image:
      "https://st3.depositphotos.com/4278641/14215/i/450/depositphotos_142155498-stock-photo-womens-high-heeled-shoes.jpg",
  },
];

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const increaseCartItem = (id) => {
    const updatedData = cartData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          qty: item.qty + 1,
        };
      } else return item;
    });
    setCartData(updatedData);
  };
  const decreaseCartItem = (id, qty) => {
    if (qty > 1) {
      const updatedData = cartData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            qty: item.qty - 1,
          };
        } else return item;
      });
      setCartData(updatedData);
    } else {
      const updatedData = cartData.filter((item) => item.id !== id);
      setCartData(updatedData);
    }
  };

  const getCartProducts = async () =>{
    try {
      const customerID = localStorage.getItem('u_id')
      const {data}  = await axios.get(`${GET_CART_PRODUCTS}?custommerID=${customerID}`)
      console.log(data)
      setCartData(data?.result)
    } catch (error) {
      console.log(error?.message)
    }
  }
  useEffect(() =>{
      getCartProducts()
  },[])

  return (
    <div className="grid grid-cols-4 gap-4 ">
      <div className="col-span-3 bg-white rounded-md ">
        <div className="flex border-b py-3 text-2xl text-slate-700 font-semibold pl-4">
          <p className="text-center ">Your Cart</p>
        </div>

        <div className="grid grid-cols-10  font-bold opacity-60 text-sm py-4 px-10 text-center">
          <p className="col-span-6 w-full text-start">Product Detail</p>
          <p className="col-span-1 text-start ">Price</p>
          <p className="col-span-2">Quantity</p>
          <p className="col-span-1 text-start">Total Price</p>
        </div>
        <div className="px-8 py-2 w-full flex flex-col  gap-2 ">
          {cartData.map((item) => (
            <div
              key={item.id}
              className=" w-full items-center border p-2 rounded-md  grid grid-cols-10 gap-4 py-2 "
            >
              <div className=" col-span-2">
                <img
                  src={item.thumbnails}
                  alt={'product'}
                  className="w-full h-full rounded-md"
                />
              </div>

              <div className="col-span-4 spacing-4 flex flex-col gap-4">
                <p className="  text-xl font-bold text-slate-700 capitalize mb-1">
                  {sentenceCase(item?.title)}
                </p>
                <div className="  text-sm  spacing-4">
                  <div className="flex">
                    <span className="opacity-50">Size:</span> &nbsp;
                    <p className="font-semibold text-slate-800 opacity-80 capitalize">
                      {item?.productSize}
                    </p>
                  </div>{" "}
                </div>
                <p className="text-sm">Delivery Charge- ${10}</p>
                 <div className="w-10 h-10 rounded-md" style={{background:item?.colorCode}}>
                  </div>
              </div>
              <div className="flex grid-span-1 mb-3 text-sm ">
                <span className="">$</span>
                <p className="font-semibold text-slate-800  capitalize">
                  {parseInt(item?.sellingPrice)}
                </p>
              </div>

              <div className="col-span-2  flex items-center ">
                <span
                  className="border-2 text-xl font-bold border-red-300 px-2  rounded-full py-0 hover:cursor-pointer hover:bg-red-200 hover:font-semibold "
                  onClick={() => decreaseCartItem(item.id, item.qty)}
                >
                  -
                </span>
                <span className="w-12 text-center">{item.qty}</span>
                <span
                  className="border-2 border-green-300 text-xl font-bold rounded-full px-2 py-[0 hover:cursor-pointer hover:bg-green-200 hover:font-semibold"
                  onClick={() => increaseCartItem(item.id)}
                >
                  +
                </span>
              </div>

              <div className="flex grid-span-1 mb-3 text-sm ">
                <span className="">$</span>
                <p className="font-semibold text-slate-800  capitalize">
                  {item?.sellingPrice * item.qty}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1">
        <PriceDetails data={cartData} />
      </div>
    </div>
  );
};

export default Cart;
