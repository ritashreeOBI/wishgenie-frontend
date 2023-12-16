import Link from 'next/link'
import React from 'react'
import { AiOutlineSetting, AiOutlineUser } from 'react-icons/ai'
import { BsBell, BsFillDoorOpenFill } from 'react-icons/bs'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import { BiBell } from 'react-icons/bi'

function AdminHeader() {
    return (
        <div className='flex flex-row jsu justify-between bg-white shadow-md p-4 w-full'>
            <div>
                <Breadcrumbs />
            </div>
            <div className='flex flex-row items-center gap-4'>

                <div className=' border-r  px-6'>

                  <div className='indicator '>
                    
                    <BsBell fontSize={'20'} />
                    <span className="indicator-item badge text-xs">8</span>
                    </div>

                </div>    
                
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className=" m-1 mr-4 flex items-center">
                        <div className=" w-9 h-9 flex  rounded-full bg-admin-primary items-center justify-center text-white text-2xl ">

                            O

                        </div>
                        <p className="text-xl pl-2">OBI</p>

                    </label>
                    <ul tabIndex={0} className="dropdown-content z-[1] mt-2 menu p-2 shadow flex flex-col gap-2 bg-base-100 rounded-box w-[100px]">
                        <div className="p-2 border-b cursor-pointer border-[#e2e8f0]">
                            <div className="flex flex-col items-left text-left">
                                OBI
                                <span className="flex text-xs opacity-50">admin@obi.com</span>
                            </div>
                            <p className="text-sm"></p>
                        </div>

                        <Link href={'/profile/detail'} className="flex gap-2 p-2 hover:bg-[#00000020] rounded-md">

                            <AiOutlineUser /> Profile
                        </Link>
                        <Link href={'/profile/settings'} className="flex flex-row  gap-2 p-2 hover:bg-[#00000020] rounded-md">

                            <AiOutlineSetting /> Settings
                        </Link>
                        <button className="bg-dark rounded-md cursor-pointer text-white hover:bg-[#f1f5f9] hover:text-dark flex p-2 items-center flex-row gap-2">
                            <BsFillDoorOpenFill />
                            <a>Logout</a>
                        </button>
                    </ul>
                </div>

            </div>


        </div>
    )
}

export default AdminHeader