import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminContainer from "../../../components/Admin/AdminContainer";
import CmsTabPanel from "../../../components/Admin/CMS/CmsTabPanel";
const cms = () => {
  const [adminLogin, setAdminLogin] = useState(false);
  const { isLogin } = useSelector((state) => state.adminSlice);
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLogin) {
  //     router.push("/admin/signin");
  //   }
  // }, []);

  return (
    <AdminContainer>
      <CmsTabPanel />
    </AdminContainer>
  );
};

export default cms;
