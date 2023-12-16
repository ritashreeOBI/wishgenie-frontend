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

import { MdPreview, MdSave, MdOutlineCancel, MdCancel } from "react-icons/md";

import { RiEdit2Fill } from "react-icons/ri";
import { GET_USERS } from "@/api/AdminApi";
import dayjs from "dayjs";
import { useRouter } from "next/router";
const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [initLoading, setInitLoading] = useState(true);

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); //modal

  useEffect(() => {
    setInitLoading(true);
    axios({
      method: "GET",
      url: GET_ROLES,
      headers: { Authorization: localStorage.getItem("u-token") },
    })
      .then((res) => {
        console.log("res", res);
        setRoles(res.data.roles);
        setInitLoading(false);
      })
      .catch((err) => {
        setInitLoading(false);
      });
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
    <div className="overflow-x-auto p-4 rounded-b-2xl bg-white shadow-sm relative min-h-full">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Id</th>
            <th>Role</th>
            {/* <th>Addred By</th> */}
            <th>Created On</th>
            {/* <th>Permissions</th> */}
            <th>Details</th>
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
            {roles.length > 0 ? (
              roles.map((role, i) => (
                <tr key={role.r_id} className="bg-hover-gray">
                  <th>{role.r_id}</th>
                  <td className="flex-1 capitalize">{role?.role}</td>
                  {/* <td className="flex-1 lowercase">{role?.addedBy}</td> */}
                  <td className="lowercase">
                    {dayjs(role?.createdAt).format("DD-MMM-YYYY")}
                  </td>
                  {/* <td>
                  <div className="flex items-center justify-start">
                    <span className="bg-green-400 text-white px-1 rounded-full">
                      V
                    </span>{" "}
                    &nbsp;&nbsp;
                    <span
                      className={`${
                        role.edit ? "bg-green-400" : "bg-gray-500"
                      }  text-white px-1 rounded-full`}
                    >
                      E
                    </span>
                    &nbsp;&nbsp;
                    <span
                      className={`${
                        role.delete ? "bg-green-400" : "bg-gray-300"
                      }  text-white px-1 rounded-full`}
                    >
                      D
                    </span>
                  </div>
                </td> */}
                  <td className="flex">
                    {/* ##################---EDIT ICON---################## */}
                    <>
                      <Tooltip
                        anchorSelect={`#view-role-element_${role.r_id}`}
                        content="View"
                        place="bottom"
                        style={{
                          backgroundColor: "rgb(55 65 81)",
                          fontSize: "10px",
                          padding: "6px",
                        }}
                      />{" "}
                      <div
                        id={`view-role-element_${role.r_id}`}
                        data-tooltip-delay-hide={100}
                        data-tooltip-delay-show={100}
                        className="bg-slate-200 py-1 rounded-full hover:bg-slate-300 hover:cursor-pointer"
                        onClick={() => {
                          // setSelectedUserId(role.r_id);
                          // setSelectedRole(role.roleType);
                          router.push(`/admin/roles/${role.r_id}`);
                        }}
                      >
                        <MdPreview className="text-gray-600 text-xl mx-2 my-1  hover:text-gray-700" />
                      </div>
                    </>
                    {/* {selectedUserId === role.r_id ? (
                    <div className="flex justify-evenly items-center">
                      <Tooltip
                        anchorSelect={`#save-role-element_${role.r_id}`}
                        content="Save"
                        place="bottom"
                        style={{
                          backgroundColor: "rgb(55 65 81)",
                          fontSize: "10px",
                          padding: "6px",
                        }}
                      />
                      <div
                        id={`save-role-element_${role.r_id}`}
                        data-tooltip-delay-hide={100}
                        data-tooltip-delay-show={100}
                        className="bg-green-200 py-1 rounded-full hover:cursor-pointer hover:bg-green-300"
                        onClick={() => alert("Saved")}
                      >
                        <MdSave className="text-gray-600 text-xl mx-2 my-1  hover:text-gray-700" />
                      </div>
                      <Tooltip
                        anchorSelect={`#cancel-role-element_${role.r_id}`}
                        content="Cancel"
                        place="bottom"
                        style={{
                          backgroundColor: "rgb(55 65 81)",
                          fontSize: "10px",
                          padding: "6px",
                        }}
                      />
                      &nbsp;&nbsp;
                      <div
                        id={`cancel-role-element_${role.r_id}`}
                        data-tooltip-delay-hide={100}
                        data-tooltip-delay-show={100}
                        className="bg-red-100 py-1 rounded-full hover:cursor-pointer hover:bg-red-200"
                        onClick={() => alert("Saved")}
                      >
                        <MdCancel className="text-red-500 text-xl mx-2 my-1" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <Tooltip
                        anchorSelect={`#change-role-element_${role.r_id}`}
                        content="Change Role"
                        place="bottom"
                        style={{
                          backgroundColor: "rgb(55 65 81)",
                          fontSize: "10px",
                          padding: "6px",
                        }}
                      />{" "}
                      <div
                        id={`change-role-element_${role.r_id}`}
                        data-tooltip-delay-hide={100}
                        data-tooltip-delay-show={100}
                        className="bg-slate-200 py-1 rounded-full hover:bg-slate-300 hover:cursor-pointer"
                        onClick={() => {
                          setSelectedUserId(role.r_id);
                          setSelectedRole(role.roleType);
                        }}
                      >
                        <MdPreview className="text-gray-600 text-xl mx-2 my-1  hover:text-gray-700" />
                      </div>
                    </>
                  )} */}
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

export default RoleList;
