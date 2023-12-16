import { userLogoutHandler } from '@/redux/slice/user/userAuth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";


function NavigationBar() {

    const [checked, setChecked] = useState(true)
    const { user, loggedIn } = useSelector(
        (state) => state.userAuthSlice);
    const dispatch = useDispatch()
    const Router = useRouter()
    const navigationRef = useRef(null);

    const logoutHandler = () => {
        dispatch(userLogoutHandler());
        toast.success("Logout Successfully");
        Router.push("/");
        setChecked(false)
    };

    const signUpHandler = () => {
        Router.push('/signin')
        setChecked(false)
    }

    useEffect(() => {
        // Function to handle clicks outside of the navigation menu
        const handleClickOutside = (event) => {
          if (navigationRef.current && !navigationRef.current.contains(event.target)) {
            setChecked(false); // Close the menu when clicked outside
          }
        };
    
        // Add the event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);
    
        // Clean up the event listener when the component unmounts
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    return (
        <div className='slidebar'>
            <input type={checked ? 'checkbox' : ''} id="navcheck" className='slider' role="button" title="menu" />
            <label className='toggler' onClick={() => setChecked(true)} htmlFor="navcheck" aria-hidden="true" title="menu">
                <span className="burger">
                    <span className="bar">
                        <span className="visuallyhidden">Menu</span>
                    </span>
                </span>
            </label>

            <nav className='flex flex-col items-center   gap-10 ' ref={navigationRef} >
                <div id="profile" className='flex gap-4 flex-row  items-center'>
                    <div className='bg-blue-300 w-14 h-14  rounded-full flex flex-row  justify-center items-center'>
                        <p className='text-3xl'>{user?.userName[0] || 'G'}</p>
                    </div>
                    <div>
                        <p className='text-lg text-white'> {user?.userName || "Guest User"}</p>
                        <p className='text-xs font-medium text-white'>{user?.email || ""}</p>
                    </div>
                </div>
                <div className='flex  flex-col w-full  items-start'>
                    <Link href="/" onClick={() => setChecked(false)}>Home</Link>
                    <Link href="#" onClick={() => setChecked(false)} >Custom Products</Link>
                    <Link href="#" onClick={() => setChecked(false)}>Art Wall</Link>
                    <Link href="/account/profile" onClick={() => setChecked(false)}>Profile</Link>
                    <Link href="/cart" onClick={() => setChecked(false)}>Cart</Link>
                    <Link href="/faq" onClick={() => setChecked(false)} className='text-sm opacity-50 ml-8'>FAQ</Link>
                    <Link href="/about" onClick={() => setChecked(false)} className='text-sm opacity-50 ml-8'>ABOUT US</Link>
                    <Link href="#" onClick={() => setChecked(false)} className='text-sm opacity-50 ml-8'>TERMS OF USE</Link>
                    <Link href="#" onClick={() => setChecked(false)} className='text-sm opacity-50 ml-8'>PRIVACY POLICY</Link>
                </div>

                {
                    user?.email ?
                        <button onClick={logoutHandler} className='border border-white px-10 py-3 border rounded-md text-sky-700'>
                            Logout
                        </button>
                        :
                        <button onClick={signUpHandler} className='border border-white px-10 py-3 border rounded-md text-sky-700'>
                            Login
                        </button>
                }


            </nav>




        </div>
    )
}

export default NavigationBar