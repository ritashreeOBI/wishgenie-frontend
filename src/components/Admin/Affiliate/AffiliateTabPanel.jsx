import React, { useState } from "react";
import CreateAffiliateForm from "./CreateAffiliateForm";
import AffiliateList from "./AffiliateList";

const AffiliateTabPanel = () => {
  const [selectedTab, setSelectedTab] = useState(2);
  const tabChangeHandler = (value) => {
    setSelectedTab(value);
  };
  return (
    <div>
      <div className="flex justify-between tabs tabs-boxed p-3 bg-admin-primary rounded-t-2xl rounded-b-none font-bold ">
        <a
          className={`tab  ${
            selectedTab === 2
              ? "bg-slate-100 text-admin-dark-text "
              : "text-white"
          }`}
          onClick={() => tabChangeHandler(2)}
        >
          Affiliates
        </a>
        <a
          className={`tab ${
            selectedTab === 1
              ? "bg-slate-100 text-admin-dark-text "
              : "text-white"
          }`}
          onClick={() => tabChangeHandler(1)}
        >
         Create New
        </a>
      </div>
      {selectedTab === 1 ? <CreateAffiliateForm /> : <AffiliateList />}
    </div>
  );
};

export default AffiliateTabPanel;
