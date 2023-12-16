import { BLOCK_USER } from "@/api/AdminApi";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MdOutlineError } from "react-icons/md";
import Modal from "@/components/shared-components/Modal/Modal";
import { Tooltip } from "react-tooltip";

import { MdEdit, MdAddCircle, MdDeleteForever } from "react-icons/md";

import { GET_USERS } from "@/api/AdminApi";
import dayjs from "dayjs";
import AddRoleToUser from "./AddRoleToUser";
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserName, setselectedUserName] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [isOpen, setIsOpen] = useState(false); //modal
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (userId, userName, modalType, roleId) => {
    setIsOpen(true);
    setSelectedUserId(userId);
    setselectedUserName(userName);
    setModalType(modalType);
    setSelectedRoleId(roleId);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedUserId("");
    setselectedUserName("");
    setModalType("");
    setSelectedRoleId("");
  };

  //refetch the users after a role assigned to user
  const onRoleAddSuccess = () => {
    fetchUsers();
  };

  const deleteHandler = () => {
    axios({
      method: "POST",
      url: BLOCK_USER,
      data: {
        userId: selectedUserId,
      },
      headers: { Authorization: localStorage.getItem("u-token") },
    })
      .then((res) => {
        toast.success(res.data.message);
        fetchUsers();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  function fetchUsers() {
    setLoading(true);
    axios({
      method: "GET",
      url: GET_USERS,
      headers: { Authorization: localStorage.getItem("u-token") },
    })
      .then((res) => {
        console.log("res", res);
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  return (
    <div className="overflow-x-auto p-4 rounded-b-2xl bg-white shadow-sm">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created On</th>
            <th>Role</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        {loading ? (
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
            {users.length > 0 ? (
              users.map((user, i) => (
                <tr key={user.userId} className="bg-hover-gray">
                  <th>{user.userId}</th>
                  <td className="flex-1 capitalize">{user?.userName}</td>
                  <td className="flex-1 lowercase">{user?.email}</td>
                  <td className="lowercase">
                    {dayjs(user?.createdAt).format("DD-MMM-YYYY")}
                  </td>
                  <td>
                    {!user?.role ? (
                      //#############ASSIGN ROLE ICON#################
                      <div className="flex">
                        <Tooltip
                          anchorSelect={`#add-role-element_${user.userId}`}
                          content="Assign Role"
                          place="bottom"
                          style={{
                            backgroundColor: "rgb(55 65 81)",
                            fontSize: "10px",
                            padding: "6px",
                          }}
                        />
                        <div
                          id={`add-role-element_${user.userId}`}
                          data-tooltip-delay-hide={100}
                          data-tooltip-delay-show={100}
                          className="bg-lime-300 py-1 rounded-full hover:bg-lime-300 hover:cursor-pointer"
                          onClick={() =>
                            openModal(user.userId, user.userName, "add")
                          }
                        >
                          <MdAddCircle className="text-gray-600 text-xl mx-2 my-1  hover:text-gray-700" />
                        </div>
                      </div>
                    ) : (
                      user.role.role
                    )}
                  </td>

                  <td className="flex justify-around">
                    {/* ##################---EDIT ICON---################## */}

                    <div className="flex justify-evenly items-center">
                      <Tooltip
                        anchorSelect={`#edit-role-element_${user.userId}`}
                        content="Change Role"
                        place="bottom"
                        style={{
                          backgroundColor: "rgb(55 65 81)",
                          fontSize: "10px",
                          padding: "6px",
                        }}
                      />{" "}
                      <div
                        id={`edit-role-element_${user.userId}`}
                        data-tooltip-delay-hide={100}
                        data-tooltip-delay-show={100}
                        className="bg-slate-200 py-1 rounded-full hover:bg-slate-300 hover:cursor-pointer"
                        onClick={() =>
                          openModal(
                            user.userId,
                            user.userName,
                            "add",
                            user?.role?.r_id
                          )
                        }
                      >
                        <MdEdit className="text-gray-600 text-xl mx-2 my-1  hover:text-gray-700" />
                      </div>
                      {/* //############### Remove Icon################ */}
                      <Tooltip
                        anchorSelect={`#remove-role-element_${user.userId}`}
                        content="Remove"
                        place="bottom"
                        style={{
                          backgroundColor: "rgb(55 65 81)",
                          fontSize: "10px",
                          padding: "6px",
                        }}
                      />
                      &nbsp;&nbsp;&nbsp;
                      <div
                        id={`remove-role-element_${user.userId}`}
                        data-tooltip-delay-hide={100}
                        data-tooltip-delay-show={100}
                        className="bg-red-100 py-1 rounded-full hover:cursor-pointer hover:bg-red-200"
                        onClick={() =>
                          openModal(user.userId, user.userName, "remove")
                        }
                      >
                        <MdDeleteForever className="text-red-500 text-xl mx-2 my-1" />
                      </div>
                    </div>
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
      {modalType === "add" ? (
        <AddRoleToUser
          open={isOpen}
          userName={selectedUserName}
          userId={selectedUserId}
          closeHandler={closeModal}
          onRoleAddSuccess={onRoleAddSuccess}
          roleId={selectedRoleId}
        />
      ) : (
        ""
      )}
      {modalType === "remove" ? (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <h2 className="font-bold text-xl">Are you sure?</h2>
          <p className="text-slate-600 my-4">The user will be deleted !</p>

          <div className="flex justify-start mt-8">
            <button
              className="px-4 py-2 border border-admin-primary text-cyan-500 hover:cursor-pointer rounded-md min-w-[100px]"
              onClick={closeModal}
            >
              No
            </button>{" "}
            &nbsp;&nbsp;
            <button
              className="px-4 py-2 bg-admin-primary text-white hover:cursor-pointer rounded-md min-w-[140px]"
              onClick={deleteHandler}
            >
              Yes
            </button>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default UsersList;
