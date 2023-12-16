import React, { useEffect, useState } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import BannerImage from "../assets/bg-com.jpg";
import Image from "next/image";
import ChatWindow from "./Chat";
import Aos from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
import Uploader from "./shared-components/uploader/Uploader";
import ChatModal from "./Chat/ChatModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setMessageQueueFromLocalStorage,
  showChatBox,
} from "@/store/slices/chatInteraction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/layout.module.css";
import { checkAuthOnLoad } from "@/store/slices/user/userAuth";
import { unwrapResult } from "@reduxjs/toolkit";
import { checkAuthOnLoadAdmin } from "@/store/slices/admin/adminSlice";
import "react-tooltip/dist/react-tooltip.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ArtWallHeader from "./art-wall/layout/ArtWallHeader";

function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [parentScroll, setParentScroll] = useState(false);
  const { openModal, isChatVisible } = useSelector(
    (state) => state.chatInteraction
  );

  useEffect(() => {
    Aos.init();
  }, []);

  console.log(
    router.pathname === `/products/[productID]/customize`,
    router.pathname,
    router.query.productID
  );

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 160) {
        //hide chat component when scroll more than 400
        setParentScroll(true);
      }
      if (window.scrollY < 160) {
        setParentScroll(false);
      }
    });
  }, []);

  //check USER is authenticated onRefresh/onload
  useEffect(() => {
    // if (!router.pathname.startsWith("/admin"))
    dispatch(checkAuthOnLoad()).then(unwrapResult);
  }, []);
  console.log(process.env.NEXT_PUBLIC_GOOGLE_AUTH)

  // ======================================ADMIN====================================

  if (router.pathname.startsWith("/admin")) {
    return (
      <div className="relative">
        <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
        {/* <Header /> */}
        <div
          // className="flex flex-col absolute test   bg-[url(/bg-test.jpg)]  bg-no-repeat bg-cover  w-full ease-in-out duration-2000 transition-all"
          className={`flex flex-col absolute test mb-20  bg-[#f1f5f9] bg-no-repeat bg-cover  w-full ease-in-out duration-2000 transition-all `}
        >
          {children}
        </div>
      </div>
    );
  } else if (router.pathname.startsWith("/art-wall")) {
    return (
      <div>
      <ToastContainer 
      position="top-center"
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
        {/* <Header/> */}
        <ArtWallHeader />
        {children}
        <Footer />
      </div>
    );
  }
  // ======================================END ADMIN====================================
  else
    return (
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH}>
        <div className="relative">
        <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
          {openModal && <ChatModal />}

          {/* {router.pathname != "/products/[productID]/customize-product" && (
            <Header />
          )} */}
          <Header/>

          {router.pathname === "" || router.pathname === "/" ? (
            <Image src={BannerImage} priority alt="background-image" />
          ) : (
            ""
          )}

          {router.pathname === "/" ||
          router.pathname === `/products/[productID]/customize` ||
          router.pathname === "/products/[productID]" ? (
            <div
              className=" chat-box  rounded-lg shadow-md overflow-hidden flex flex-col bg-white items-left left-14 absolute w-[40%]  top-28 z-20"
              data-aos="zoom-out-down"
            >
              <div
                className={`${
                  router.pathname ===
                  `/products/${router.query.productID}/customize`
                    ? "mt-10"
                    : ""
                } h-[450px] `}
              >
                <ChatWindow />
              </div>
              {router.pathname === "" ||
              router.pathname === "/" ||
              router.pathname === "/products" ? (
                <Uploader />
              ) : (
                ""
              )}
            </div>
          ) : null}
          {/* // {router.pathname === "/" || router.pathname === "/products" ? ( */}
          {router.pathname === "/products" ? (
            <div>
              {/* <div className={ "relative"}> */}
              <div
                className={`chat-box  rounded-lg shadow-md overflow-hidden flex flex-col bg-white items-left left-14 ${
                  !parentScroll ? "absolute top-28" : "fixed top-8"
                } z-20 w-[40%]     ${
                  isChatVisible ? styles.showBox : styles.hideBox
                }`}
                // data-aos={isChatVisible ? "zoom-in-up" : "zoom-out-down"}

                style={
                  isChatVisible ? { display: "flex" } : { display: "none" }
                }
              >
                <div
                  className={`${
                    router.pathname ===
                    `/products/${router.query.productID}/customize`
                      ? "mt-10"
                      : ""
                  } h-[450px] `}
                >
                  <ChatWindow />
                </div>
                {router.pathname === "" ||
                router.pathname === "/" ||
                router.pathname === "/products" ? (
                  <Uploader />
                ) : (
                  ""
                )}
              </div>
              {!isChatVisible && (
                <div
                  className={`${
                    isChatVisible ? styles.hideBox : styles.showBox
                  } fixed top-32 left-14 flex items-center justify-center rounded-full text-white p-2  drop-3 cursor-pointer w-[85px] h-[85px]`}
                  style={{
                    backgroundColor: "#fff",
                    zIndex: 1000,
                  }}
                  onClick={() => dispatch(showChatBox())}
                >
                  <img
                    src="/chatIcon.png"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              )}
            </div>
          ) : (
            ""
          )}

          <div
            className={`flex flex-col absolute test mb-20  bg-[url(/bg-test.jpg)]  bg-no-repeat bg-cover  w-full ease-in-out duration-2000 transition-all `}
          >
            {children}
            <Footer />
          </div>
        </div>
      </GoogleOAuthProvider>
    );
}

export default Layout;
