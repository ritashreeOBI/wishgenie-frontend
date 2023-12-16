import { Avatar, Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import SearchBar from '../components/search-bar/SearchBar'
import { categories } from '../categories'
import { MdUploadFile } from 'react-icons/md'
import Dropdown from '../components/drop-down/Dropdown'
import Router from 'next/router'
import { useState } from 'react'
import { setTokenSourceMapRange } from 'typescript'
import { useSelector } from 'react-redux'

import { STRIPE_ONBOARD, STRIPE_PAYOUT_USER } from "@/api/Api";
import { BsCart3 } from 'react-icons/bs'

function ArtWallHeader() {
  
  const { loggedIn , user } = useSelector((state) => state.userAuthSlice);
  const [loginUser, setLoginUser] = useState(false)
  const [userDetail , setUserDetail] = useState({})

  useEffect(() =>{
   const userToken = localStorage.getItem('u-token')
   const user = JSON.parse(localStorage.getItem('User'))
   if(userToken && userDetail) {
      setLoginUser(true)
      setUserDetail(user)
   }
   
  },[])



  return (
    <VStack
      alignItems={"flex-start"}
      gap={"2"}
      className="flex-start fixed top-0 w-full bg-white z-40 bg-white shadow-sm "
    >
      <HStack className="items-center bg-white  w-full border-b p-3 px-4 justify-between">
        <HStack>
          {/* <Link href="/art-wall">
          <VStack gap={0} alignItems={'flex-end'}>
          <Text fontSize={"2xl"} color={'blue.600'} fontWeight={'bold'}>Art Wall </Text>
          <Text fontSize={"6"} opacity={'50%'} mt={'-8px'} fontWeight={'bold'}>product by WishGenie </Text>
          
        </VStack>
        </Link>   */}
        <Link href="/">
            <Image
              src="/logo.png"
              width={70}
              height={70}
              className="logo mt-2 ml-8 z-40 "
              priority
              alt="logo"
            />
          </Link>
        
        </HStack>

        <SearchBar />

        <HStack gap={10}>
           <Link href="/" >Home</Link>

            {/* <DropDownMenu /> */}
            <Link className='font-[400] text-sm font-bold' href={'/products/custom-products'} >Create Your Wish </Link> 
           
            {/* <PiProjectorScreenChartLight fontSize={20}/> */}
            <div className="flex gap-6 items-center font-bold">
              <Link href="/cart">
                <BsCart3
                  fontSize={20}
                  className="text-[#575454] cursor-pointer  "
                />
              </Link>
              </div>

          <Text
            color={"blue.400"}
            className=" font-bold border-r p-4  pr-6  text-base  "
          >
            Art Wall+
          </Text>
         
        {
           !loggedIn ?
            <Button 
              bg={'white'} 
              padding={'6'} 
              className='border bg-white ml-4'
              onClick={() => Router.push("/signin")}
              >
             
           Login
         </Button>
          : loggedIn && user ?
          <Avatar src={user?.profile} size={'md'} cursor={'pointer'} onClick={() => Router.push('/art-wall/profile')} /> 
          :""
        }
      

        <Button disabled={loggedIn} bg={'blue.500'} color={'white'} onClick={() => Router.push("/art-wall/uploads")} className='py-6'>
          <MdUploadFile className='text-2xl mr-2' /> Upload
        </Button>
        </HStack>
      </HStack>
      
    </VStack>
  );
}

export default ArtWallHeader;
