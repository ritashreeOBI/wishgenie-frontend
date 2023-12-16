import "regenerator-runtime";

import { IMAGE_SEARCH, PREDICTION, optionAPI } from "@/api/Api";
import {
  ChatActionFailed,
  ChatActionInitiated,
  ChatActionResult,
  changeChatMessageing,
  displayPastedImage,
  hidePastedImage,
  showChatBox,
} from "@/redux/slice/chatInteraction";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsMic } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import styles from "./chatmodal.module.css";
import { nanoid } from "nanoid";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function extractHttpFromString(str) {
  // Regular expression pattern to match the HTTP URL
  var pattern = /(https:\/\/[\w.-]+(:\d+)?\/api\/[\w\/.-]+)/i;

  // Extract the HTTP URL using match() method and the pattern
  var matches = str.match(pattern);

  if (matches && matches.length > 0) {
    // Return the first match found
    return matches[0];
  } else {
    // Return an empty string if no match is found
    return "";
  }
}

function ChatFotter() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);
  const { showPastedImage } = useSelector((state) => state.chatInteraction);
  const { loggedIn, user } = useSelector((state) => state.userAuthSlice);

  const [Query, setQuery] = useState({
    message: "",
    user: true,
    api: "",
    action: false,
    keyword: "",
  });

  // SpeechRecognition
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      return alert(`Browser doesn't support speech recognition.`);
    }
  }, []);

  const sendMessage = async (e) => {
    // e.preventDefault();
    dispatch(changeChatMessageing(true));
    if (Query.message !== "") {
      dispatch(ChatActionResult(Query));
      dispatch(ChatActionInitiated());
      setQuery((pre) => {
        return {
          ...pre,
          message: "",
        };
      });
      //storing the user query in localstorage
      let messageQueue = localStorage.getItem("messageQueue");
      messageQueue = JSON.parse(messageQueue);
      if (messageQueue) {
        messageQueue.push(Query);
        localStorage.setItem("messageQueue", JSON.stringify(messageQueue));
      } else {
        localStorage.setItem("messageQueue", JSON.stringify([Query]));
      }

      try {
        let chatUserId = localStorage.getItem("chatUserId");
        if (loggedIn) {
          chatUserId = user.email.toString();
        }

        let messageBody = {};

        if (chatUserId === "empty" || chatUserId === null) {
          chatUserId = nanoid(); //create a unique userId
          // localStorage.setItem("chatUserId", btoa(chatUserId)); //encrypt
          localStorage.setItem("chatUserId", chatUserId); //encrypt
        }
        messageBody.query = Query.message;
        messageBody.user_id = chatUserId;
        const { data } = await axios.post(
          PREDICTION,
          messageBody
          // { query: Query.message, user_id: chatUserId }
        );

        

        let messageResponse = data?.response?.response;
        let message = messageResponse;

        // let message = getTextAfterSpecificText(
        //   messageResponse,
        //   "Final Answer:"
        // );

        console.log("message", message);
        //const keywordResult = data?.response?.split(",");
        let keyword = data?.response?.query != "None" && data?.response?.query || "";

        if (keyword != "") {
          localStorage.setItem("cType", "text");
          localStorage.setItem("query", keyword);
          dispatch(showChatBox());
          router.push("/products");
        }

        const newMessageObj = {
          message: message,
          user: false,
          api: "",
          keyword: keyword,
          // keyword: { query: keywordResult[keywordResult.length - 1] },
          action: false,
          features: data.object && true,
          featureList: data?.object,
        };
        // console.log(message, keyword);

        dispatch(ChatActionResult(newMessageObj));

        //storing the incoming api response in localStorage
        let messageQueue = localStorage.getItem("messageQueue");
        messageQueue = JSON.parse(messageQueue);
        if (messageQueue) {
          messageQueue.push(newMessageObj);
          localStorage.setItem("messageQueue", JSON.stringify(messageQueue));
        } else {
          localStorage.setItem("messageQueue", JSON.stringify([newMessageObj]));
        }
      } catch (error) {
        console.log(error);
        dispatch(ChatActionFailed());
      }
    }
  };

  // Handle mic recongintion
  useEffect(() => {
    if (listening) {
      setQuery((pre) => {
        return {
          ...pre,
          message: transcript,
        };
      });
    }
    if (!listening && transcript) {
      sendMessage();
    }
  }, [listening, transcript]);

  //function to display paste image
  const pasteHandler = (evt) => {
    const clipboardItems = evt.clipboardData.items;
    const items = [].slice.call(clipboardItems).filter(function (item) {
      // Filter the image items only
      return item.type.indexOf("image") !== -1;
    });
    if (items.length === 0) {
      return;
    }

    const item = items[0];
    // Get the blob of image
    const blob = item.getAsFile();

    dispatch(displayPastedImage()); //hide image if already pasted
    const imgElm = document.getElementById("preview");
    imgElm.src = URL.createObjectURL(blob);
    imgElm.style.width = "100%";
    imgElm.style.height = "300px";
    imgElm.style.zIndex = 10;

    setImageFile(blob);
  };

  const imageSearchHandler = () => {
    try {
      dispatch(
        ChatActionResult({
          message: "",
          user: true,
          api: "",
          action: false,
          keyword: "",
          upload: true,
        })
      );
      dispatch(ChatActionInitiated());
      dispatch(hidePastedImage());
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = async () => {
        const base64Image = reader.result.split(",")[1];
        const { data } = await axios.post(IMAGE_SEARCH, { image: base64Image });
        localStorage.setItem("uploadedID", data.image_id);
        localStorage.setItem("api", optionAPI);
        localStorage.setItem("cType", "image");
        //storing the user query in localstorage
        let messageQueueUser = localStorage.getItem("messageQueue");
        messageQueueUser = JSON.parse(messageQueueUser);
        if (messageQueueUser) {
          messageQueueUser.push({
            ...Query,
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
                ...Query,
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
          localStorage.setItem("messageQueue", JSON.stringify([newMessageObj]));
        }
      };
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="w-full  flex items-start justify-between pl-4 pr-2 h-full py-2 gap-2 "
      >
        <div className=" items-start flex w-[90%] gap-2 justify-between  ">
          <textarea
            // type="text"
            onPaste={pasteHandler}
            placeholder="What do you want from Genie?"
            value={Query.message}
            onChange={(e) =>
              setQuery((pre) => {
                return {
                  ...pre,
                  message: e.target.value,
                };
              })
            }
            className=" p-2 border-b border-[#d1d5db] h-[40px]  text-sm bg-transparent focus:outline-none w-[95%] "
          />

          {/* ON MIC BUTTON CLICK */}
          <BsMic
            className={listening ? styles.animatedMic : styles.mic}
            onClick={
              !listening
                ? SpeechRecognition.startListening
                : SpeechRecognition.stopListening
            }
          />
        </div>
        <div className="flex items-center px-1 justify-center">
          <div
            className="flex items-center justify-center rounded-full text-white p-2 drop-3 cursor-pointer"
            style={{
              background:
                "linear-gradient(149deg, rgba(13,114,179,1) 11%, rgba(24,163,215,1) 97%)",
            }}
            onClick={sendMessage}
          >
            <IoSend className="text-xl " />
          </div>
        </div>{" "}
      </form>

      {/* // container to display paste image */}
      <div
        className={
          showPastedImage
            ? "block absolute bottom-[74px] p-3 rounded-3xl w-full"
            : "hidden absolute bottom-[74px] p-3 rounded-3xl w-full"
        }
        id="previewImgContainer"
      >
        <div className="absolute right-6 bottom-[60%] flex flex-col justify-end place-items-end bg-[#1c1c1c29] p-2 rounded-2xl ">
          {/* //image close icon */}
          <AiFillCloseCircle
            className="text-[39px] mb-2 mr-[3px] text-gray-600 hover:cursor-pointer hover:text-gray-800"
            onClick={() => {
              dispatch(hidePastedImage());
            }}
          />
          {/* // image search icon */}
          <div className="flex items-center px-1 justify-center">
            <div
              className="flex items-center justify-center rounded-full text-white p-2 drop-3 cursor-pointer"
              style={{
                background:
                  "linear-gradient(149deg, rgba(13,114,179,1) 11%, rgba(24,163,215,1) 97%)",
              }}
              onClick={imageSearchHandler}
            >
              <IoSend className="text-xl " />
            </div>
          </div>
        </div>
        {/* // to display image on paste */}
        <img id="preview" className="rounded-md" />
      </div>
    </>
  );
}

export default ChatFotter;

function getTextAfterSpecificText(text, specificText) {
  var startIndex = text.indexOf(specificText);

  if (startIndex === -1) {
    return ""; // specificText not found in the text
  }

  startIndex += specificText.length; // move the index after the specificText
  var result = text.substring(startIndex);

  return result;
}
