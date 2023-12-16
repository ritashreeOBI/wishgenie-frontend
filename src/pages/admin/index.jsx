import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminContainer from "../../components/Admin/AdminContainer";
import Modal from "@/components/shared-components/Modal/Modal";
const index = () => {
  const { loggedIn } = useSelector((state) => state.userAuthSlice);
  // const { isLogin } = useSelector((state) => state.adminSlice);
  const router = useRouter();

  // useEffect(() => {
  //   if (!loggedIn) {
  //     router.push("/admin/signin");
  //   }
  // }, []);

  return (
    <AdminContainer>
      <Modal isOpen={true}>
        <div className="flex justify-center  p-6">
          <div className="loader "></div>
        </div>
      </Modal>
    </AdminContainer>
  );
};

export default index;
