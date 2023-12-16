import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
    Skeleton,
    Text,
    VStack,
    Textarea,
    HStack,
    Stack,
    Tooltip,
    Image
} from '@chakra-ui/react'

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'


import { RxMagicWand } from 'react-icons/rx'
import { MULTI_IMAGE_GENERATION, TEXT_IMAGE_GENERATION } from '@/api/Api';
import { Image as ChakraImage, } from '@chakra-ui/react';
import axios from 'axios';
import useStageObject from '@/editor-components/hooks/use-stage-object';
import { useSelector } from 'react-redux';
import { DEFAULT_IMAGE_OBJECT } from '@/editor-components/consts/stage-object';
import { PiMagicWand } from 'react-icons/pi';
import { histroy } from './dummy';


const options = [
    {
        value:"256x256",
        id:1
    },
    {
        value:"512x512",
        id:2
    },
    {
        value:"1024x1024",
        id:3
    },
]
function Art() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [generatedImg, setImages] = useState({
        image_urls: []
    });
    const [size, setSize] = useState('')
    const [numberOfImages, setNumberOfImages] = useState(1)

    const [query, setQuery] = useState('');

    const [loading, setLoading] = useState(false)

    const { createOne } = useStageObject();

    const { selectedType } = useSelector((state) => state.template)

    const addImageToStage = (path) => {
        console.log(path)
        createOne({
            src: path,
            location: selectedType,
            ...DEFAULT_IMAGE_OBJECT,
        });
    };

    const GenerateIamge = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post(
                MULTI_IMAGE_GENERATION, 
                { 
                PROMPT: query, 
                user_id: localStorage.getItem('u_id'), 
                size: size , 
                no_of_images: numberOfImages
               })
            console.log(data)
            setImages(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error?.message)
        }
    }
    const format = (val) => `$` + val
    const parse = (val) => val.replace(/^\$/, '')

    console.log(typeof( parseInt(numberOfImages)))
    return (
        <>

            <Box
                onClick={onOpen}
                borderColor={'blue.600'}
                order={'1px'}
                position={'absolute'}
                left={4}
                top={4}
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                gap={2}
                sx={{
                    bg: 'white',
                    shadow: 'md',
                    borderColor: 'blue.500',
                    border: 1, rounded: 'full', padding: '3', cursor: 'pointer', bgColor: 'blue.400'
                }}>
                <PiMagicWand color='white' size={28} />
                <Text fontSize={'xs'} mr={2} color={'white'}>Design With AI</Text>

            </Box>


            <Modal isOpen={isOpen} isCentered onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW={'80%'}>
                    <ModalHeader>
                        <HStack gap={'2'}>
                            <PiMagicWand size={'24'} />
                            <Stack gap={0}>
                                <Text p={0}>Design With AI</Text>
                                <Text className='text-[8px] opacity-40'>Unleashing Creativity: Design With AI for a Smarter Tomorrow</Text>
                            </Stack>
                        </HStack>


                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >

                        <VStack bgColor="white" w="100%" gap={'5'} spacing={8} alignItems={'flex-start'} >

                            <form style={{ width: '100%' }} onSubmit={GenerateIamge}>

                                <VStack gap={2} alignItems={'flex-start'}>

                        <HStack w={'full'} pb={4}>
                            <Box bg={'whitesmoke'} w={'full'} p={6} rounded={'xl'}>
                                <Text textAlign={'center'} fontSize={'xl'}>Available Trail Left - <strong>20</strong> out of <strong>40</strong></Text>
                            </Box>
                        </HStack>

                                    <Stack gap={0} mb={2} >
                                        <Text>Prompt For Genrating Image</Text>
                                        <Text className='text-[8px] opacity-40'> Write image description want's to generate through AI </Text>
                                    </Stack>

                                    <HStack justifyContent={'space-between'} w='full'>

                                        <HStack gap={2} fontSize={'sm'} >
                                            {
                                                options?.map((variant) => {
                                                    return(
                                                        <Button key={variant?.id} sx={{border:'2px' , borderColor: variant?.value === size ? 'blue.500':'white'}} onClick={() => setSize(variant?.value)}>
                                                            {variant?.value}
                                                        </Button>
                                                    )
                                                    
                                                })
                                            }
                                           
                                        </HStack>
                                        <NumberInput 
                                        value={numberOfImages}
                                        width={'72px'}
                                        onChange={(valueString) => setNumberOfImages(parseInt(valueString))} 
                                        min={1} 
                                        max={10}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </HStack>

                                    <Textarea
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        className='mb-2 text-xs'
                                        placeholder='e.g. Design a simple and clean placeholder logo. The logo should be generic and not represent any specific brand or industry. '
                                    />

                                    <Button
                                        type="submit"
                                        w='100%'
                                        py={6}
                                        bg={'blue.500'}
                                        fontWeight={'normal'} >
                                        Generate Image
                                    </Button>
                                </VStack>
                            </form>
                            {

                                !loading && generatedImg?.image_urls.length > 0 ?
                                    <HStack overflow={'auto'}>
                                        {
                                            generatedImg?.image_urls?.map((url) => {
                                                return (
                                                    <>

                                                        <Image src={url} width={'auto'} height={150} alt="generated image" onClick={() => addImageToStage(url)} className='shadow-xl rounded-md ' />

                                                    </>
                                                )
                                            })
                                        }
                                    </HStack>
                                    : 
                                    loading && generatedImg?.image_urls.length === 0?
                                        <>

                                            <Skeleton height='100%' width="200px" borderRadius={'md'} shadow={'md'} />
                                        </>
                                        :
                                    ""
                                       //<Text mt={36} className='text-xs opacity-50 '> Generate Image through text </Text>

                            }
                            <Text mt={4} fontSize={"xs"} fontWeight={'bold'}>Previous Results</Text>
                            <HStack overflow={'scroll'}>
                                {
                                    histroy.map((url) => {
                                        return (
                                            <Image src={url?.url} width='auto' height={150} alt='' style={{ borderRadius: 'sm' }} />
                                        )
                                    })
                                }
                            </HStack>


                        </VStack>

                    </ModalBody>


                </ModalContent>
            </Modal>
        </>
    )
}


export default Art