import React from 'react'
import { Button, Flex, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, VStack, useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { FcApproval } from 'react-icons/fc'
import axios from 'axios'
import { IMAGE_APPROVE_DENY_REQUEST } from '@/api/Api'
import { toast } from 'react-toastify'

function ApproveModal({id , setUpdate}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const ApproveRequest = async () =>{
       try {
        await axios.post(IMAGE_APPROVE_DENY_REQUEST , { request:true , id:id })
        toast.success("Image Successfully")
        setUpdate(pre => !pre)
       } catch (error) {
         console.log(error?.message)
         setUpdate(pre => !pre)
         toast.error("Something went wrong")
       }
    }
  return (
    <>
      <FcApproval onClick={onOpen} /> 
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
          <Text fontSize={'xl'} fontWeight={'bold'}>Aprrove Image Request</Text>
          <Text fontSize={'10px'} opacity={'50%'}>Resulted image required approval for further process</Text>
        </VStack>
        <ModalCloseButton />
        <ModalBody pb={6}>
         <Text>Are you sure you want to allow this image to be in search ?</Text>
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

export default ApproveModal