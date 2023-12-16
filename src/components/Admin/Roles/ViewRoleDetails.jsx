import {
  CREATE_ROLE,
  GET_MENUS,
  GET_ROLE_DETAILS,
  UPDATE_ROLE,
} from "@/api/AdminApi";
import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ViewRoleDetails = () => {
  const [roleDetails, setRoleDetails] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [menus, setMenus] = useState([]);

  const [edit, setEdit] = useState(false);

  const router = useRouter();

  // fetch user details on mount
  useEffect(() => {
    setInitLoading(true);
    axios({
      method: "GET",
      url: `${GET_ROLE_DETAILS}?roleId=${router.query.roleId}`,
      headers: { Authorization: localStorage.getItem("u-token") },
    })
      .then((res) => {
        formatMenu(res);
        setInitLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setInitLoading(false);
      });
  }, []);

  function formatMenu(response) {
    setRoleDetails(response?.data?.role);
    setRole(response?.data?.role?.role);
    const permissions = response.data.role.role_permissions;
    let updatedMenus = [];
    permissions.forEach((permission) => {
      const mn = {
        ...permission,
        selectAll:
          permission.view || permission.edit || permission.delete || false,
        view: permission.view,
        edit: permission.edit,
        delete: permission.delete,
        menuMId: permission.menu.m_id,
        m_name: permission.menu.m_name,
      };
      updatedMenus.push(mn);
    });
    setMenus(updatedMenus);
  }

  const formHandler = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: UPDATE_ROLE,
      headers: { Authorization: localStorage.getItem("u-token") },
      data: {
        roleId: roleDetails.r_id,
        role,
        menus,
      },
    })
      .then((res) => {
        toast.success(res.data.message);
        formatMenu(res);
        setEdit(false);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
        setEdit(true);
      });
  };

  const checkboxHandler = (menuId, option, value) => {
    switch (option) {
      case "selectAll":
        const updatedMenu = menus.map((item) => {
          if (item.menuMId === menuId) {
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
          if (item.menuMId === menuId) {
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
          if (item.menuMId === menuId) {
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
          if (item.menuMId === menuId) {
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
    <div className="p-4 rounded-lg bg-white shadow-sm">
      <p className="text-admin-dark-text font-bold text-xl pb-2 border-b">
        Role Details
      </p>
      {initLoading ? (
        <div className="flex justify-center  p-10">
          <div className="loader "></div>
        </div>
      ) : (
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
              autoFocus={edit == true ? true : false}
              type="text"
              name="role"
              id="role"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full h-10 bg-slate-100 px-2 rounded-lg  outline-admin-primary"
              disabled={edit ? false : true}
            />
          </div>
          <div className="my-4">
            <p className="text-admin-dark-text pl-1 pb-1">Menu Permissions</p>
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
                      key={menu.menuMId}
                      className={`border-x border-x-slate-100 ${
                        i === menus.length - 1
                          ? "border-b border-b-slate-200 rounded-e-sm"
                          : ""
                      }`}
                    >
                      <td className={`"w-4" `}>
                        <input
                          type="checkbox"
                          className={`w-3 h-3 ${
                            !edit ? "menu-permission" : ""
                          }`}
                          checked={menu.selectAll}
                          onChange={(e) =>
                            checkboxHandler(
                              menu.menuMId,
                              "selectAll",
                              e.target.checked
                            )
                          }
                          value={menu.selectAll}
                          disabled={edit ? false : true}
                        />
                      </td>
                      <td className="capitalize flex-1">{menu.m_name}</td>
                      <td className="w-3 text-center">
                        <input
                          type="checkbox"
                          className="w-3 h-3"
                          checked={menu.view}
                          onChange={(e) =>
                            checkboxHandler(
                              menu.menuMId,
                              "view",
                              e.target.checked
                            )
                          }
                          value={menu.view}
                          disabled={edit ? false : true}
                        />
                      </td>
                      <td className="w-3 text-center">
                        <input
                          type="checkbox"
                          className="w-3 h-3"
                          checked={menu.edit}
                          onChange={(e) =>
                            checkboxHandler(
                              menu.menuMId,
                              "edit",
                              e.target.checked
                            )
                          }
                          value={menu.edit}
                          disabled={edit ? false : true}
                        />
                      </td>
                      <td className="w-3 text-center">
                        <input
                          type="checkbox"
                          className="w-3 h-3"
                          checked={menu.delete}
                          onChange={(e) =>
                            checkboxHandler(
                              menu.menuMId,
                              "delete",
                              e.target.checked
                            )
                          }
                          value={menu.delete}
                          disabled={edit ? false : true}
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
              onClick={() => {
                router.back();
              }}
              type="button"
              disabled={loading}
              className="bg-admin-light-text text-white px-4 py-3 rounded-lg mr-2 w-48"
            >
              Back
            </button>
            {!edit ? (
              <p
                onClick={() => setEdit(true)}
                disabled={loading}
                type="button"
                className="bg-admin-primary text-white px-4 py-3 rounded-lg mr-2 w-48 text-center hover:cursor-pointer"
              >
                Edit
              </p>
            ) : (
              <button
                type="submit"
                className="bg-admin-primary text-white px-4 py-3 rounded-lg  w-48"
                disabled={loading}
              >
                {!loading ? "Update Permissions" : "Please wait..."}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ViewRoleDetails;
