import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminContainer from "../../components/Admin/AdminContainer";
import AffiliateTabPanel from "@/components/Admin/Affiliate/AffiliateTabPanel";

const affiliate = () => {
    // const { isLogin } = useSelector((state) => state.adminSlice);
    // const router = useRouter();

    // useEffect(() => {
    //     if (!isLogin) {
    //         router.push("/admin/signin");
    //     }
    // }, []);

    return (
        <AdminContainer>
            <AffiliateTabPanel />
        </AdminContainer>
    );
};

export default affiliate;
