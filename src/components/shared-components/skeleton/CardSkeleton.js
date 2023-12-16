import React from "react";

function CardSkeleton() {
  return (
    <div className="w-60  border-2 rounded-md   bg-white">
      <div className="flex animate-pulse flex-col gap-4  h-full  p-2">
        <div className="w-full bg-gray-300 h-72 rounded-md"></div>
        <div className="flex flex-col space-y-3">
          <div className="w-full bg-gray-300 h-8 rounded-md "></div>
          <div className="flex justify-between">
            <div className="w-12 bg-gray-300 h-5 rounded-md "></div>
            <div className="w-20 bg-gray-300 h-5 rounded-md "></div>
            <div className="w-20 bg-gray-300 h-5 rounded-md "></div>
          </div>
          <div className="border"></div>
          <div className="w-12 bg-gray-300 h-5 rounded-md "></div>
          <div className="w-24 bg-gray-300 h-4 rounded-md "></div>
          <div className="w-full bg-gray-300 h-4 rounded-md "></div>
        </div>
      </div>
    </div>
  );
}

export default CardSkeleton;
