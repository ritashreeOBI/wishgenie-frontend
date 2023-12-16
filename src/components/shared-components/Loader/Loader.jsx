import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50 "></div>
      <div className="bg-white rounded-md p-3 z-10 flex justify-center items-center">
        <span className="loader "></span>
      </div>
    </div>
  );
};

export default Loader;
