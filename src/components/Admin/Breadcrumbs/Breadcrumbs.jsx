import Modal from "@/components/shared-components/Modal/Modal";
import { logoutHandler } from "@/store/slices/admin/adminSlice";
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
    <div className=" ">
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
      


      </div>

      
    </div>
  );
};

export default Breadcrumbs;
