import Link from "next/link";
import React, { useReducer, useState, useEffect } from "react";
import { RiDashboardFill, RiProductHuntFill } from "react-icons/ri";
import { AiFillIdcard } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { FaUserCircle, FaUsers, FaUsersCog } from "react-icons/fa";
import { MdContentPaste, MdOutlinePermContactCalendar } from "react-icons/md";
import { BsFillFileBarGraphFill, BsImages } from "react-icons/bs";
import { TbAffiliateFilled } from "react-icons/tb";
import {GoProjectRoadmap} from 'react-icons/go'
import { GrAd } from "react-icons/gr";
import { useRouter } from "next/router";
import { title } from "process";
import { NavItems } from "./navlist";
const ICON_COLOR = "#2197ca";

const Sidebar = () => {
  const router = useRouter();

  useEffect(() => {
    const { pathname } = router;
    if (pathname.toLowerCase() === "/admin") {
      router.push("/admin/dashboard");
    }
  }, []);

 

  return (
    <div className="bg-[#FFFFFF]   h-screen shadow-md   ">
      <div className="flex p-4 pl-6 gap-4 items-center border-b  ">
       <img src="/logo.png" alt="logo" className="w-12 h-auto " />
        <div className=" flex flex-col gap">
          <p className="text-xl font-bold text-sky-600">Wish Genie</p> 
          <p className="text-xs opacity-40 text-center">Super Admin</p>
        </div>
      </div>
      

      {/* //navbar */}
      <div className=" mt-6 flex  flex-col pl-4 ">
        {NavItems.map((item , idx) => {
          let active = router.pathname === item?.link;

            return (
              <>
              {
              ! item.label ?
              
              <Link href={item?.link} key={idx}>
              <div
                className={`flex items-center  p-2  border-l px-5   py-3 ml-3 rounded-sm hover:cursor-pointer 
                ${active ? "font-semibold border-[#2197ca]" : ""}`}
                style={{
                  //background:active ? '#e0f2fe' : 'white' , 
                  //borderLeft: active ? ` ${ICON_COLOR}` : "unset",
                }}
              >
             
                <p className={
                    active
                      ? `text-admin-primary font-bold text-xl`
                      : ` font-bold text-xl opacity-70`
                  }>{item.icon}</p>
                <p
                  className={
                    active
                      ? // ? "ml-4 text-lg text-admin-dark-text"
                        "ml-4 text-md  text-[14px] text-admin-primary"
                      : "ml-4 text-[14px] opacity-60"
                  }
                >
                 {item?.title}
                </p>
              </div>
             </Link>
             :
               <p className="text-sm border-b-2 border-[#0284c7] font-bold rounded-md  w-fit pb-1 opacity-80 my-4">{item.label}</p>
               
              }
            </>
            )

        })}
      </div>
    </div>
  );
};

export default Sidebar;

