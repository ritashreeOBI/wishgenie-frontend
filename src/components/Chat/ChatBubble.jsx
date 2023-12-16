import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiFileUploadLine } from "react-icons/ri";
import Link from "next/link";
import {
  clearProductList,
  pendingRunning,
  pendingStop,
  setKeyword,
  updateProductList,
} from "@/redux/slice/chatInteraction";
import axios from "axios";
import { optionAPI } from "@/api/Api";

function ChatBubble({ data, user, action, features, featureList, upload }) {
  const dispatch = useDispatch();
  const updatedFeatureList = [...new Set(featureList)]
  // console.log('newList', newList)
  const { api, keyword } = useSelector((state) => state.chatInteraction);

  const getProduct = async (api, req) => {
    dispatch(clearProductList());

    try {
      const { data } = await axios.post(api, req);

      dispatch(
        updateProductList({
          product: data.shopping_results || data.visual_matches,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getProduct = async (api, req) => {
      dispatch(clearProductList());

      try {
        const { data } = await axios.post(api, req);

        dispatch(
          updateProductList({
            product: data.shopping_results || data.visual_matches,
          })
        );
      } catch (error) {
        console.log(error.message);
      }
    };
  }, []);

  return (
    <div className="px-3">
      <div
        className={`chat  ${user ? "chat-end" : "chat-start"
          } relative flex flex-col gap-2 py-3 pt-6 `}
      >
        {!user ? (
          <Image
            src="/unnamed.png"
            width={40}
            height={40}
            className="chat-icon absolute -top-1 -left-4 "
            alt="genie"
          />
        ) : (
          ""
        )}
        <div
          className={`flex message flex-col max-w-[95%] rounded-lg shadow-md overflow-hidden`}
        >
          {data && (
            <div
              className={`${user ? "bg-sky-200" : "bg-slate-200"
                } message p-4 py-2 text-sm text-left`}
            >
              {data}
            </div>
          )}

          {action ? (
            <div className="flex flex-col  items-center">
              <Link
                href="/products"
                className={`border-x  p-2 text-sky-700 text-center w-full cursor-pointer `}
                id="product-list"
                onClick={() => getProduct(api, { query: keyword })}
              >
                Find Available Product
              </Link>

              <div
                className={` border p-2  text-sky-700 text-center w-full rounded-b-lg border-t-none cursor-pointer  `}
                id="custom"
              >
                Create Your Own
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {upload ? (
          <div className="p-2 px-4 text-xs text-white rounded-md bg-sky-400 w-fit flex gap-2 items-center">
            <RiFileUploadLine className="text-lg" />
            Image Uploaded Successfully
          </div>
        ) : (
          ""
        )}
      </div>

      {features ? (
        <div className="flex gap-2 flex-wrap">
          {updatedFeatureList.map((list, idx) => {
            return (
              <Link
                href="/products"
                key={idx}
                onClick={() => {
                  localStorage.setItem("query", list);
                  dispatch(
                    setKeyword({
                      keyword: {
                        image_id: localStorage.getItem("uploadedID"),
                        query: list,
                      },
                    })
                  );
                }}
                className="btn border-none text-black hover:text-white hover:bg-sky-700 p-2 px-4 bg-sky-100 rounded-full"
              >
                {list}
              </Link>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ChatBubble;
