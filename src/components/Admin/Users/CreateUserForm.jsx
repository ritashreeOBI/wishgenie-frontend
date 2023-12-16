import { CREATE_ROLE, CREATE_USER, GET_MENUS, GET_ROLES } from "@/api/AdminApi";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CreateUserForm = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    axios({
      method: "GET",
      url: GET_ROLES,
      headers: { Authorization: localStorage.getItem("u-token") },
    })
      .then((res) => {
        console.log("res", res);
        setRoles(res.data.roles);
      })
      .catch((err) => {});
  }, []);

  const formHandler = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: CREATE_USER,
      headers: { Authorization: localStorage.getItem("u-token") },
      data: {
        email,
        userName,
        password,
        roleId: selectedOption,
      },
    })
      .then((res) => {
        toast.success(res.data.message);
        resetHandler();
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setLoading(false);
      });
  };

  const resetHandler = () => {
    setEmail("");
    setUserName("");
    setPassword("");
    setSelectedOption("");
  };
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  console.log("selectedOption", selectedOption);
  return (
    <div className="p-4 rounded-b-lg bg-white shadow-sm min-h-full">
      <p className="text-admin-dark-text font-bold text-xl pb-2 border-b">
        Add New User
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formHandler();
        }}
      >
        {/* UserName */}
        <div className="grid gap-1 my-4">
          <label htmlFor="userName" className="text-admin-dark-text pl-1">
            userName
          </label>
          <br />
          <input
            autoFocus
            required={true}
            minLength={3}
            type="text"
            name="userName"
            id="userName"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full h-10 bg-slate-100 px-2 rounded-lg  outline-admin-primary"
          />
        </div>

        {/* Email */}
        <div className="grid gap-1 my-4">
          <label htmlFor="email" className="text-admin-dark-text pl-1">
            Email
          </label>
          <br />
          <input
            autoFocus
            required={true}
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 bg-slate-100 px-2 rounded-lg  outline-admin-primary"
          />
        </div>

        {/* setPassword */}
        <div className="grid gap-1 my-4">
          <label htmlFor="password" className="text-admin-dark-text pl-1">
            Password
          </label>
          <br />
          <input
            type="password"
            name="password"
            required={true}
            minLength={6}
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 bg-slate-100 px-2 rounded-lg  outline-admin-primary"
          />
        </div>
        {/* Roles */}
        <div className="grid gap-1 my-4">
          <div className="form-control w-full ">
            <label htmlFor="password" className="text-admin-dark-text pl-1">
              Select Role
            </label>{" "}
            <br />
            <select
              className="select select-none w-full h-10 bg-slate-100 px-2 rounded-lg  outline-admin-primary"
              value={selectedOption}
              onChange={handleOptionChange}
              required={true}
            >
              <option value="" disabled selected>
                Pick one
              </option>
              {roles.map((role) => (
                <option key={role.r_id} value={role.r_id}>
                  {role.role}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={resetHandler}
            disabled={loading}
            type="reset"
            className="bg-admin-light-text text-white px-4 py-3 rounded-lg mr-2 w-48"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-admin-primary text-white px-4 py-3 rounded-lg  w-48"
            disabled={loading}
          >
            {!loading ? "Create" : "Please wait..."}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
