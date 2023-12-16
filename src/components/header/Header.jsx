import React, { useEffect, useState } from "react";
import DropDownMenu from "../drop-down/DropDownMenu";
import { SlUser } from "react-icons/sl";
import NavigationBar from "../side-bar/NavigationBar";
import Image from "next/image";
import { BsCart3 } from "react-icons/bs";
import Link from "next/link";
import { useSelector } from "react-redux";
import { PiProjectorScreenChartLight } from 'react-icons/pi'
import { Avatar } from "@chakra-ui/react";

function Header() {
  const { loggedIn, user } = useSelector((state) => state.userAuthSlice);

  // const [parentScroll, setParentScroll] = React.useState(false);

  // React.useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     console.log("window", window.scrollY);
  //     if (window.scrollY > 10) {
  //       console.log("window", window.scrollY);
  //       //hide chat component when scroll more than 400
  //       setParentScroll(true);
  //     }
  //     if (window.scrollY < 10) {
  //       setParentScroll(false);
  //     }
  //   });
  // }, []);

  const [loginUser, setLoginUser] = useState(false)
  const [userDetail, setUserDetail] = useState({})

  useEffect(() => {
    const userToken = localStorage.getItem('u-token')
    const user = JSON.parse(localStorage.getItem('User'))
    if (userToken && userDetail) {
      setLoginUser(true)
      setUserDetail(user)
    }

  }, [])
  return (
    // <div className={parentScroll ? "fixed top-0" : "static"}>
    <div>
      <div className="w-full navbar p-0 flex flex-col  absolute z-40">

        <div className="w-full px-4">
          <Link href="/">
            <Image
              src="/logo.png"
              width={80}
              height={80}
              className="logo mt-2 ml-8 z-40 "
              priority
              alt="logo"
            />
          </Link>


          <ul className="gap-8 text-sm items-center flex font-bold justify-end w-full mr-10 font-[300]">
            {/* <!-- Navbar menu content here --> */}
            <Link href="/" className="hover:text-sky-600" >Home</Link>
            {/* <DropDownMenu /> */}
            <Link className='font-[400] hover:text-sky-600 text-sm font-bold' href={'/products/custom-products'} >Create Your Wish </Link> 
            <Link href="/art-wall" className=" hover:text-sky-600">Art Wall</Link>
            {/* <PiProjectorScreenChartLight fontSize={20}/> */}
            <div className="flex gap-6 items-center font-bold">
              <Link href="/cart">
                <BsCart3
                  fontSize={20}

                  className="text-[#575454] cursor-pointer  "
                />
              </Link>

              {user && loggedIn ? (
                <Link href="/account/profile">
                  <Avatar src={user?.profile} size={'sm'} />
                </Link>
              ) : (
                <Link href="/signin">
                  {" "}
                  <SlUser
                    fontSize={20}
                    className="text-[#575454] cursor-pointer"
                  />
                </Link>
              )}        <NavigationBar />
            </div>

          </ul>
        </div>
      </div></div>
  )
}

export default Header;
