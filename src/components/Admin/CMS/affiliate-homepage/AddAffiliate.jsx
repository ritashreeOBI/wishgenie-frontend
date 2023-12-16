import React, { useEffect } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, HStack, Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, VStack, useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { FcApproval } from 'react-icons/fc'
import { BiImageAdd } from 'react-icons/bi'
import axios from 'axios'
import { ADD_NEW_AFFILIATE } from '@/api/AdminApi'
import { MdDelete } from 'react-icons/md'

function AddAffiliate() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const inputRef = useRef(null);
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false)
    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor, ClassicEditor } = editorRef.current || {};



    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
        };
        setEditorLoaded(true);
    }, []);

    const addAffilaite = async () => {

        const dataBody = {
            image: images,
            title,
            description: content,
            link
        }
        console.log(dataBody)
        try {
            if (title && images && link && content) {
                setLoading(true)
                const { data } = await axios.post(
                    ADD_NEW_AFFILIATE, 
                    dataBody,{
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  })
                console.log(data)
                setLoading(false)
            }

        } catch (error) {
            console.log(error?.message)
            setLoading(false)
        }

    }
    const handleClick = () => {
        inputRef.current?.click();
      };
    return (
        <>
            <Button onClick={onOpen} background={'blue.400'} textColor={'white'} className='py-6 bg-white shadow-md'> + Add Affiliate</Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                isCentered

            >
                <ModalOverlay />
                <ModalContent maxW={"800px"}>
                    <VStack alignItems={'flex-start'} gap={'1px'} p={'6'}>
                        <Text fontSize={'xl'} fontWeight={'bold'}>Aprrove Image Request</Text>
                        <Text fontSize={'10px'} opacity={'50%'}>Resulted image required approval for further process</Text>
                    </VStack>
                    <ModalCloseButton />
                    {
                        !loading ?
                            <ModalBody pb={6} >
                                <form className='flex flex-col gap-2'>
                                    <Grid gap={'2'} >
                                        <GridItem>
                                            <label className='text-xs opacity-60  '>Affiliate Logo*</label>
                                            {
                                            ! images?.name ?
                                            <InputGroup onClick={handleClick} >
                                                <input type={'file'} hidden accept="image/*" onChange={(e) => setImages(e.target.files[0])} ref={inputRef} />
                                                <VStack overflow="hidden" gap={'1'} align="center" w="100%" border={'1px'} borderRadius={'2xl'} padding={'6'} borderStyle={'dashed'}>
                                                    <BiImageAdd fontSize={42} />
                                                    <Text fontSize={'sm'}>Browse and Upload your image here.</Text>
                                                    <Text fontSize='9px' opacity={'initial'}>Support JPG, JPEG, PNG</Text>
                                                </VStack>
                                            </InputGroup>
                                            :
                                             <Box className="p-4 flex mt-2 justify-between border rounded-md shadow-md">
                                                <Text className='text-sm'>
                                                    {images?.name}
                                                </Text>
                                                <MdDelete color='red' fontSize={'24'} cursor={'pointer'} onClick={() => setImages([])}/>
                                             </Box>
}
                                        </GridItem>
                                        <GridItem gap={'2'} >
                                            <label className='text-xs opacity-60 '>Title*</label>
                                            <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} placeholder='e.g. amazon' className='p-4 border w-full rounded-xl' />
                                        </GridItem>
                                        <GridItem gap={'2'} >
                                            <label className='text-xs opacity-60 '>Affiliate URL*</label>
                                            <input type='text' onChange={(e) => setLink(e.target.value)} value={link} placeholder='e.g. https://www.amazon.com' className='p-4 border w-full rounded-xl' />
                                        </GridItem>
                                        <GridItem gap={'2'} >
                                            <label className='text-xs opacity-60 '>Affiliate URL*</label>
                                            {/* //CK-EDITOR */}
                                            {editorLoaded ? (
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={content}
                                                    onReady={(editor) => {
                                                        // You can store the "editor" and use when it is needed.
                                                        console.log("Editor is ready to use!", editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setContent(data);
                                                    }}
                                                />
                                            ) : null}
                                        </GridItem>
                                    </Grid>
                                </form>

                            </ModalBody>
                            :
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='xl'
                            />
                    }

                    <HStack p={4} py={6} gap={4} justifyContent={'end'}>
                        <Button bg={'blue.400'} onClick={addAffilaite} textColor={'white'}>Confirm</Button>
                        <Button>Cancel</Button>
                    </HStack>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddAffiliate