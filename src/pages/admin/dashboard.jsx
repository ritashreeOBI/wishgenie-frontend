import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminContainer from "../../components/Admin/AdminContainer";
import Dashboard from "@/components/Admin/Dashboard/Dashboard";
const dashboard = () => {
  const [adminLogin, setAdminLogin] = useState(false);
  const { loggedIn } = useSelector((state) => state.userAuthSlice);
  // const { isLogin } = useSelector((state) => state.adminSlice);
  const router = useRouter();

  // useEffect(() => {
  //   if (!loggedIn) {
  //     router.push("/signin");
  //     // router.push("/admin/signin");
  //   }
  // }, []);

  return (
    <AdminContainer>
      <Dashboard />
    </AdminContainer>
  );
};

export default dashboard;
