import { useRouter } from "next/router";
import React from "react";

import AdminContainer from "../../components/Admin/AdminContainer";
import PlansIndex from "@/components/Admin/Plans";

const plans = () => {
  // const { isLogin } = useSelector((state) => state.adminSlice);
  // const router = useRouter();

  // useEffect(() => {
  //     if (!isLogin) {
  //         router.push("/admin/signin");
  //     }
  // }, []);

  return (
    <AdminContainer>
      <PlansIndex />
    </AdminContainer>
  );
};

export default plans;
