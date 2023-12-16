import React from 'react'
import { Button, Flex, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, VStack, useDisclosure } from "@chakra-ui/react"
import axios from "axios"
import { useRef, useState } from "react"
import { RiDeleteBin3Line } from 'react-icons/ri'
import { DELETE_AFFILIATE } from '@/api/AdminApi'


function DeleteAffiliate({id}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    
    
   const DeleteAffiliate = async () => {
    try {
        const {data} = await axios.delete(`${DELETE_AFFILIATE}/${id}`) 
        console.log(data?.message)
    } catch (error) {
        console.log(error?.message)
    }
   }

  return (
    <>
   <RiDeleteBin3Line onClick={onOpen} color='red'  />
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
          <Text fontSize={'xl'} fontWeight={'bold'}>Delete Affiliate</Text>
          <Text fontSize={'10px'} opacity={'50%'}>Removal of affiliate will results the removal of affiliation information</Text>
        </VStack>
        <ModalCloseButton />
        <ModalBody pb={2}>
         <Text>Are you sure you want to delete this affiliation content  ?</Text>
        </ModalBody>
        <HStack p={4} py={6} gap={4} justifyContent={'end'}>
            <Button bg={'red.400'} onClick={DeleteAffiliate} textColor={'white'}>Confirm</Button>
            <Button>Cancel</Button>
        </HStack>
      </ModalContent>
    </Modal>
  </>
  )
}

export default DeleteAffiliate