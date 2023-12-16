import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { BiExpand } from 'react-icons/bi'

import { Image as ChakraImage, } from '@chakra-ui/react';

function ExpandedImageView({imgURL , }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
   
        <BiExpand fontSize={'sm'} onClick={onOpen} opacity={'50%'}/>
    

    <Modal isOpen={isOpen} isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={'fit-content'} bg={'transparent'} shadow={'none'} p={'0'} sx={{paddingInlineEnd:'0' , paddingInlineStart:'0'}}>
       
       
       <ModalCloseButton  bg={'white'} padding={'2'} rounded={'full'} shadow={'xl'} top={'-8'}  />
       
      
        <ModalBody >
        <ChakraImage src={imgURL} rounded={'xl'} shadow={'xl'} />
        </ModalBody>

      </ModalContent>
    </Modal>
    </>
  )
}

export default ExpandedImageView