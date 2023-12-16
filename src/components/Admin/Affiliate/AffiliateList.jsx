import { GET_ROLES, REMOVE_PAGE } from "@/api/AdminApi";
import { GET_PAGES } from "@/api/AdminApi";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MdOutlineError } from "react-icons/md";
import Modal from "@/components/shared-components/Modal/Modal";
import { MdDeleteForever } from "react-icons/md";
import { Tooltip } from "react-tooltip";

import { MdPreview } from "react-icons/md";

import dayjs from "dayjs";
import { useRouter } from "next/router";

const AFFILICATE_JSON = [
  {
    id: 100,
    site: "Amazon",
    category: "clothing",
    orderPlaced: 10,
  },
  {
    id: 101,
    site: "Amazon",
    category: "electronics",
    orderPlaced: 15,
  },
  {
    id: 102,
    site: "Nike",
    category: "footware",
    orderPlaced: 50,
  },
  {
    id: 103,
    site: "Nike",
    category: "clothing",
    orderPlaced: 20,
  },
];

const AffiliateList = () => {
  const [data, setData] = useState(AFFILICATE_JSON);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [initLoading, setInitLoading] = useState(false);

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); //modal

  // useEffect(() => {
  //   setInitLoading(true);
  //   axios({
  //     method: "GET",
  //     url: GET_ROLES,
  //     headers: { Authorization: localStorage.getItem("token") },
  //   })
  //     .then((res) => {
  //       console.log("res", res);
  //       setRoles(res.data.roles);
  //       setInitLoading(false);
  //     })
  //     .catch((err) => {
  //       setInitLoading(false);
  //     });
  // }, []);

  const openModal = (pageID) => {
    setIsOpen(true);
    setSelectedUserId(pageID);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedUserId("");
  };

  return (
    <div className="overflow-x-auto p-4 rounded-b-2xl bg-white shadow-sm relative min-h-full">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Site</th>
            <th>Category</th>
            <th>Order Placed</th>
            <th>Action</th>
          </tr>
        </thead>
        {initLoading ? (
          <tbody>
            <tr>
              <th colSpan={6}>
                <div className="flex justify-center  p-6">
                  <div className="loader "></div>
                </div>
              </th>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {data.length > 0 ? (
              data.map((item, i) => (
                <tr key={item.id} className="bg-hover-gray">
                  <th>{item.id}</th>
                  <td className="flex-1 capitalize">{item?.site}</td>
                  <td className="flex-1 capitalize">{item?.category}</td>
                  <td className="flex-1 capitalize">{item?.orderPlaced}</td>

                  <td className="flex">
                    {/* ##################---EDIT ICON---################## */}
                    <>
                      <Tooltip
                        anchorSelect={`#view-affiliate-element_${item.id}`}
                        content="View Details"
                        place="bottom"
                        style={{
                          backgroundColor: "rgb(55 65 81)",
                          fontSize: "10px",
                          padding: "6px",
                        }}
                      />{" "}
                      <div
                        id={`view-affiliate-element_${item.id}`}
                        data-tooltip-delay-hide={100}
                        data-tooltip-delay-show={100}
                        className="bg-slate-200 py-1 rounded-full hover:bg-slate-300 hover:cursor-pointer"
                        // onClick={() => {
                        //   router.push(`/admin/data/${item.id}`);
                        // }}
                      >
                        <MdPreview className="text-gray-600 text-xl mx-2 my-1  hover:text-gray-700" />
                      </div>
                    </>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <div className="grid gap-3 place-items-center p-10 ">
                    <MdOutlineError className="text-6xl text-gray-400" />
                    <p className="text-center font-semibold text-gray-500">
                      No records found!
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="font-bold text-xl">Are you sure?</h2>
        <p className="text-slate-600 my-4">
          The role will be deleted permanently!
        </p>

        <div className="flex justify-start mt-8">
          <button
            className="px-4 py-2 border border-admin-primary text-cyan-500 hover:cursor-pointer rounded-md min-w-[100px]"
            onClick={closeModal}
          >
            No
          </button>{" "}
          &nbsp;&nbsp;
        </div>
      </Modal>
    </div>
  );
};

export default AffiliateList;
