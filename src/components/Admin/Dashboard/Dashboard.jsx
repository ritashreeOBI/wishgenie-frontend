import React, { useState, useEffect } from "react";
import CardItem from "./CardItem/CardItem";
import { RiDashboardFill, RiProductHuntFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { FaUserCircle, FaUsers } from "react-icons/fa";
import { MdContentPaste } from "react-icons/md";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import SpentAnalysis from "./SpentLineChart";
import RevenueBarChart from "./RevenueBarChart";
import axios from "axios";
import { GET_USERS_COUNT } from "@/api/AdminApi";
import { GET_TOTAL_PRODUCTS } from "@/api/Api";
const Dashboard = () => {
  const [counters, setCounters] = useState({
    users: 0,
    customers: 0,
    products: 0,
    sales: 340,
    earning: 240,
  });
  useEffect(() => {
    getCounters();
  }, []);

  const getCounters = async () => {
    const usersCount = await axios({
      method: "GET",
      url: GET_USERS_COUNT,
      headers: { Authorization: localStorage.getItem("u-token") },
    });

    const productsCount = await axios({
      method: "GET",
      url: GET_TOTAL_PRODUCTS,
      headers: { Authorization: localStorage.getItem("u-token") },
    });

    setCounters((prevState) => {
      return {
        ...prevState,
        customers: usersCount.data.customers,
        users: usersCount.data.users,
        products: productsCount.data.products,
      };
    });
  };

  return (
    <div className="my-4 pb-20 mt-[-16px]">
      {/* //top sections */}
      <div className="grid gap-6 grid-cols-3 my-4">
        <CardItem
          icon={
            <BsFillFileBarGraphFill className="w-[30px] h-[30px] text-admin-primary" />
          }
          heading={"$" + counters.sales}
          subHeading={"Sales"}
        />{" "}
        <CardItem
          icon={
            <BsFillFileBarGraphFill className="w-[30px] h-[30px] text-admin-primary" />
          }
          heading={"$" + counters.earning}
          subHeading={"Earnings"}
        />
        <CardItem
          icon={
            <BsFillFileBarGraphFill className="w-[30px] h-[30px] text-admin-primary" />
          }
          heading={"$140"}
          subHeading={"Spent"}
        />
        <CardItem
          icon={
            <RiProductHuntFill className="w-[40px] h-[40px] text-admin-primary" />
          }
          heading={counters.products}
          subHeading={"Products"}
        />
        <CardItem
          icon={<FaUsers className="w-[30px] h-[30px] text-admin-primary" />}
          heading={counters.customers}
          subHeading={"Customers"}
        />
        <CardItem
          icon={
            <FaUserCircle className="w-[30px] h-[30px] text-admin-primary" />
          }
          heading={counters.users}
          subHeading={"Users"}
        />
      </div>

      <div className="grid gap-6 grid-cols-2 my-4">
        <SpentAnalysis />
        <RevenueBarChart />
      </div>
    </div>
  );
};

export default Dashboard;
