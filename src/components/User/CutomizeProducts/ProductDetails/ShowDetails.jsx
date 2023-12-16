import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { GET_PRODUCTS } from "@/api/Api";

const ShowDetails = () => {
  const [product, setProduct] = useState([]);
  const { productId } = useRouter().query;
  const router = useRouter();
  //fetch user customized products
  useEffect(() => {
    axios({
      method: "GET",
      url: `${GET_PRODUCTS}?filterKey=_id&filterValue=${productId}`,
    })
      .then((res) => {
        console.log("first", res.data.products);
        setProduct(res.data.products);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [productId]);
  return (
    <div>
      <div className="mr-auto ">
        <btn
          className="btn float-right mr-2 mt-2 "
          onClick={() => router.back()}
        >
          Back
        </btn>
      </div>
      <div className="grid grid-cols-2 gap-2 p-2 clear-both">
        {product.map((data) => {
          const { image } = data;
          return image.map((img) => (
            <img src={img} alt="img" className="w-full h-auto rounded-sm" />
          ));
        })}
      </div>
    </div>
  );
};

export default ShowDetails;
