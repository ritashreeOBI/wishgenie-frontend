import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_PAGES } from "@/api/AdminApi";

const Faq = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios({ method: "GET", url: `${GET_PAGES}?name=faq` })
      .then((res) => {
        console.log("res.data", res.data?.result[0]?.content[0]);
        setData(res.data?.result[0]?.content[0]);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <div className="min-h-screen w-full bg-white mt-28 mb-4 p-8">
      <h2 className="font-bold text-2xl pb-4">FAQ</h2>
      <HTMLContent html={data} />
    </div>
  );
};

export default Faq;

const HTMLContent = ({ html }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
