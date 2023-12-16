import React from "react";

const CardItem = ({ heading, subHeading, icon }) => {
  return (
    <div className="rounded-3xl w-full bg-white shadow-sm p-8 flex items-center">
      <div className="bg-[#F4F7FE] w-16 h-16 rounded-full mr-4 grid place-content-center">
        {icon}
      </div>
      <div className="grid">
        <p className="text-admin-light-text">{subHeading}</p>
        <p className="font-bold text-2xl text-admin-dark-text">{heading}</p>
      </div>
    </div>
  );
};

export default CardItem;
