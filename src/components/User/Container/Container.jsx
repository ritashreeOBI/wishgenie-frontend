import React from "react";
import Menu from "../Menu/Menu";
import { Avatar, HStack, VStack , Text, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { MdLocationPin } from "react-icons/md";


const Container = (props) => {
  const { loggedIn , user } = useSelector((state) => state.userAuthSlice);
  return (
    // <div className="flex mt-32 mb-16  w-[95%] mx-auto md:mx-10 bg-slate-50  p-4 shadow  rounded ">
    <div className="flex flex-col gap-8  mt-32 mb-16 rounded-xl bg-white p-8  mx-0 sm:mx-4 md:mx-8 ">
      <HStack gap={12} alignItems={'flex-start'}>
        {
             loggedIn ?
             <Avatar src={user?.profile} size={'2xl'} />
             :
             <Avatar name={user?.userName} size={'2xl'}/>
          }
          <VStack alignItems={'flex-start'} gap={1} className="w-full">
          <Text fontSize={'xl'} fontWeight={'bold'}>{user?.userName}</Text>
          <Text fontSize={'sm'} fontWeight={'bold'}>{user?.email}</Text>
          <Text fontSize={'xs'} fontWeight={'bold'} opacity={'60%'} display={'flex'} alignItems={'center'} gap={2} >
            <MdLocationPin /> New York, USA
          </Text>
          </VStack>
          <Button rounded={'full'} bg={'blue.400'} color={'white'}>Edit Profile</Button>
      </HStack>
      <HStack alignItems={'flex-start'}>
       <Menu />
       <div className="w-full ">{props.children}</div> 

      </HStack>
      
    </div>
  );
};

export default Container;
