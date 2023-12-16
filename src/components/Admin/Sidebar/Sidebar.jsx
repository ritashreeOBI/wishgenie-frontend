import Link from "next/link";
import React, { useReducer, useState, useEffect } from "react";
import { RiDashboardFill, RiProductHuntFill } from "react-icons/ri";
import { AiFillIdcard } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { FaUserCircle, FaUsers, FaUsersCog } from "react-icons/fa";
import { MdContentPaste } from "react-icons/md";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import { TbAffiliateFilled } from "react-icons/tb";
import { GrAd } from "react-icons/gr";
import { useRouter } from "next/router";
const ICON_COLOR = "#2197ca";
const Sidebar = () => {
  const router = useRouter();

  useEffect(() => {
    const { pathname } = router;
    if (pathname.toLowerCase() === "/admin") {
      router.push("/admin/dashboard");
    }
  }, []);

  const NavItems = [
    {
      id: 101,
      title: "Dashboard",
    },
    {
      id: 102,
      title: "Affiliate",
    },
    // {
    //   id: 103,
    //   title: "Sales",
    // },
    {
      id: 104,
      title: "Products",
    },
    {
      id: 106,
      title: "CMS",
    },
    {
      id: 107,
      title: "Customers",
    },
    {
      id: 108,
      title: "Users",
    },
    {
      id: 109,
      title: "Roles",
    },
    // {
    //   id: 110,
    //   title: "Settings",
    // },
  ];

  return (
    <div className="bg-[#FFFFFF] w-[300px] h-screen mt-4 mr-4 rounded-lg">
      {/* <div className="flex py-6  relative">
        <img src="/logo.png" alt="logo" className="w-24 h-auto ml-16" />
        <div className="absolute bottom-[22px] left-[55%] font-bold text-slate-600">
          | ADMIN
        </div>
      </div>
      <hr /> */}

      {/* //navbar */}
      <div className="">
        {NavItems.map((item) => {
          let active = router.pathname
            .toLowerCase()
            .includes(item.title.toLowerCase());

          if (item.title === "Dashboard") {
            return <Dashboard key={item.id} active={active} />;
          }
          if (item.title === "Affiliate") {
            return <Affiliate key={item.id} active={active} />;
          }
          if (item.title === "Products") {
            return <Products key={item.id} active={active} />;
          }
          if (item.title === "Settings") {
            return <Settings key={item.id} active={active} />;
          }
          if (item.title === "Profile") {
            return <Profile key={item.id} active={active} />;
          }
          if (item.title === "CMS") {
            return <CMS key={item.id} active={active} />;
          }
          if (item.title === "Users") {
            return <Users key={item.id} active={active} />;
          }
          if (item.title === "Customers") {
            return <Customers key={item.id} active={active} />;
          }
          if (item.title === "Roles") {
            return <Roles key={item.id} active={active} />;
          }
          if (item.title === "Sales") {
            return <Sales key={item.id} active={active} />;
          }
        })}
      </div>
    </div>
  );
};

export default Sidebar;

const Dashboard = ({ active }) => {
  return (
    <Link href="/admin/dashboard" key={101}>
      <div
        className={`flex items-center my-1  p-2 pl-6  rounded-sm hover:cursor-pointer 
        ${active ? "font-semibold" : ""}`}
        style={{
          borderRight: active ? `4px solid ${ICON_COLOR}` : "unset",
        }}
      >
        <RiDashboardFill
          className={
            active
              ? `text-admin-primary font-bold text-3xl`
              : `text-admin-light-text font-bold text-3xl`
          }
        />
        <p
          className={
            active
              ? // ? "ml-4 text-lg text-admin-dark-text"
                "ml-4 text-lg text-admin-primary"
              : "ml-4 text-lg text-admin-light-text"
          }
        >
          Dashboard
        </p>
      </div>
    </Link>
  );
};
const Products = ({ active }) => {
  return (
    <Link href="/admin/products" key={102}>
      <div
        className={`flex items-center my-1  p-2 pl-6  rounded-sm hover:cursor-pointer 
               ${active ? "font-semibold" : ""}`}
        style={{
          borderRight: active ? `4px solid ${ICON_COLOR}` : "unset",
        }}
      >
        <RiProductHuntFill
          className={
            active
              ? `text-admin-primary font-bold text-4xl`
              : `text-admin-light-text font-normal text-4xl`
          }
        />
        <p
          className={
            active
              ? // ? "ml-4 text-lg text-admin-dark-text"
                "ml-4 text-lg text-admin-primary"
              : "ml-4 text-lg text-admin-light-text"
          }
        >
          Products
        </p>
      </div>
    </Link>
  );
};
const Settings = ({ active }) => {
  return (
    <Link href="/admin/settings" key={102}>
      <div
        className={`flex items-center my-1  p-2 pl-6  rounded-sm hover:cursor-pointer 
             ${active ? "font-semibold" : ""}`}
        style={{
          borderRight: active ? `4px solid ${ICON_COLOR}` : "unset",
        }}
      >
        <IoMdSettings
          className={
            active
              ? `text-admin-primary font-bold text-3xl`
              : `text-admin-light-text font-normal text-3xl`
          }
        />
        <p
          className={
            active
              ? // ? "ml-4 text-lg text-admin-dark-text"
                "ml-4 text-lg text-admin-primary"
              : "ml-4 text-lg text-admin-light-text"
          }
        >
          Settings
        </p>
      </div>
    </Link>
  );
};
const Profile = ({ active }) => {
  return (
    <Link href="/admin/profile" key={102}>
      <div
        className={`flex items-center my-1  p-2 pl-6  rounded-sm hover:cursor-pointer ${
          active ? "font-semibold" : ""
        }`}
        style={{
          borderRight: active ? `4px solid ${ICON_COLOR}` : "unset",
        }}
      >
        <FaUserCircle
          className={
            active
              ? `text-admin-primary font-bold text-3xl`
              : `text-admin-light-text font-normal text-3xl`
          }
        />
        <p
          className={
            active
              ? // ? "ml-4 text-lg text-admin-dark-text"
                "ml-4 text-lg text-admin-primary"
              : "ml-4 text-lg text-admin-light-text"
          }
        >
          Profile
        </p>
      </div>
    </Link>
  );
};
const CMS = ({ active }) => {
  return (
    <Link href="/admin/cms" key={102}>
      <div
        className={`flex items-center my-1  p-2 pl-6  rounded-sm hover:cursor-pointer 
              ${active ? "font-semibold" : ""}`}
        style={{
          borderRight: active ? `4px solid ${ICON_COLOR}` : "unset",
        }}
      >
        <MdContentPaste
          className={
            active
              ? `text-admin-primary font-bold text-3xl`
              : `text-admin-light-text font-normal text-3xl`
          }
        />
        <p
          className={
            active
              ? // ? "ml-4 text-lg text-admin-dark-text"
                "ml-4 text-lg text-admin-primary"
              : "ml-4 text-lg text-admin-light-text"
          }
        >
          CMS
        </p>
      </div>
    </Link>
  );
};
const Users = ({ active }) => {
  return (
    <Link href="/admin/users" key={102}>
      <div
        className={`flex items-center my-1  p-2 pl-6  rounded-sm hover:cursor-pointer 
              ${active ? "font-semibold" : ""}`}
        style={{
          borderRight: active ? `4px solid ${ICON_COLOR}` : "unset",
        }}
      >
        <FaUsersCog
          className={
            active
              ? `text-admin-primary font-bold text-3xl`
              : `text-admin-light-text font-normal text-3xl`
          }
        />
        <p
          className={
            active
              ? // ? "ml-4 text-lg text-admin-dark-text"
                "ml-4 text-lg text-admin-primary"
              : "ml-4 text-lg text-admin-light-text"
          }
        >
          Users
        </p>
      </div>
    </Link>
  );
};
const Customers = ({ active }) => {
  return (
    <Link href="/admin/customers" key={102}>
      <div
        className={`flex items-center my-1  p-2 pl-6  rounded-sm hover:cursor-pointer 
        ${active ? "font-semibold" : ""}`}
        style={{
          borderRight: active ? `4px solid ${ICON_COLOR}` : "unset",
        }}
      >
        <FaUsers
          className={
            active
              ? `text-admin-primary font-bold text-3xl`
              : `text-admin-light-text font-normal text-3xl`
          }
        />
        <p
          className={
            active
              ? // ? "ml-4 text-lg text-admin-dark-text"
                "ml-4 text-lg text-admin-primary"
              : "ml-4 text-lg text-admin-light-text"
          }
        >
          Customers
        </p>
      </div>
    </Link>
  );
};
const Roles = ({ active }) => {
  return (
    <Link href="/admin/roles" key={102}>
      <div
        className={`flex items-center my-1  p-2 pl-6  rounded-sm hover:cursor-pointer 
         ${active ? "font-semibold" : ""}`}
        style={{
          borderRight: active ? `4px solid ${ICON_COLOR}` : "unset",
        }}
      >
        <AiFillIdcard
          className={
            active
              ? `text-admin-primary font-bold text-3xl rounded-md`
              : `text-admin-light-text font-normal text-3xl  rounded-md`
          }
        />
        <p
          className={
            active
              ? // ? "ml-4 text-lg text-admin-dark-text"
                "ml-4 text-lg text-admin-primary"
              : "ml-4 text-lg text-admin-light-text"
          }
        >
          Roles
        </p>
      </div>
    </Link>
  );
};
const Sales = ({ active }) => {
  return (
    <Link href="/admin/sales" key={102}>
      <div
        className={`flex items-center my-1  p-2 pl-6  rounded-sm hover:cursor-pointer 
               ${active ? "font-semibold" : ""}`}
        style={{
          borderRight: active ? `4px solid ${ICON_COLOR}` : "unset",
        }}
      >
        <BsFillFileBarGraphFill
          className={
            active
              ? `text-admin-primary font-bold text-3xl`
              : `text-admin-light-text font-normal text-3xl`
          }
        />
        <p
          className={
            active
              ? // ? "ml-4 text-lg text-admin-dark-text"
                "ml-4 text-lg text-admin-primary"
              : "ml-4 text-lg text-admin-light-text"
          }
        >
          Sales
        </p>
      </div>
    </Link>
  );
};
const Affiliate = ({ active }) => {
  return (
    <Link href="/admin/affiliate" key={102}>
      <div
        className={`flex items-center my-1  p-2 pl-6   rounded-sm hover:cursor-pointer 
       ${active ? "font-semibold" : ""}`}
        style={{
          borderRight: active ? `4px solid ${ICON_COLOR}` : "unset",
        }}
      >
        <TbAffiliateFilled
          className={
            active
              ? `text-admin-primary font-bold text-3xl`
              : `text-admin-light-text font-normal text-3xl`
          }
        />
        <p
          className={
            active
              ? // ? "ml-4 text-lg text-admin-dark-text"
                "ml-4 text-lg text-admin-primary"
              : "ml-4 text-lg text-admin-light-text"
          }
        >
          Affiliate
        </p>
      </div>
    </Link>
  );
};
