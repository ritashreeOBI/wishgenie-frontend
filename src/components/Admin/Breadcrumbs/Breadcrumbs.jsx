import Modal from "@/components/shared-components/Modal/Modal";
import { logoutHandler } from "@/redux/slice/admin/adminSlice";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

// import Modal from "../../../components/shared-components/Modal/Modal";
const Breadcrumbs = () => {
  const router = useRouter();
  const { pathname } = router;
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const logoutConfirmOn = () => {
    setShowConfirm(true);
  };
  const logoutConfirmOff = () => {
    setShowConfirm(false);
  };

  const onLogout = () => {
    dispatch(logoutHandler());
    setShowConfirm(false);
    toast.success("Logout Successfully");
    router.push("/admin");
  };
  return (
    <div className="h-[106px] ">
      <div className="text-sm breadcrumbs text-admin-dark-text flex justify-between">
        <ul>
          <li>
            <a>Admin</a>
          </li>
          <li>
            <a className="capitalize">{pathname.split("/")[2]}</a>
          </li>
        </ul>

        <Tooltip
          anchorSelect="#logout-element"
          content="Logout"
          style={{ backgroundColor: "rgb(55 65 81)" }}
        />
        <button
          id="logout-element"
          data-tooltip-delay-hide={100}
          data-tooltip-delay-show={100}
          className="bg-slate-200 p-1 rounded-full hover:bg-admin-primary overflow-hidden"
          onClick={logoutConfirmOn}
        >
          <BiLogOutCircle className="text-2xl rotate-180 hover:text-white" />
        </button>


        <Modal isOpen={showConfirm} onClose={logoutConfirmOff}>
          <h2 className="font-bold text-xl">Are you sure?</h2>
          <p className="text-slate-600 my-4">Do you want to logout!</p>
          <div className="flex justify-start mt-8">
            <button
              className="px-4 py-2 border border-admin-primary text-cyan-500 hover:cursor-pointer rounded-md min-w-[100px]"
              onClick={logoutConfirmOff}
            >
              No
            </button>{" "}
            &nbsp; &nbsp;
            <button
              className="px-4 py-1 bg-admin-primary text-white hover:cursor-pointer rounded-md min-w-[140px]"
              onClick={onLogout}
            >
              Yes
            </button>
          </div>
        </Modal>
      </div>

      <h1 className="capitalize text-admin-dark-text ">
        {pathname.split("/")[2]}
      </h1>
    </div>
  );
};

export default Breadcrumbs;
