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

import { MdPreview } from "react-icons/md";

import { RiEdit2Fill } from "react-icons/ri";
const PagesTable = () => {
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState("");
  const [isOpen, setIsOpen] = useState(false); //modal

  useEffect(() => {
    axios({ method: "GET", url: GET_PAGES })
      .then((res) => {
        console.log("res", res);
        setPages(res.data.result);
      })
      .catch((err) => {});
  }, []);

  const openModal = (pageID) => {
    setIsOpen(true);
    setSelectedPageId(pageID);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPageId("");
  };

  const deleteHandler = () => {
    axios({
      method: "DELETE",
      url: `${REMOVE_PAGE}`,
      data: {
        id: selectedPageId,
      },
    })
      .then((response) => {
        axios({ method: "GET", url: GET_PAGES }).then((res) => {
          setPages(res.data.result);
        });
        toast.success(response.data.message);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .finally(() => {
        closeModal();
      });
  };

  return (
    <div className="overflow-x-auto p-4 rounded-b-2xl bg-white shadow-sm">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Sl.No</th>
            <th className="min-w">Title</th>
            <th className="w-full">Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pages.length > 0 ? (
            pages.map((page, i) => (
              <tr key={page._id} className="bg-hover-gray">
                <th>{i + 1}</th>
                <td>{page?.title}</td>
                <td className="flex-1">{page?.name}</td>
                <td className="flex">
                  <Tooltip
                    anchorSelect={`#view-element_${page._id}`}
                    content="View"
                    place="bottom"
                    style={{
                      backgroundColor: "rgb(55 65 81)",
                      fontSize: "10px",
                      padding: "6px",
                    }}
                  />

                  {/* ##################---VIEW ICON---################## */}

                  <Link
                    href={`/admin/cms/view/${page._id}`}
                    id={`view-element_${page._id}`}
                    data-tooltip-delay-hide={100}
                    data-tooltip-delay-show={100}
                  >
                    <MdPreview className=" text-admin-primary text-xl mx-2 my-1 hover:cursor-pointer hover:text-blue-800" />
                  </Link>

                  <Tooltip
                    anchorSelect={`#edit-element_${page._id}`}
                    content="Edit"
                    place="bottom"
                    style={{
                      backgroundColor: "rgb(55 65 81)",
                      fontSize: "10px",
                      padding: "6px",
                    }}
                  />

                  {/* ##################---EDIT ICON---################## */}

                  <Link
                    href={`/admin/cms/edit/${page._id}`}
                    id={`edit-element_${page._id}`}
                    data-tooltip-delay-hide={100}
                    data-tooltip-delay-show={100}
                  >
                    <RiEdit2Fill className="text-gray-600 text-xl mx-2 my-1 hover:cursor-pointer hover:text-gray-700" />
                  </Link>

                  {/* ##################---DELETE ICON---################## */}
                  <Tooltip
                    anchorSelect={`#delete-element_${page._id}`}
                    content="Delete"
                    place="bottom"
                    style={{
                      backgroundColor: "rgb(55 65 81)",
                      fontSize: "10px",
                      padding: "6px",
                    }}
                  />
                  <div
                    id={`delete-element_${page._id}`}
                    data-tooltip-delay-hide={100}
                    data-tooltip-delay-show={100}
                  >
                    <MdDeleteForever
                      className="text-red-500 text-xl mx-2 my-1 hover:cursor-pointer hover:text-red-700"
                      onClick={() => openModal(page._id)}
                    />
                  </div>
                </td>
                {/* <td className="hover:text-admin-primary hover:font-bold  hover:cursor-pointer">
                  <Link href={`/admin/cms/view/${page._id}`}>View</Link>
                </td>
                <td className="hover:text-admin-primary hover:font-bold  hover:cursor-pointer">
                  <Link href={`/admin/cms/edit/${page._id}`}>Edit</Link>
                </td>
                <td className="hover:text-admin-primary hover:font-bold  hover:cursor-pointer">
                  <p onClick={() => openModal(page._id)}>Delete</p>
                </td> */}
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
          The page will be deleted permanently!
        </p>

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
    </div>
  );
};

export default PagesTable;
