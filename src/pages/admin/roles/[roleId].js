import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminContainer from "../../../components/Admin/AdminContainer";
import ViewRoleDetails from '../../../components/Admin/Roles/ViewRoleDetails.jsx'
const roles = () => {
    const { isLogin } = useSelector((state) => state.adminSlice);
    const router = useRouter();

    // useEffect(() => {
    //     if (!isLogin) {
    //         router.push("/admin/signin");
    //     }
    // }, []);

    return (
        <AdminContainer>
            <ViewRoleDetails />
        </AdminContainer>
    );
};

export default roles;
