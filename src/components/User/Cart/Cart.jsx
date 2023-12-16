import React from "react";
import PriceDetails from "./PriceDetails";

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
  const [cartData, setCartData] = React.useState(CARTDATA);
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

  return (
    <div className="grid grid-cols-4 gap-4 ">
      <div className="col-span-3 bg-white rounded-md ">
        <div className="flex border-b py-3 text-2xl text-slate-700 font-semibold pl-4">
          Shopping Cart
        </div>
        <div className="px-8 py-2">
          {cartData.map((item) => (
            <div key={item.id} className="flex border-b py-2 my-1">
              <div className="h-32 w-36">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full rounded-md"
                />
              </div>

              <div className="ml-3 w-full ">
                <p className="text-[20px] text-slate-700 capitalize mb-1">
                  {item.name}
                </p>
                <div className="flex mb-3">
                  <span className="mt-[1px]">$</span>
                  <p className="font-semibold text-slate-800 text-[19px] capitalize">
                    {item.price}
                  </p>
                </div>

                <div className="flex ">
                  <div className="w-6/12">
                    <div className="flex">
                      <span className="">Size:</span> &nbsp;
                      <p className="font-semibold text-slate-800  capitalize">
                        {item.size}
                      </p>
                    </div>{" "}
                    <div className="flex">
                      <span className="">Color:</span> &nbsp;
                      <p className="font-semibold text-slate-800  capitalize">
                        {item.color}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center my-2">
                      <span
                        className="border border-red-300 rounded-full py-[3px]  px-2 hover:cursor-pointer hover:bg-red-200 hover:font-semibold "
                        onClick={() => decreaseCartItem(item.id, item.qty)}
                      >
                        -
                      </span>
                      <span className="w-12 text-center">{item.qty}</span>
                      <span
                        className="border border-green-300 rounded-full px-2 py-[3px] hover:cursor-pointer hover:bg-green-200 hover:font-semibold"
                        onClick={() => increaseCartItem(item.id)}
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>
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
