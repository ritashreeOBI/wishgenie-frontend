import React, { useState } from "react";
import CreateRoleForm from "./CreateRoleForm";
import RoleList from "./RoleList";

const RolesTabPanel = () => {
  const [selectedTab, setSelectedTab] = useState(2);
  const tabChangeHandler = (value) => {
    setSelectedTab(value);
  };
  return (
    <div>
      <div className="flex justify-between tabs tabs-boxed p-3 bg-admin-primary rounded-t-2xl rounded-b-none font-bold">
        <a
          className={`tab  ${
            selectedTab === 2
              ? "bg-slate-100 text-admin-dark-text "
              : "text-white"
          }`}
          onClick={() => tabChangeHandler(2)}
        >
          Roles
        </a>
        <a
          className={`tab ${
            selectedTab === 1
              ? "bg-slate-100 text-admin-dark-text "
              : "text-white"
          }`}
          onClick={() => tabChangeHandler(1)}
        >
          Add New Role
        </a>
      </div>
      {selectedTab === 1 ? <CreateRoleForm /> : <RoleList />}
    </div>
  );
};

export default RolesTabPanel;
