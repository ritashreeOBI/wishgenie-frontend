import { ADMIN_LOGIN } from "@/api/AdminApi";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from "@/redux/slice/admin/adminSlice";
const SigninForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.adminSlice);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;

      default:
        break;
    }
  };

  const formHandler = (e) => {
    e.preventDefault();
    axios({
      url: ADMIN_LOGIN,
      method: "POST",
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        console.log('response.data', response.data)
        const { message, user, token } = response.data;
        toast.success(message);
        dispatch(loginHandler({ user, token }));

        setTimeout(() => {
          router.push("/admin");
        }, 2000);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // toast.error(err.response.data.message);
      });
  };
  React.useEffect(() => {
    if (isLogin) {
      router.push("/admin");
    }
  }, []);
  return (
    <div className="mt-32 h-screen flex justify-center">
      <div className="w-full max-w-sm">
        <form
          className="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4"
          onSubmit={formHandler}
        >
          <div className="flex justify-center pb-4 relative">
            <img src="/logo.png" alt="logo" className="w-28 h-auto" />
            <div className="absolute bottom-[13px] left-[70%] font-bold text-slate-600">
              | ADMIN
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Email"
            >
              Email
            </label>
            <br />
            <input
              className=" appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
              id="Email"
              type="text"
              placeholder="Email address"
              name="email"
              value={email}
              onChange={changeHandler}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <br />
            <input
              className="appearance-none border border-slate-300 rounded-2xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight  focus:outline-blue-500"
              id="password"
              type="password"
              placeholder="******************"
              name="password"
              value={password}
              onChange={changeHandler}
            />
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          {/* <p className="pt-8 text-zinc-500">
            Don't have an account ?{" "}
            <Link href="/signup" className="text-sky-700 hover:font-bold">
              Sign Up
            </Link>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
