import React, { useEffect } from "react";
// import App from "./src/App";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar/Sidebar";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import { useSelector } from "react-redux";
import Modal from "../shared-components/Modal/Modal";

const AdminContainer = (props) => {
  const { loggedIn, isLoading, user } = useSelector(
    (state) => state.userAuthSlice
  );
  console.log("loggedIn, isLoading,", loggedIn, isLoading);
  // const { isLogin, isLoading ,user} = useSelector((state) => state.adminSlice);
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn && !isLoading) {
      console.log("access");
      // router.push("/admin/signin");
      router.push("/signin");
    }
  }, [loggedIn, isLoading]);
  // if (isLoading) {
  //   return (
  //     <Modal isOpen={isLoading}>
  //       <div className="flex justify-center  p-6">
  //         <div className="loader "></div>
  //       </div>
  //     </Modal>
  //   );
  // }
  return (
    // <div className="min-h-screen bg-[#F5F8FE] p-0 m-0">
    <div className="min-h-screen p-0 m-0 pt-28">
      {isLoading ? (
        <Modal isOpen={isLoading}>
          <div className="flex justify-center  p-6">
            <div className="loader "></div>
          </div>
        </Modal>
      ) : loggedIn ? (
        <div className="flex  mb-16   mx-0 sm:mx-4 md:mx-8 ">
          <Sidebar />

          <div className="w-full mt-4">{props.children}</div>
        </div>
      ) : (
        // <div className="flex w-full">
        //   <Sidebar />
        //   <div className="px-8 w-10/12">
        //     {/* <Breadcrumbs /> */}
        //     {props.children}
        //   </div>
        // </div>
        ""
      )}
    </div>
  );
};

export default AdminContainer;
