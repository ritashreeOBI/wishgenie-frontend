import React, { useEffect, useState } from "react";
import Card from "../card/Card";

function Productlist({ list, isloading }) {

  const [count, setCount] = useState(2);

  // useEffect(() => {
  //   if (list?.length > 0) {
  //     const interval = setInterval(() => {
  //       setCount((prevCount) => {
  //         if (prevCount <= list.length) {
  //           return prevCount + 10;
  //         } else {
  //           clearInterval(interval);
  //           return list.length;
  //         }
  //       });
  //     }, 2000); //

  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  // }, []);

  return (
    <>
      {list
        // ?.slice(0, count)
        //.filter((data) => data?.price?.value || data.price)
        .map((pro, idx) => {
          return (
            <div
              className={`flex flex-col gap-2 transition delay-150 duration-300 ease-in-out cursor-pointer`}
              key={idx}
            >
              <Card pro={pro} />
            </div>
          );
        })}
    </>
  );
}

export default Productlist;
