import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminContainer from "../../../components/Admin/AdminContainer";
import RolesTabPanel from "../../../components/Admin/Roles/RolesTabPanel";
const roles = () => {
  const { isLogin } = useSelector((state) => state.adminSlice);
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLogin) {
  //     router.push("/admin/signin");
  //   }
  // }, []);

  return (
    <AdminContainer>
      <RolesTabPanel />
    </AdminContainer>
  );
};

export default roles;
