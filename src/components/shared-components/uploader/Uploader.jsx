import { IMAGE_SEARCH, optionAPI } from "@/api/Api";
import {
  ChatActionInitiated,
  ChatActionResult,
  changeUploadImageStatus,
  hidePastedImage,
} from "@/redux/slice/chatInteraction";
import axios from "axios";
import FormData from "form-data";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

function Uploader() {
  const [uploadedImage, setUploadImage] = useState({
    message: "",
    user: true,
    api: "",
    action: false,
    keyword: "",
    upload: true,
  });
  // console.log("optionAPI", optionAPI);
  const dispatch = useDispatch();

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(changeUploadImageStatus(true));
      localStorage.removeItem("query"); //remove keyword query if exists from paste image
      dispatch(hidePastedImage()); //hide image if already pasted
      dispatch(ChatActionResult(uploadedImage));
      dispatch(ChatActionInitiated());
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const base64Image = reader.result.split(",")[1];

          const { data } = await axios.post(IMAGE_SEARCH, {
            image: base64Image,
          });

          //storing the user query in localstorage
          let messageQueueUser = localStorage.getItem("messageQueue");
          messageQueueUser = JSON.parse(messageQueueUser);
          if (messageQueueUser) {
            messageQueueUser.push({
              uploadedImage,
              message: "Image Uploaded Successfully",
            });
            localStorage.setItem(
              "messageQueue",
              JSON.stringify(messageQueueUser)
            );
          } else {
            localStorage.setItem(
              "messageQueue",
              JSON.stringify([
                {
                  uploadedImage,
                  message: "Image Uploaded Successfully",
                },
              ])
            );
          }

          const newMessageObj = {
            message: "Choose the catagory fron the below list",
            user: false,
            api: optionAPI,
            keyword: "",
            features: data.object && true,
            featureList: data?.object,
          };
          dispatch(ChatActionResult(newMessageObj));

          //storing the incoming api response in localStorage
          let messageQueue = localStorage.getItem("messageQueue");
          messageQueue = JSON.parse(messageQueue);
          if (messageQueue) {
            messageQueue.push(newMessageObj);
            localStorage.setItem("messageQueue", JSON.stringify(messageQueue));
          } else {
            localStorage.setItem(
              "messageQueue",
              JSON.stringify([newMessageObj])
            );
          }
          localStorage.setItem("uploadedID", data.image_id);
          localStorage.setItem("api", optionAPI);
          localStorage.setItem("cType", "image");
        };
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className=" upload flex   p-4  items-center justify-center gap-6 w-[100%] cursor-pointer"
        style={{
          backgroundImage:
            "linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
        }}
      >
        <Image src="/upl.png" width={64} height={64} alt="image-upload" />
        <p className="upload-title text-sm  font-bold w-[70%]">
          Upload an image and Wish Genie will help find what you are looking
          for.
        </p>
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </>
  );
}

export default Uploader;
