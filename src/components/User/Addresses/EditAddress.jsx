import { UPDATE_ADDRESS } from "@/api/Api";
import SaveLoadingButton from "@/components/shared-components/Button/SaveLoadingButton";
import {
  addUserAddresses,
  getUserAddresses,
  setSelectedAddress,
  updateUserAddress,
} from "@/store/slices/user/userAddressSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdMyLocation, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditAddress = ({ showForm, onFormClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedAddress } = useSelector((state) => state.userAddressSlice);
  const [addressType, setAddressType] = useState(selectedAddress.type);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: selectedAddress,
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log("data", data);
    const addressData = { ...data, type: addressType };
    setIsSubmitting(true);
    dispatch(updateUserAddress(addressData))
      .then(unwrapResult)
      .then(() => {
        dispatch(getUserAddresses());
        dispatch(setSelectedAddress({}));
        toast.success("Address updated successfully", { autoClose: 1000 });
      })
      .catch((err) => {
        console.log("err", err);
        toast.warning(err.message, { autoClose: 1000 });
      })
      .finally((e) => {
        setIsSubmitting(false);
      });
    // event.preventDefault();
  };

  const isRadioSelected = (value) => addressType === value;

  // const detectCurrentLocation = () => {
  //   console.log("clicked");
  //   // Check if geolocation is supported by the browser
  //   if ("geolocation" in navigator) {
  //     // Prompt user for permission to access their location
  //     navigator.geolocation.getCurrentPosition(
  //       // Success callback function
  //       function (position) {
  //         // Get the user's latitude and longitude coordinates
  //         const lat = position.coords.latitude;
  //         const lng = position.coords.longitude;

  //         // Update the map with the user's new location
  //         console.log(`Latitude: ${lat}, longitude: ${lng}`);
  //         var requestOptions = {
  //           method: "GET",
  //         };

  //         fetch(
  //           `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=ba49a0c398cf4e5f9eda5c7868ecef3d`,
  //           requestOptions
  //         )
  //           .then((response) => response.json())
  //           .then((result) => {
  //             console.log("result", result);
  //             const { properties } = result.features[0];
  //             setValue("city", properties.city, { shouldValidate: true });
  //             setValue("state", properties.state, { shouldValidate: true });
  //             setValue("street", properties.street, { shouldValidate: true });
  //             setValue("zipcode", properties.postcode, {
  //               shouldValidate: true,
  //             });
  //           })
  //           .catch((error) => {
  //             console.log("error", error);
  //             toast.warning(error.message, { autoClose: 2000 });
  //           });
  //       },
  //       // Error callback function
  //       function (error) {
  //         // Handle errors, e.g. user denied location sharing permissions
  //         console.error("Error getting user location:", error);
  //         toast.warning(error.message, { autoClose: 2000 });
  //       }
  //     );
  //   } else {
  //     toast.warning("Geolocation is not supported by this browser.", {
  //       autoClose: 2000,
  //     });
  //   }
  // };

  return (
    <div>
      <form
        className="border rounded-xl p-3 my-4 shadow-sm px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4 flex justify-between">
          <p className="text-lg font-semibold text-blue-500 flex items-center">
            Edit Address &nbsp;&nbsp;{" "}
            {selectedAddress?.addressId && (
              <MdClose
                className="text-gray-600 font-bold text-2xl hover:cursor-pointer"
                onClick={() => dispatch(setSelectedAddress({}))}
              />
            )}
          </p>
          {/* <button
            type="button"
            className="flex items-center text-sm bg-blue-400 hover:bg-blue-700 text-white min-w-[200px]  mr-0 text-center  py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline"
            onClick={detectCurrentLocation}
          >
            <MdMyLocation />
            &nbsp; use my current location
          </button> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2">
          {/* ============== NAME =============== */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
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
              <span className="text-xs ml-2 text-red-500">
                Please fill in your full name.
              </span>
            )}
          </div>
          {/* ============== Company =============== */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="company"
            >
              Company (optional)
            </label>
            <input
              className=" appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
              id="company"
              type="text"
              placeholder="Company"
              name="company"
              minLength={3}
              {...register("company")}
            />
          </div>
          {/* ============== AddressLineOne =============== */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="addressLineOne"
            >
              Address Line 1
            </label>
            <input
              className="appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
              id="addressLineOne"
              type="text"
              placeholder="Address Line 1"
              name="addressLineOne"
              minLength={3}
              {...register("addressLineOne", { required: true })}
            />
            {errors.addressLineOne && (
              <span className="text-xs ml-2 text-red-500">
                Please fill in Address Line 1.
              </span>
            )}
          </div>
          {/* ============== Phone No =============== */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNo"
            >
              Phone Number
            </label>
            <input
              className="appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
              id="phoneNo"
              type="text"
              placeholder="Phone Number"
              name="phoneNo"
              minLength={3}
              {...register("phoneNo", { required: true })}
            />
            {errors.phoneNo && (
              <span className="text-xs ml-2 text-red-500">
                Please fill in Phone Number.
              </span>
            )}
          </div>
          {/* ============== AddressLineTwo =============== */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="addressLineTwo"
            >
              Address Line 2 (optional)
            </label>
            <input
              className="appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
              id="addressLineTwo"
              type="text"
              placeholder="Address Line Two"
              name="addressLineTwo"
              minLength={3}
              {...register("addressLineTwo")}
            />
          </div>
          {/* ============== email =============== */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email (optional)
            </label>
            <input
              className=" appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
              id="email"
              type="text"
              placeholder="Email Address"
              name="email"
              minLength={3}
              {...register("email")}
            />
          </div>
          {/* ============== country =============== */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="country"
            >
              Country
            </label>
            <input
              className=" appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
              id="country"
              type="text"
              placeholder="Country"
              name="country"
              minLength={3}
              {...register("country", { required: true })}
            />
            {errors.country && (
              <span className="text-xs ml-2 text-red-500">
                Please Select Country.
              </span>
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
                Please fill in the Zip Code.
              </span>
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
              <span className="text-xs ml-2 text-red-500">
                Please select State.
              </span>
            )}
          </div>
        </div>
        {/* ============== Button =============== */}
        <div className="flex  flex-col md:flex-row  md:justify-between">
          {/* <div className="md:w-28 flex justify-between">
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
          </div> */}

          <div>
            {!isSubmitting ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white min-w-full md:min-w-[220px]   mr-0 text-center font-semibold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isSubmitting}
              >
                update Address
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

export default EditAddress;
