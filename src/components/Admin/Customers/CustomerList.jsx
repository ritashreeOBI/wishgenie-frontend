import { REMOVE_PAGE } from "@/api/AdminApi";
import { GET_PAGES } from "@/api/AdminApi";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MdOutlineError } from "react-icons/md";
import Modal from "@/components/shared-components/Modal/Modal";
import { MdDeleteForever } from "react-icons/md";
import { Tooltip } from "react-tooltip";

import { MdPreview, MdSave, MdOutlineCancel, MdCancel } from "react-icons/md";

import { RiEdit2Fill } from "react-icons/ri";
import { GET_CUSTOMERS } from "@/api/AdminApi";
import dayjs from "dayjs";
const CustomerList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const [isOpen, setIsOpen] = useState(false); //modal

  useEffect(() => {
    axios({
      method: "GET",
      url: GET_CUSTOMERS,
      headers: { Authorization: localStorage.getItem("u-token") },
    })
      .then((res) => {
        console.log("res", res);
        setUsers(res.data.users);
      })
      .catch((err) => {});
  }, []);

  const openModal = (pageID) => {
    setIsOpen(true);
    setSelectedUserId(pageID);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedUserId("");
  };

  return (
    <div className="overflow-x-auto p-4 rounded-2xl bg-white shadow-sm">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created On</th>
            <th>Role</th>
            <th>Login Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, i) => (
              <tr key={user.userId} className="bg-hover-gray">
                <th>{user.userId}</th>
                <td className="flex-1 capitalize">{user?.userName}</td>
                <td className="flex-1 lowercase">{user?.email}</td>
                <td className="lowercase">
                  {dayjs(user?.createdAt).format("DD-MMM-YYYY")}
                </td>
                <td>{user?.roleType}</td>
                <td>{user?.loginType}</td>
                <td className="flex">
                  {/* ##################---EDIT ICON---################## */}

                  <>
                    <Tooltip
                      anchorSelect={`#view-role-element_${user.userId}`}
                      content="View"
                      place="bottom"
                      style={{
                        backgroundColor: "rgb(55 65 81)",
                        fontSize: "10px",
                        padding: "6px",
                      }}
                    />{" "}
                    <div
                      id={`view-role-element_${user.userId}`}
                      data-tooltip-delay-hide={100}
                      data-tooltip-delay-show={100}
                      className="bg-slate-200 py-1 rounded-full hover:bg-slate-300 hover:cursor-pointer"
                      onClick={() => {
                        setSelectedUserId(user.userId);
                        setSelectedRole(user.roleType);
                      }}
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
      </table>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="font-bold text-xl">Are you sure?</h2>
        <p className="text-slate-600 my-4">
          The user will be deleted permanently!
        </p>

        <div className="flex justify-start mt-8">
          <button
            className="px-4 py-2 border border-admin-primary text-cyan-500 hover:cursor-pointer rounded-md min-w-[100px]"
            onClick={closeModal}
          >
            No
          </button>{" "}
          &nbsp;&nbsp;
          {/* <button
            className="px-4 py-2 bg-admin-primary text-white hover:cursor-pointer rounded-md min-w-[140px]"
            onClick={deleteHandler}
          >
            Yes 
          </button>*/}
        </div>
      </Modal>
    </div>
  );
};

export default CustomerList;
