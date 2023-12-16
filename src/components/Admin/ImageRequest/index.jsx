import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { imageApproveRequest } from './dummy'
import Image from 'next/image'
import Request from './Request'
import axios from 'axios'
import { IMAGE_APPORVAL_REQUEST } from '@/api/Api'

function ImageRequestMain() {
   
    const [approvalRequests , setApprovalRequests] = useState([])
    const [update, setUpdate] = useState(false)
   
    const getRequestList = async () =>{
        try {
        const {data} = await axios.get(IMAGE_APPORVAL_REQUEST)
        console.log(data)
        setApprovalRequests(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getRequestList()
    },[update])

    return (
        <Box className='overflow-x-auto p-6 rounded-2xl bg-white shadow-sm gap-4 ' >
            <Text fontSize={'2xl'} >Image Approval Requests</Text>
            <Text fontSize={'xs'} opacity={'50%'} mb={'2'} >section to view product detail also you can increase price from here.</Text>
           <Box className='flex flex-wrap gap-4'>
           <Request data={approvalRequests } setUpdate={setUpdate} />
            </Box>
        </Box>
    )
}

export default ImageRequestMain