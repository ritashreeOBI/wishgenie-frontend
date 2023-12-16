import { CREATE_ROLE, GET_MENUS } from "@/api/AdminApi";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CreateRoleForm = () => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios({
      method: "GET",
      url: GET_MENUS,
      headers: {
        Authorization: localStorage.getItem("u-token"),
      },
    })
      .then((res) => {
        console.log("res.data", res.data.menus);
        let updatedMenus = [];
        res.data.menus.forEach((menu) => {
          const mn = {
            ...menu,
            selectAll: false,
            view: false,
            edit: false,
            delete: false,
          };
          updatedMenus.push(mn);
        });
        console.log("updatedMenus", updatedMenus);
        setMenus(updatedMenus);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        console.log("failed to fetch menus");
        setLoading(false);
      });
  }, []);

  const formHandler = () => {
    setLoading(true);
    console.log("formSubmitted");
    axios({
      method: "POST",
      url: CREATE_ROLE,
      headers: { Authorization: localStorage.getItem("u-token") },
      data: {
        role,
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
    setRole("");
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
  const checkboxHandler = (menuId, option, value) => {
    switch (option) {
      case "selectAll":
        const updatedMenu = menus.map((item) => {
          if (item.m_id === menuId) {
            const newMenu = {
              ...item,
              selectAll: value,
              view: value,
              edit: value,
              delete: value,
            };
            return newMenu;
          } else return item;
        });
        setMenus(updatedMenu);
        break;
      case "view":
        const updatedVMenu = menus.map((item) => {
          if (item.m_id === menuId) {
            const newMenu = {
              ...item,
              view: value,
              selectAll: item.edit || item.delete || value ? true : false,
            };
            return newMenu;
          } else return item;
        });
        setMenus(updatedVMenu);
        break;
      case "edit":
        const updatedEMenu = menus.map((item) => {
          if (item.m_id === menuId) {
            const newMenu = {
              ...item,
              edit: value,
              selectAll: item.view || item.delete || value ? true : false,
            };
            return newMenu;
          } else return item;
        });
        setMenus(updatedEMenu);
        break;
      case "delete":
        const updatedDMenu = menus.map((item) => {
          if (item.m_id === menuId) {
            const newMenu = {
              ...item,
              delete: value,
              selectAll: item.edit || item.view || value ? true : false,
            };
            return newMenu;
          } else return item;
        });
        setMenus(updatedDMenu);
        break;

      default:
        break;
    }
  };
  return (
    <div className="p-4 rounded-b-lg bg-white shadow-sm">
      <p className="text-admin-dark-text font-bold text-xl pb-2 border-b">
        Add New Role
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formHandler();
        }}
      >
        {/* Title */}
        <div className="grid gap-1 my-4">
          <label htmlFor="role" className="text-admin-dark-text pl-1">
            Role
          </label>
          <br />
          <input
            autoFocus
            type="text"
            name="role"
            id="role"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full h-10 bg-slate-100 px-2 rounded-lg  outline-admin-primary"
          />
        </div>
        <div className="my-4">
          <p className="text-admin-dark-text pl-1 pb-1">Add Menu Permissions</p>
          <div className="overflow-x-auto w-full">
            <table className="table table-xs w-full  ">
              {/* head */}
              <thead>
                <tr>
                  <th className="bg-slate-100">Select</th>
                  <th className="bg-slate-100">Menu</th>
                  <th className="text-center bg-slate-100 ">View</th>
                  <th className="text-center bg-slate-100">Edit</th>
                  <th className="text-center bg-slate-100">Delete</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {menus.map((menu, i) => (
                  <tr
                    key={menu.m_id}
                    className={`border-x border-x-slate-100 ${
                      i === menus.length - 1
                        ? "border-b border-b-slate-200 rounded-e-sm"
                        : ""
                    }`}
                  >
                    <td className="w-4">
                      <input
                        type="checkbox"
                        className="w-3 h-3 "
                        checked={menu.selectAll}
                        onChange={(e) =>
                          checkboxHandler(
                            menu.m_id,
                            "selectAll",
                            e.target.checked
                          )
                        }
                        value={menu.selectAll}
                      />
                    </td>
                    <td className="capitalize flex-1">{menu.m_name}</td>
                    <td className="w-3 text-center">
                      <input
                        type="checkbox"
                        className="w-3 h-3"
                        checked={menu.view}
                        onChange={(e) =>
                          checkboxHandler(menu.m_id, "view", e.target.checked)
                        }
                        value={menu.view}
                      />
                    </td>
                    <td className="w-3 text-center">
                      <input
                        type="checkbox"
                        className="w-3 h-3"
                        checked={menu.edit}
                        onChange={(e) =>
                          checkboxHandler(menu.m_id, "edit", e.target.checked)
                        }
                        value={menu.edit}
                      />
                    </td>
                    <td className="w-3 text-center">
                      <input
                        type="checkbox"
                        className="w-3 h-3"
                        checked={menu.delete}
                        onChange={(e) =>
                          checkboxHandler(menu.m_id, "delete", e.target.checked)
                        }
                        value={menu.delete}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default CreateRoleForm;
