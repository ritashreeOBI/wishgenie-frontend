import { Box, Button, Flex, Skeleton, Text, Textarea, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { TEXT_IMAGE_GENERATION } from '@/api/Api';
import { Image as ChakraImage, } from '@chakra-ui/react';
import axios from 'axios';
import useStageObject from '@/editor-components/hooks/use-stage-object';
import { useSelector } from 'react-redux';
import { DEFAULT_IMAGE_OBJECT } from '@/editor-components/consts/stage-object';

// export type Photo = {
//   id: string;
//   urls: { regular: string };
// };

const AiImages = () => {
  const [generatedImg, setImages] = useState({
    image_url:''
  });

  const [query, setQuery] = useState('');

  const [loading , setLoading] = useState(false)

  const { createOne } = useStageObject();

  const {selectedType} = useSelector((state) => state.template)

  const addImageToStage = (path) => {
    console.log(path)
    createOne({
      src: path,
      location:selectedType ,
      ...DEFAULT_IMAGE_OBJECT,
    });
  };

  const GenerateIamge = async (e) =>{
    e.preventDefault()
    setLoading(true)
    try {
      const {data} = await axios.post(TEXT_IMAGE_GENERATION , { "image_description" : query})
      console.log(data)
      setImages(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error?.message)
    }
  }
  console.log

  // useEffect(() => {
  //   if (query && query !== currQuery) {
  //     setPage(1);
  //     setCurrQuery(query);
  //   }
  //   if (!query && !currQuery) {
  //     fetchImages();
  //   }
  // }, [query]);

  // useEffect(() => {
  //   if (currQuery === query) {
  //     document.getElementById('imageGrid')?.scrollTo(0, 0);
  //     fetchImages();
  //   }
  // }, [currQuery]);

  // useEffect(() => {
  //   if (queryReset) {
  //     setCurrQuery('');
  //     setPage(1);
  //   }
  // }, [queryReset]);

  return (
    <>
      <VStack bgColor="white" w="100%" spacing={3} p="4">
        <Box bg={'blue.500'} py={'3'} rounded={'lg'}>
        <Text fontWeight={600} px={'4'} color={'white'} fontSize='sm' borderX={'4px'} borderColor={'white'}>
          Design with AI
      </Text>
        </Box>
        <form style={{ width: '100%' }} onSubmit={GenerateIamge}>
         <Textarea value={query} onChange={(e) => setQuery(e.target.value)} className='mb-2' />
         <Button  type="submit"  w='100%' py={6} fontWeight={'normal'} >
             Generate Image
          </Button>
        </form>
        {
            !loading && generatedImg?.image_url ?
            <>
            <p className='text-sm my-4 bg-green-500 text-white p-2 px-4 rounded-md'>{generatedImg?.message}</p>
            <img src={generatedImg.image_url} width={250} height={250} alt="generated image" onClick={() => addImageToStage(generatedImg.image_url)} className='shadow-xl rounded-md '/>
            
            </>
            :
            loading ?
            <>
            <Skeleton  height='26px' width="250px" my={4}  borderRadius={'md'} />
            <Skeleton  height='300px' width="300px" borderRadius={'md'} shadow={'md'}  />
            </>
            : 
            <Text mt={36} className='text-xs opacity-50 '> Generate Image through text </Text>

        }
      
       
      </VStack>
     
    </>
  );
};

export default AiImages;
