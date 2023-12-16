import React from 'react'
import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, VStack, useDisclosure } from "@chakra-ui/react"
import axios from "axios"
import { useRef, useState } from "react"
import Image from 'next/image'
import { GrView } from 'react-icons/gr'

function ViewImageModal({img}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
  
  return (
    <>
    <Button onClick={onOpen}> <GrView/></Button>
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
          <Text fontSize={'xl'} fontWeight={'bold'}>Requested Image</Text>
          <Text fontSize={'10px'} opacity={'50%'}>Resulted image required approval for further process</Text>
        </VStack>
        <ModalCloseButton />
        <ModalBody pb={6}>
         <Image src={img} width={600} height={500} />
        </ModalBody>

      </ModalContent>
    </Modal>
  </>
  )
}

export default ViewImageModal