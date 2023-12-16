import React from 'react'
import { Button, Flex, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, VStack, useDisclosure } from "@chakra-ui/react"
import axios from "axios"
import { useRef, useState } from "react"
import Image from 'next/image'
import { GrView } from 'react-icons/gr'
import { FcApproval, FcCancel } from 'react-icons/fc'
import { Tooltip } from 'react-tooltip'
import { toast } from 'react-toastify'
import { IMAGE_APPROVE_DENY_REQUEST } from '@/api/Api'

function DenyModal({id , setUpdate}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)


    const ApproveRequest = async () =>{
      try {
       await axios.post(IMAGE_APPROVE_DENY_REQUEST , { request:false , id:id })
       toast.success("Image Successfully")
       setUpdate(pre => !pre)
      } catch (error) {
        console.log(error?.message)
        toast.error("Something went wrong")
        setUpdate(pre => !pre)
      }
   }
  return (
    <>
   <FcCancel onClick={onOpen}  />
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent width={'500px'}>
        <VStack alignItems={'flex-start'} gap={'1px'} p={'6'}>
          <Text fontSize={'xl'} fontWeight={'bold'}>Deny Image Request</Text>
          <Text fontSize={'10px'} opacity={'50%'}>Resulted image required approval for further process</Text>
        </VStack>
        <ModalCloseButton />
        <ModalBody pb={2}>
         <Text>Are you sure you want to deny this image to be in search ?</Text>
        </ModalBody>
        <HStack p={4} py={6} gap={4} justifyContent={'end'}>
            <Button bg={'blue.400'} onClick={ApproveRequest} textColor={'white'}>Confirm</Button>
            <Button>Cancel</Button>
        </HStack>
      </ModalContent>
    </Modal>
  </>
  )
}

export default DenyModal