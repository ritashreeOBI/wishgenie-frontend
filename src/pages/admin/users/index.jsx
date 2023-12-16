import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminContainer from "../../../components/Admin/AdminContainer";
import UserTabPanel from "../../../components/Admin/Users/UserTabPanel";
const users = () => {
  const { isLogin } = useSelector((state) => state.adminSlice);
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLogin) {
  //     router.push("/admin/signin");
  //   }
  // }, []);

  return (
    <AdminContainer>
      <UserTabPanel />
    </AdminContainer>
  );
};

export default users;
