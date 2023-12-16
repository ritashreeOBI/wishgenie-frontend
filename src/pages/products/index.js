import React, { useEffect, useRef, useState } from "react";
// importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import Productlist from "@/components/shared-components/product-list/Productlist";
import { useDispatch, useSelector, useStore } from "react-redux";
import CardSkeleton from "@/components/shared-components/skeleton/CardSkeleton";
import {
  changeChatMessageing,
  hideChatBox,
  showChatBox,
} from "@/redux/slice/chatInteraction";
import { toast } from "react-toastify";
import { SHOPPING_RESULT, optionAPI, printFullApi } from "@/api/Api";

function Products() {

  const productListRef = useRef();
  const dispatch = useDispatch();

  const {
    keyword,
    uploadImageStatus,
    chatMessageing,
  } = useSelector((state) => state.chatInteraction);
  const { category } = useSelector((state) => state.ProductList);

  const [productsList, setProducts] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [apiStatus, setApistatus] = useState(true);
  const [errorResponse, setErrorResponse] = useState("");

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const elem = document.getElementById("productContainer");
    elem.addEventListener(
      "scroll",
      () => {
        if (elem.scrollTop > 400) {
          //hide chat component when scroll more than 400
          dispatch(hideChatBox());
        }
        if (elem.scrollTop < 400) {
          dispatch(showChatBox());
        }
      },
      { passive: true }
    );
  }, []);

  const getProduct = async () => {
    if (keyword != "") {
      setLoading(true);
      try {
        const chatType = localStorage.getItem("cType");
        if (chatType === "image") {
          console.log("chatType", chatType);
          const apiResponse = await axios.post(optionAPI, {
            object: localStorage.getItem("query"),
            image_id: localStorage.getItem("uploadedID"),
          });
          console.log("apiResponse", apiResponse);
          const { response, status, shopping_results , custom_results } = apiResponse.data;
          console.log("response", response);
          const custom_products = custom_results?.main_data
          setProducts(
            shopping_results ? [ ...custom_products,...shopping_results ]: response.visual_matches
          );

          setApistatus(status);
          if (status === false) {
            setErrorResponse(response);
          }
          setLoading(false);
        } else {
          const  {data } = await axios.post(SHOPPING_RESULT, {
            query: localStorage.getItem("query"),
          });
          const { response, status } = data;
         
          console.log(data?.shopping_results)
          console.log(data)
          const custom_products = data?.custom_results?.main_data
          const shopping_results = data?.shopping_results
          setProducts(
            data?.shopping_results ? [...custom_products ,...shopping_results] : data.response.visual_matches
          );
          setApistatus(status);
          if (status === false) {
            setErrorResponse(response);
          }
          setLoading(false);
        }
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    } 
    else 
    {
      try {
        const api = localStorage.getItem("api");
        const query = localStorage.getItem("query");
        // image keyword matching api
        if (api.includes("shoppingLinks")) {
          if (!uploadImageStatus) {
            console.log("four");
            // if image upload from chat uploader button form than won't call api
            setLoading(true);
            setApistatus(true);
            const { data } = await axios.post(api, {
              query: query,
              image_id: localStorage.getItem("uploadedID"),
            });
            const { response, status } = data;
            console.log("data", data);
            setApistatus(status);
            if (status) {
              setProducts(response.shopping_results || response.visual_matches);
            } else {
              setErrorResponse(response);
            }
            setLoading(false);
          }
        } else {
          // input keyword matching api
          if (!chatMessageing) {
            console.log("five");
            //if not chating text available
            setLoading(true);
            const { data } = await axios.post(api, { query: query });

            setProducts(data.shopping_results || data.visual_matches);

            setLoading(false);
            dispatch(changeChatMessageing(false));
          }
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getProduct();
  }, [keyword]);

  const getCustomProducts = async () => {
    axios.get(`${printFullApi}/products`, {
      params: {
        "category_id": category
      }
    })
      .then(response => {
        // Handle the success response here
        console.log('Response:', response.data);
        if (response.data.code === 200) {
          const productsWithPrice = response.data.result.map(product => {
            return {
              ...product,
              store_rating: Math.floor(Math.random() * 6),
              store_review: Math.floor(Math.random() * 1000),
            }
          });

          setProducts(productsWithPrice);
        }
      })
      .catch(error => {
        // Handle any errors that occurred during the POST request
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    getCustomProducts();
  }, [category]);

  console.log('category', category);
  console.log('productsList', productsList);

  useEffect(() => {
    if (apiStatus === false) {
      toast.warn(errorResponse);
    }
  }, [apiStatus]);

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      className="flex  relative top-28 "
    >
      {isloading ? (
        <div className="productList flex grid grid-cols-3 px-12 gap-12 grow pb-60">
          <div className="dum" />
          <div className="dum" />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <div
          className=" product  h-[1100px] overflow-scroll mb-32 pb-10 "
          id="productContainer"
        >
          {/* {apiStatus === false ? <Alert /> : null} */}
          <div
            ref={productListRef}
            className="productList grid grid-cols-3 px-12 flex  flex-wrap grow gap-4 self-auto gap-y-[20px]  z-10"
          >
            <div className="dum" />
            <div className="dum" />
            <Productlist list={productsList} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
