import React from "react";
import DropDownMenu from "../drop-down/DropDownMenu";
import { SlUser } from "react-icons/sl";
import NavigationBar from "../side-bar/NavigationBar";
import Image from "next/image";
import { BsCart3 } from "react-icons/bs";
import Link from "next/link";
import { useSelector } from "react-redux";
import {PiProjectorScreenChartLight} from 'react-icons/pi'

function Header() {
  const { loggedIn } = useSelector((state) => state.userAuthSlice);
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
  return (
    // <div className={parentScroll ? "fixed top-0" : "static"}>
    <div>
      <div className="w-full navbar absolute z-40">
        <div className="w-full px-4">
          <Link href="/">
            <Image
              src="/logo.png"
              width={80}
              height={80}
              className="logo top-4 left-12 z-40 absolute"
              priority
              alt="logo"
            />
          </Link>

 
          <ul className="gap-4 text-sm items-center flex justify-end w-full mr-10 font-[300]">
            {/* <!-- Navbar menu content here --> */}
            <Link href="/" >Home</Link>
            <DropDownMenu />
            <Link href="/">Art Wall</Link>
            {/* <PiProjectorScreenChartLight fontSize={20}/> */}
            <div className="flex gap-4">
              <Link href="/cart">
                <BsCart3
                  fontSize={20}
                  className="text-[#575454] cursor-pointer"
                />
              </Link>

              {loggedIn ? (
                <Link href="/account/profile">
                  <SlUser
                    fontSize={20}
                    className="text-[#575454] cursor-pointer"
                  />
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
