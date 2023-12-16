import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminContainer from "../../../components/Admin/AdminContainer";
import CustomerList from "../../../components/Admin/Customers/CustomerList";
const customer = () => {
  const { isLogin } = useSelector((state) => state.adminSlice);
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLogin) {
  //     router.push("/admin/signin");
  //   }
  // }, []);

  return (
    <AdminContainer>
      <CustomerList />
    </AdminContainer>
  );
};

export default customer;
