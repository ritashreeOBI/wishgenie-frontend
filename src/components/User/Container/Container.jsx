import React from "react";
import Menu from "../Menu/Menu";
const Container = (props) => {
  return (
    // <div className="flex mt-32 mb-16  w-[95%] mx-auto md:mx-10 bg-slate-50  p-4 shadow  rounded ">
    <div className="flex mt-32 mb-16   mx-0 sm:mx-4 md:mx-8 ">
      <Menu />

      <br />
      <div className="w-full">{props.children}</div>
    </div>
  );
};

export default Container;
