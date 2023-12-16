import { GET_PRODUCTS } from "@/api/Api";
import { Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ListProducts = () => {
  const { user } = useSelector((state) => state.userAuthSlice);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  //fetch user customized products
  useEffect(() => {
    if (user.userId) {
      axios({
        method: "GET",
        url: `${GET_PRODUCTS}?filterKey=userId&filterValue=${user.userId}`,
      })
        .then((res) => {
          console.log("first", res.data.products);
          setProducts(res.data.products);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [user.userId]);

  return (
    <div className="flex justify-between  flex-wrap min-h-[300px]">
      {products.map((product, i) => (
        <div
          className="card w-40 md:w-96 bg-base-100 shadow-xl mb-4 hover:shadow-2xl hover:scale-[1.01] transition-all"
          key={product._id}
        >
          <figure>
            <img
              className="w-full h-60"
              src={product?.image ? product?.image[0] : ""}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Item {i + 1}</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              doloremque
            </p>
            <div className="card-actions justify-center mt-2">
              <button
                className="btn  text-white"
                onClick={() =>
                  router.push(`/account/customize-products/${product._id}`)
                }
              >
                Continue Customize
              </button>
            </div>
          </div>
        </div>
      ))}
       <Text textAlign={'center'} width={'full'} my={8}>No Draft found</Text>
    </div>
  );
};

export default ListProducts;
