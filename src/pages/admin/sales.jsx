import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminContainer from "../../components/Admin/AdminContainer";
const sales = () => {
  const [adminLogin, setAdminLogin] = useState(false);
  const { isLogin } = useSelector((state) => state.adminSlice);
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLogin) {
  //     router.push("/admin/signin");
  //   }
  // }, []);

  return <AdminContainer>admin</AdminContainer>;
};

export default sales;
