import { CREATE_ROLE, GET_MENUS } from "@/api/AdminApi";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CreateAffiliateForm = () => {
  const [site, setSite] = useState("");
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([
    "Clothing",
    "Footware",
    "Technology",
    "Electronics",
  ]);
  const formHandler = () => {
    setLoading(true);
    console.log("formSubmitted");
    axios({
      method: "POST",
      url: CREATE_ROLE,
      headers: { Authorization: localStorage.getItem("token") },
      data: {
        site,
        menus,
      },
    })
      .then((res) => {
        toast.success(res.data.message);
        resetHandler();
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
      });
  };

  const resetHandler = () => {
    // setRole("");
    let resetMenu = [];
    menus.forEach((item) => {
      resetMenu.push({
        ...item,
        selectAll: false,
        view: false,
        edit: false,
        delete: false,
      });
    });
    setMenus(resetMenu);
  };

  return (
    <div className="p-4 rounded-b-lg bg-white shadow-sm">
      <p className="text-admin-dark-text font-bold text-xl pb-2 border-b">
        Create New Affiliate
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // formHandler();
        }}
      >
        {/* Title */}
        <div className="grid gap-1 my-4">
          <label htmlFor="site" className="text-admin-dark-text pl-1">
            Site
          </label>
          <br />
          <input
            autoFocus
            type="text"
            name="site"
            id="site"
            placeholder="Enter Site Name"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            className="w-full h-10 bg-slate-100 px-2 rounded-lg  outline-admin-primary"
          />
        </div>
        {/* Category */}
        <div className="grid gap-1 my-4">
          <label htmlFor="category" className="text-admin-dark-text pl-1">
            Category
          </label>
          <br />
          <select
            className="select w-full h-10 bg-slate-100 px-2 rounded-lg  outline-admin-primary"
            name="category"
            id="category"
            defaultValue=""
          >
            <option selected disabled value="">
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {/* <input
            autoFocus
            type="text"
            name="role"
            id="role"
            placeholder="Enter Site Name"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full h-10 bg-slate-100 px-2 rounded-lg  outline-admin-primary"
          /> */}
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

export default CreateAffiliateForm;
