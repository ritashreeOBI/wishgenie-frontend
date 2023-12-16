import Modal from "@/components/shared-components/Modal/Modal";
import { userLogoutHandler } from "@/redux/slice/user/userAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BsPersonFill } from "react-icons/bs";
import {
  MdLocationOn,
  MdDashboardCustomize,
  MdStarBorderPurple500,
  MdOutlineSupportAgent,
  MdLogout,
  MdAdminPanelSettings,
  MdOutlineFavoriteBorder,
  MdOutlineLocalShipping,
} from "react-icons/md";
import { ROLE } from "@/api/UserRole";
const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.userAuthSlice);
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname } = router;
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const logoutHandler = () => {
    dispatch(userLogoutHandler());
    toast.success("Logout Successfully", { autoClose: 1000 });
    router.push("/");
  };

  // let MENUS = [
  //   {
  //     id: 100,
  //     content: (
  //       <li
  //         key={"100"}
  //         className={`${
  //           pathname.startsWith("/account/profile") ? "bg-[#1974BC]" : ""
  //         }`}
  //       >
  //         <Link
  //           className={`text-white ${
  //             pathname.startsWith("/account/profile") ? "font-bold" : ""
  //           } `}
  //           href="/account/profile"
  //         >
  //           <div className="flex items-center">
  //             <BsPersonFill className="text-white text-xl" />
  //             <span className="ml-3">Profile</span>
  //           </div>
  //         </Link>
  //       </li>
  //     ),
  //   },
  //   {
  //     id: 101,
  //     content: (
  //       <li
  //         key={"101"}
  //         className={`${pathname.startsWith("/admin") ? "bg-[#1974BC]" : ""}`}
  //       >
  //         <Link
  //           className={`text-white ${
  //             pathname.startsWith("/admin") ? "font-bold" : ""
  //           } `}
  //           href="/admin"
  //         >
  //           <div className="flex items-center">
  //             <MdAdminPanelSettings className="text-white text-xl" />
  //             <span className="ml-3">Admin Panel</span>
  //           </div>
  //         </Link>
  //       </li>
  //     ),
  //   },
  //   {
  //     id: 102,
  //     content: (
  //       <li
  //         className={`${
  //           pathname.startsWith("/account/addresses") ? "bg-[#1974BC]" : ""
  //         }`}
  //       >
  //         <Link
  //           className={`text-white ${
  //             pathname.startsWith("/account/addresses") ? "font-bold" : ""
  //           } `}
  //           href="/account/addresses"
  //         >
  //           <div className="flex items-center">
  //             <MdLocationOn className="text-white text-xl" />
  //             <span className="ml-3">Addreses</span>
  //           </div>
  //         </Link>
  //       </li>
  //     ),
  //   },
  //   {
  //     id: 103,
  //     content: (
  //       <li
  //         key={"103"}
  //         className={`${
  //           pathname.startsWith("/account/wishlist") ? "bg-[#1974BC]" : ""
  //         }`}
  //       >
  //         <Link
  //           className={`text-white ${
  //             pathname.startsWith("/account/wishlist") ? "font-bold" : ""
  //           } `}
  //           href="/account/wishlist"
  //         >
  //           <div className="flex items-center">
  //             <MdOutlineFavoriteBorder className="text-white text-xl" />
  //             <span className="ml-3">Wishlist</span>
  //           </div>
  //         </Link>
  //       </li>
  //     ),
  //   },

  //   {
  //     id: 104,
  //     content: (
  //       <li
  //         key={"104"}
  //         className={`${
  //           pathname.startsWith("/account/orders") ? "bg-[#1974BC]" : ""
  //         }`}
  //       >
  //         <Link
  //           className={`text-white ${
  //             pathname.startsWith("/account/orders") ? "font-bold" : ""
  //           } `}
  //           href="/account/orders"
  //         >
  //           <div className="flex items-center">
  //             <MdStarBorderPurple500 className="text-white text-xl" />
  //             <span className="ml-3"> Orders</span>
  //           </div>
  //         </Link>
  //       </li>
  //     ),
  //   },
  //   {
  //     id: 105,
  //     content: (
  //       <li
  //         key={"105"}
  //         className={`${
  //           pathname.startsWith("/account/track-shipment") ? "bg-[#1974BC]" : ""
  //         }`}
  //       >
  //         <Link
  //           className={`text-white ${
  //             pathname.startsWith("/account/track-shipment") ? "font-bold" : ""
  //           } `}
  //           href="/account/track-shipment"
  //         >
  //           <div className="flex items-center">
  //             <MdOutlineLocalShipping className="text-white text-xl" />
  //             <span className="ml-3">Track Shipment</span>
  //           </div>
  //         </Link>
  //       </li>
  //     ),
  //   },
  //   {
  //     id: 105,
  //     content: (
  //       <li
  //         key={"105"}
  //         className={`${
  //           pathname.startsWith("/account/support") ? "bg-[#1974BC]" : ""
  //         }`}
  //       >
  //         <Link
  //           className={`text-white ${
  //             pathname.startsWith("/account/support") ? "font-bold" : ""
  //           } `}
  //           href="/account/support"
  //         >
  //           <div className="flex items-center">
  //             <MdOutlineSupportAgent className="text-white text-xl" />
  //             <span className="ml-3">Customer Support</span>
  //           </div>
  //         </Link>
  //       </li>
  //     ),
  //   },
  //   {
  //     id: 105,
  //     content: (
  //       <li
  //         key={"105"}
  //         className={`${
  //           pathname.startsWith("/account/customize-products")
  //             ? "bg-[#1974BC]"
  //             : ""
  //         }`}
  //       >
  //         <Link
  //           className={`text-white ${
  //             pathname.startsWith("/account/customize-products")
  //               ? "font-bold"
  //               : ""
  //           } `}
  //           href="/account/customize-products"
  //         >
  //           <div className="flex items-center">
  //             <MdDashboardCustomize className="text-white text-xl" />
  //             <span className="ml-3"> My Products</span>
  //           </div>
  //         </Link>
  //       </li>
  //     ),
  //   },
  // ];

  return (
    <>
      <ul className="menu  bg-[#2AB1E4] w-60 rounded-2xl mr-8 max-h-[600px]">
        {/* /////////////////////// ADMIN TAB //////////////////// */}
        {user.roleType === ROLE.ADMIN ? (
          <li
            className={`${pathname.startsWith("/admin") ? "bg-[#1974BC]" : ""}`}
          >
            <Link
              className={`text-white ${
                pathname.startsWith("/admin") ? "font-bold" : ""
              } `}
              href="/admin"
            >
              <div className="flex items-center">
                <MdAdminPanelSettings className="text-white text-xl" />
                <span className="ml-3">Admin Panel</span>
              </div>
            </Link>
          </li>
        ) : null}

        {/* /////////////////////// Profile //////////////////// */}
        <li
          className={`${
            pathname.startsWith("/account/profile") ? "bg-[#1974BC]" : ""
          }`}
        >
          <Link
            className={`text-white ${
              pathname.startsWith("/account/profile") ? "font-bold" : ""
            } `}
            href="/account/profile"
          >
            <div className="flex items-center">
              <BsPersonFill className="text-white text-xl" />
              <span className="ml-3">Profile</span>
            </div>
          </Link>
        </li>
        {/* /////////////////////// addresses //////////////////// */}
        <li
          className={`${
            pathname.startsWith("/account/addresses") ? "bg-[#1974BC]" : ""
          }`}
        >
          <Link
            className={`text-white ${
              pathname.startsWith("/account/addresses") ? "font-bold" : ""
            } `}
            href="/account/addresses"
          >
            <div className="flex items-center">
              <MdLocationOn className="text-white text-xl" />
              <span className="ml-3">Addreses</span>
            </div>
          </Link>
        </li>
        {/* /////////////////////// Wishlist //////////////////// */}
        <li
          className={`${
            pathname.startsWith("/account/wishlist") ? "bg-[#1974BC]" : ""
          }`}
        >
          <Link
            className={`text-white ${
              pathname.startsWith("/account/wishlist") ? "font-bold" : ""
            } `}
            href="/account/wishlist"
          >
            <div className="flex items-center">
              <MdOutlineFavoriteBorder className="text-white text-xl" />
              <span className="ml-3">Wishlist</span>
            </div>
          </Link>
        </li>

        {/* /////////////////////// Orders //////////////////// */}
        <li
          className={`${
            pathname.startsWith("/account/orders") ? "bg-[#1974BC]" : ""
          }`}
        >
          <Link
            className={`text-white ${
              pathname.startsWith("/account/orders") ? "font-bold" : ""
            } `}
            href="/account/orders"
          >
            <div className="flex items-center">
              <MdStarBorderPurple500 className="text-white text-xl" />
              <span className="ml-3"> Orders</span>
            </div>
          </Link>
        </li>

        {/* /////////////////////// Track Shipment //////////////////// */}
        <li
          className={`${
            pathname.startsWith("/account/track-shipment") ? "bg-[#1974BC]" : ""
          }`}
        >
          <Link
            className={`text-white ${
              pathname.startsWith("/account/track-shipment") ? "font-bold" : ""
            } `}
            href="/account/track-shipment"
          >
            <div className="flex items-center">
              <MdOutlineLocalShipping className="text-white text-xl" />
              <span className="ml-3">Track Shipment</span>
            </div>
          </Link>
        </li>

        {/* /////////////////////// Customer Support //////////////////// */}
        <li
          className={`${
            pathname.startsWith("/account/support") ? "bg-[#1974BC]" : ""
          }`}
        >
          <Link
            className={`text-white ${
              pathname.startsWith("/account/support") ? "font-bold" : ""
            } `}
            href="/account/support"
          >
            <div className="flex items-center">
              <MdOutlineSupportAgent className="text-white text-xl" />
              <span className="ml-3">Customer Support</span>
            </div>
          </Link>
        </li>

        {/* /////////////////////// customize-products //////////////////// */}
        {user.roleType !== ROLE.ADMIN ? (
          <li
            className={`${
              pathname.startsWith("/account/customize-products")
                ? "bg-[#1974BC]"
                : ""
            }`}
          >
            <Link
              className={`text-white ${
                pathname.startsWith("/account/customize-products")
                  ? "font-bold"
                  : ""
              } `}
              href="/account/customize-products"
            >
              <div className="flex items-center">
                <MdDashboardCustomize className="text-white text-xl" />
                <span className="ml-3"> My Products</span>
              </div>
            </Link>
          </li>
        ) : null}

        {/* /////////////////////// Logout TAB //////////////////// */}
        <li onClick={openModal}>
          <div className="flex items-center">
            <MdLogout className="text-white text-xl" />
            <span className="text-white "> Logout</span>
          </div>
        </li>
      </ul>

      {/* /////////////////////// Logout modal //////////////////// */}
      <Modal isOpen={isOpen} onClose={closeModal} logoutHandler={logoutHandler}>
        <h2 className="font-bold text-xl">Are you sure?</h2>
        <p className="text-slate-600 my-4">Do you want to logout!</p>
        <div className="flex justify-start mt-8">
          <button
            className="px-4 py-2 border border-cyan-500 text-cyan-500 hover:cursor-pointer rounded-md min-w-[100px]"
            onClick={closeModal}
          >
            No
          </button>{" "}
          &nbsp;
          <button
            className="px-4 py-2 bg-cyan-500 text-white hover:cursor-pointer rounded-md min-w-[140px]"
            onClick={logoutHandler}
          >
            Yes
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Menu;
