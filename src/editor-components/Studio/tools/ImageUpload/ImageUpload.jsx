import { SyntheticEvent, useRef, useState } from 'react';
import { InputGroup, Button, VStack, Text, Wrap, HStack, Box, Flex, Skeleton, WrapItem } from '@chakra-ui/react';
import { Photo } from '../Images/Images';
import { nanoid } from '@reduxjs/toolkit';
import ImagesGrid from '../Images/ImagesGrid';
import { BiImageAdd } from 'react-icons/bi'
import { Image as ChakraImage, } from '@chakra-ui/react';
import { DEFAULT_IMAGE_OBJECT } from '@/editor-components/consts/stage-object';
import useStageObject from '@/editor-components/hooks/use-stage-object';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { IMAGE_VARIANT_GENERATION } from '@/api/Api';
import ExpandedImageView from './ExpandedImageView';



const ImageUpload = () => {
  const inputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [variant, setVariant] = useState([])
  const [selectedImage, setSelectedImage] = useState()
  const [loading , setLoading] = useState(false)
  const [uploadedImages ,setUploadedImage] = useState([])
  

  const setFile = async (e) => {
    try {
      const files = (e.target).files;
      
      const file = (files)[0];
      setUploadedImage(pre => [...pre , file])
      
      const url = URL.createObjectURL(file);
      console.log(url)
      const photo = { id: nanoid(), urls: { regular: url },file };
      setImages([...images, photo]);
    } catch (error) {

    }
  };

  const { selectedType } = useSelector((state) => state.template)
  const { createOne } = useStageObject();


  const handleClick = () => {
    inputRef.current?.click();
  };

  const addImageUrlToStage = (url) => {
    createOne({
      src: url,
      location: selectedType,
      ...DEFAULT_IMAGE_OBJECT,
    });
  };

  const generateVariant = async() =>{
    setLoading(true)
    console.log(selectedImage?.file)
       try {
        const  {data} =  await axios.post(IMAGE_VARIANT_GENERATION , { image : selectedImage?.file},{
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
          }})
        console.log( data)
        setVariant(pre => [data])
        setLoading(false)
       } catch (err) {
         console.log(err?.message)
         setLoading(false)
       }
  }


  const addImageToStage = (img) => {
    createOne({
      src: img.urls.regular,
      location: selectedType,
      ...DEFAULT_IMAGE_OBJECT,
    });
  };

  console.log(selectedImage)
  const imgVar = ['/variant/v-1.png', '/variant/v-2.png', '/variant/v-3.png', '/variant/v-4.png', '/variant/v-5.png']
  return (
    <VStack spacing={4}>
      <InputGroup onClick={handleClick}>
        <input type={'file'} hidden accept="image/*" onChange={setFile} ref={inputRef} />
        <VStack overflow="hidden" gap={'1'} align="center" w="100%" border={'1px'} borderRadius={'2xl'} padding={'6'} borderStyle={'dashed'}>
          <BiImageAdd fontSize={42} />
          <Text fontSize={'sm'}>Browse and Upload your image here.</Text>
          <Text fontSize='9px' opacity={'initial'}>Support JPG, JPEG, PNG</Text>
        </VStack>
      </InputGroup>
      {
        selectedImage &&
        <>
          <ChakraImage  src={selectedImage.urls.regular} rounded="md" width={'250px'} onClick={() => addImageToStage(selectedImage)} />
          <Flex justifyItems={'end'} >
            <Button onClick={generateVariant} fontSize={12}> Generate Variant</Button>
          </Flex>
        </>
      }

      <VStack bg={'whitesmoke'} w={'full'} alignItems={'flex-start'} rounded={'md'} p={'2'}>
     
        {variant.length && <Text textAlign={'left'} w={'100%'} fontSize={14} fontWeight={'600'} ml={'2'} >Variant Image</Text>}
       
        <HStack justifyContent={'flex-start'} alignItems={'flex-start'} >
           {
          images.length && variant.length > 0 && !loading ?
           variant?.map((imgs, i) => ( <HStack justifyContent={'flex-start'} alignItems={'flex-start'} gap={1}><ChakraImage key={i} src={imgs?.s3_image_url} rounded="md"  width={'80px'} onClick={() => addImageUrlToStage(imgs?.s3_image_url)} sx={{border:'1px solid black'}} /> <ExpandedImageView imgURL={imgs?.s3_image_url}/> </HStack>)
            //<Image src={url} alt="" style={{borderRadius:'10px'}} width={80} height={80}/>)
          )
          :
           loading?
          <Skeleton  height='100px' width="100px" borderRadius={'md'} shadow={'md'}  />
          :""
        }
      </HStack>
      </VStack>

      {images.length &&
        <>
          <Text textAlign={'left'} w={'100%'} fontSize={14} fontWeight={'600'} ml={'2'} >Uploaded Image</Text>
          <Wrap  >

            {images.map((img, i) => {
              return (
                <HStack gap={1} alignItems={'flex-start'} >
                  <ChakraImage key={i} src={img.urls.regular} width={'130px'}  rounded="md" onClick={() => setSelectedImage(img)} />
                  <ExpandedImageView imgURL={img.urls.regular}/>
                </HStack>
              )
            })}
          </Wrap>
        </>
      }

      {/* <ImagesGrid images={images} />} */}


      

    </VStack>
  );
};

export default ImageUpload;
