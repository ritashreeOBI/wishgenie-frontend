"use client"
import { priceIncrementor } from "@/api/Api"
import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, VStack, useDisclosure } from "@chakra-ui/react"
import axios from "axios"
import { useRef, useState } from "react"

export default function PriceUpdaterModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const key = process.env.NEXT_INDENTIFY_KEY
  const [pricePercent, setValue] = useState()
  const [isloading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)
    try {
      const { data } = await axios.put(priceIncrementor, { pricePercent, key })
      console.log(data)
      setLoading(false)
      onClose()
    } catch (error) {
      setLoading(false)
      console.log(data)
    }

  }

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  return (
    <>
      <Button onClick={onOpen} background={'white'} className="border shadow-md py-6">Price Update</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <VStack alignItems={'flex-start'} gap={'1px'} p={'6'}>
            <Text fontSize={'xl'} fontWeight={'bold'}>Update Product Price</Text>
            <Text fontSize={'10px'} opacity={'50%'}>The pricing will undergo periodic percentage increases, with updates scheduled every six hours throughout the day.</Text>
          </VStack>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Price Increment</FormLabel>
              <VStack gap={4}>
              <Flex gap={'4'} w={'100%'} alignItems={'center'}>
                <label className="w-60 font-bold">$0 - $40</label>
                <Input ref={initialRef}  value={pricePercent} onChange={(e) => setValue(e.target.value)} p="6" fontSize={'xl'} fontWeight={'bold'} type="Number" placeholder='e.g.-10' />
                <Button p="6">
                  %
                </Button>
              </Flex>
              <Flex gap={'4'} w={'100%'} alignItems={'center'}>
                <label className="w-60 font-bold">$40 - $100</label>
                <Input ref={initialRef}  value={pricePercent} onChange={(e) => setValue(e.target.value)} p="6" fontSize={'xl'} fontWeight={'bold'} type="Number" placeholder='e.g.-10' />
                <Button p="6">
                  %
                </Button>
              </Flex>
              <Flex gap={'4'} w={'100%'} alignItems={'center'}>
                <label className="w-60 font-bold">$100 - $200</label>
                <Input ref={initialRef}  value={pricePercent} onChange={(e) => setValue(e.target.value)} p="6" fontSize={'xl'} fontWeight={'bold'} type="Number" placeholder='e.g.-10' />
                <Button p="6">
                  %
                </Button>
              </Flex>
              </VStack>
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={onSubmit} mr={3}>
               { isloading && <Spinner
                thickness='1px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='sm'
              /> }Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}