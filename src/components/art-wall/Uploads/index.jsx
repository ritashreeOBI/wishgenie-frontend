import { Box, Image as ChakraImage, Select, Textarea, } from '@chakra-ui/react';
import Image from 'next/image'
import React, { useState , useRef } from 'react'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { FaRegImages } from 'react-icons/fa'
import { InputGroup, Button, VStack, Text, Wrap, HStack } from '@chakra-ui/react';
import { BiImageAdd } from 'react-icons/bi';
import { nanoid } from 'nanoid';
import { categories } from '../categories';
import { useEffect } from 'react';
import axios from 'axios';
import { IMAGE_UPLOAD_REQUEST } from '@/api/Api';
import { toast } from 'react-toastify';


function Upload() {
  const [images, setImages] = useState([]);
  const [uploadedImages ,setUploadedImage] = useState([])
  const inputRef = useRef(null);
  const [selected , setSelected] = useState()
  
  const removeUploadedImage = (id) =>{
      const updatedImages =  images.filter( img => img.id != id)
      setImages(updatedImages)
  }

  const setFile = async (e) => {
    try {
      const files = (e.target).files;

      const file = (files)[0];
      setUploadedImage(pre => [...pre, file])

      const url = URL.createObjectURL(file);
      console.log(url)
      const photo = { id: nanoid(), urls: { regular: url }, file };
      console.log(photo)
      setImages([...images, photo]);
    } catch (error) {

    }
  };
  const [content , setContent] = useState({
    category:'',
    caption:""
  })

  const uploadArt = async() => {
     try {
      console.log(selected , content)
      const params = {
        type:'art-wall',
        uploaderID:localStorage.getItem('u_id'),
        ...content,
        image:selected?.file
      }
      const selectedImageId = selected?.id
      console.log(params)
      const uploaded = await axios.post(
        IMAGE_UPLOAD_REQUEST , 
        params,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
         } )
      console.log(uploaded)
      removeUploadedImage(selectedImageId)
      setContent({
        category:'',
        caption:""
      })
      toast.success('Image uploaded Successfully')
     } catch (error) {
      toast.error(error?.message)
     }
  }

  useEffect(() => {
     setSelected(images[0] )
  },[images])



  const handleClick = () => {
    inputRef.current?.click();
  };

   console.log(images)

  return (
    <HStack className='py-36  px-12' justifyContent={'center'}>
      <input type={'file'} hidden accept="image/*" onChange={setFile} ref={inputRef} />
      {
        images?.length > 0 ?
        <HStack w={'full'}  alignItems={'flex-start'} justifyContent={'flex-start'} gap={20}  >
          <VStack  >
            <Button p={2} py={8} borderRadius={4} bg={"blue.400"} onClick={handleClick}>
              <AiOutlineAppstoreAdd color='white' size={'48'} />
            </Button>
            {
              images?.map((img, idx) => {
                return (
                  <Button w={20} h={20} borderRadius={4} bg={"blue.400"} onClick={() => setSelected(img)}>
                    <Text color={'white'} fontSize={36}>{idx + 1}</Text>
                  </Button>
                )
              })
            }
          </VStack>
          <Box  w={'50%'} border="1px" borderColor={'blackAlpha.100'} borderRadius={'xl'} padding={4} >
            
                <ChakraImage  src={selected?.urls?.regular}   rounded="md"  />
            
          </Box>
          <VStack w={'30%'} h={'full'} gap={4} alignItems={'flex-start'}>
          <label className='text-xs opacity-50'>Category*</label>
          <Select value={content.category} onChange={(e) =>setContent(pre => {
            return{
              ...pre,
              category:e.target.value
            }
          })}>
            {
               categories.map((value) => {
                return(
                  <option value={value?.name}>{value?.name}</option>
                )
               })
            }
          
          </Select>
          <label className='text-xs opacity-50'>Image Description</label>
          <Textarea value={content.caption} onChange={(e) => setContent(pre => {
            return{
              ...pre,
              caption:e.target.value
            }
          })} placeholder='e.g. a cartoon image of girl holding pen in his hand' height={'full'} fontSize={'sm'} flexGrow={'1'}  />
          <Button bg={'blue.400'} color={'white'} w={'100%'} onClick={uploadArt} >
            Upload
          </Button>
          </VStack>

       
    
          </HStack>
          :
          <VStack gap={'10'}>
            <Text fontSize={'2xl'} fontWeight={'bold'}>Upload your Image and get reward each time someone uses your image in the purchase of a custom product.</Text>
          <InputGroup onClick={handleClick}  w="fit" >
            
            <VStack overflow="hidden" gap={'4'}   border={'1px'} borderRadius={'2xl'} padding={'24'} borderStyle={'dashed'}>
              <BiImageAdd fontSize={42} opacity={'50%'} />
              <Text fontSize={'2xl'}>Browse and Upload your image here.</Text>
              <Text fontSize='md' opacity={'50%'}>Support JPG, JPEG, PNG.</Text>
            </VStack>
          </InputGroup>
          
          </VStack>

     
      }
    </HStack>
  )
}

export default Upload