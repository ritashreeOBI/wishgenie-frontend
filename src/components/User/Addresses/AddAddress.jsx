import SaveLoadingButton from "@/components/shared-components/Button/SaveLoadingButton";
import {
  addUserAddresses,
  getUserAddresses,
} from "@/redux/slice/user/userAddressSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdMyLocation, MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AddAddress = ({ showForm, onFormClose }) => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressType, setAddressType] = useState("home");
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log("data", data);
    const addressData = { ...data, type: addressType };
    setIsSubmitting(true);
    dispatch(addUserAddresses(addressData))
      .then(unwrapResult)
      .then(() => {
        dispatch(getUserAddresses());
        toast.success("Address added successfully", { autoClose: 1000 });
        if (showForm) {
          onFormClose();
        }
      })
      .finally((e) => {
        setIsSubmitting(false);
      });
  };

  const isRadioSelected = (value) => addressType === value;

  const detectCurrentLocation = () => {
    console.log("clicked");
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      // Prompt user for permission to access their location
      navigator.geolocation.getCurrentPosition(
        // Success callback function
        function (position) {
          // Get the user's latitude and longitude coordinates
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Update the map with the user's new location
          console.log(`Latitude: ${lat}, longitude: ${lng}`);
          var requestOptions = {
            method: "GET",
          };

          fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=ba49a0c398cf4e5f9eda5c7868ecef3d`,
            requestOptions
          )
            .then((response) => response.json())
            .then((result) => {
              console.log("result", result);
              const { properties } = result.features[0];
              setValue("city", properties.city, { shouldValidate: true });
              setValue("state", properties.state, { shouldValidate: true });
              setValue("street", properties.street, { shouldValidate: true });
              setValue("zipcode", properties.postcode, {
                shouldValidate: true,
              });
            })
            .catch((error) => {
              console.log("error", error);
              toast.warning(error.message, { autoClose: 2000 });
            });
        },
        // Error callback function
        function (error) {
          // Handle errors, e.g. user denied location sharing permissions
          console.error("Error getting user location:", error);
          toast.warning(error.message, { autoClose: 2000 });
        }
      );
    } else {
      toast.warning("Geolocation is not supported by this browser.", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      <form
        className="border rounded-xl p-3 my-4 shadow-sm px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4 flex justify-between">
          <p className="text-lg font-semibold text-blue-500 flex items-center">
            Add A New Address &nbsp;&nbsp;{" "}
            {showForm && (
              <MdClose
                className="text-gray-600 font-bold text-2xl hover:cursor-pointer"
                onClick={onFormClose}
              />
            )}
          </p>
          <button
            type="button"
            className="flex items-center text-sm bg-blue-400 hover:bg-blue-700 text-white min-w-[200px]  mr-0 text-center  py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline"
            onClick={detectCurrentLocation}
          >
            <MdMyLocation />
            &nbsp; use my current location
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2">
          {/* ============== NAME =============== */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <br />
            <input
              className=" appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
              id="name"
              type="text"
              placeholder="Name"
              name="name"
              minLength={3}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-xs ml-2 text-red-500">Name required</span>
            )}
          </div>
          {/* ============== street =============== */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="street"
            >
              Street
            </label>
            <br />
            <input
              className=" appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
              id="street"
              type="text"
              placeholder="Street"
              name="street"
              minLength={3}
              {...register("street", { required: true })}
            />
            {errors.street && (
              <span className="text-xs ml-2 text-red-500">Street required</span>
            )}
          </div>
          {/* ============== city =============== */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <br />
            <input
              className=" appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
              id="city"
              type="text"
              placeholder="City"
              name="city"
              minLength={3}
              {...register("city", { required: true })}
            />
            {errors.city && (
              <span className="text-xs ml-2 text-red-500">City required</span>
            )}
          </div>
          {/* ============== state =============== */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="state"
            >
              State
            </label>
            <br />
            <input
              className=" appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
              id="state"
              type="text"
              placeholder="State"
              name="state"
              minLength={3}
              {...register("state", { required: true })}
            />
            {errors.state && (
              <span className="text-xs ml-2 text-red-500">State required</span>
            )}
          </div>
          {/* ============== zipcode =============== */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="zipcode"
            >
              Zipcode
            </label>
            <br />
            <input
              className=" appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
              id="zipcode"
              type="number"
              placeholder="Zipcode"
              name="zipcode"
              minLength={5}
              {...register("zipcode", { required: true })}
            />
            {errors.zipcode && (
              <span className="text-xs ml-2 text-red-500">
                Zipcode required
              </span>
            )}
          </div>
          {/* ============== phone =============== */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <br />
            <input
              className=" appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
              id="phone"
              type="text"
              placeholder="Phone"
              name="phone"
              minLength={10}
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <span className="text-xs ml-2 text-red-500">Phone required</span>
            )}
          </div>
        </div>
        {/* ============== Button =============== */}
        <div className="flex  flex-col md:flex-row  md:justify-between">
          <div className="md:w-28 flex justify-between">
            <div>
              <label>
                <input
                  type="radio"
                  value="home"
                  checked={isRadioSelected("home")}
                  className="mr-1"
                  onChange={(e) => setAddressType(e.currentTarget.value)}
                />
                Home
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="office"
                  className="mr-1 "
                  checked={isRadioSelected("office")}
                  onChange={(e) => setAddressType(e.currentTarget.value)}
                />
                Office
              </label>
            </div>
          </div>

          <div>
            {!isSubmitting ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white min-w-full md:min-w-[220px]   mr-0 text-center font-semibold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isSubmitting}
              >
                Save Address
              </button>
            ) : (
              <SaveLoadingButton />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
