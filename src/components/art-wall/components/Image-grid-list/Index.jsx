import ImagesGrid from '@/editor-components/Studio/tools/AiGenerated/ImagesGrid';
import InfiniteWrapper from '@/editor-components/Studio/tools/AiGenerated/InfiniteWrapper';
import NothingFound from '@/editor-components/components/NothingFound/NothingFound';
import { unsplash } from '@/editor-components/utils/unsplash-api';
import { HStack, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ImageContianer from '../image-card/ImageContianer';
import ImageContianerSkeleton from '../skeleton/ImageContianerSkeleton';

function ImageList() {
    const {query } = useSelector(state => state.searchQuery)
    const [col, setCol] = useState([]);
    const [colSec, setColSec] = useState([]);
    const [colThird, setColTHird] = useState([]);
    const [currQuery, setCurrQuery] = useState('');
    //const [query, setQuery] = useState('give me social  justice campaign related images');
    const [page, setPage] = useState(1);
    const DEFAULT_IMG_QUERY = ""

  const [queryReset, setQueryReset] = useState(false);
  const [isloading , setLoading] = useState(false)

  const fetchImages = async () => {
    setLoading(true)
    try {
      setPage((prev) => prev + 1);

      const photos = await unsplash.search.getPhotos({ query: currQuery || DEFAULT_IMG_QUERY, page });
      const result = photos.response?.results  || [];


      const secondColPhotos = await unsplash.search.getPhotos({ query: currQuery || DEFAULT_IMG_QUERY, page:page +1 });
      const secondResult = secondColPhotos.response.results || [];


      const thirdColPhotos = await unsplash.search.getPhotos({ query: currQuery || DEFAULT_IMG_QUERY, page: page+2 });
      const thirdResult = thirdColPhotos.response.results || []

      setCol((currQuery && currQuery === query) || queryReset ? result : [...col, ...result]);
      setColSec((currQuery && currQuery === query) || queryReset ? secondResult : [...colSec, ...secondResult]);
      setColTHird((currQuery && currQuery === query) || queryReset ? thirdResult : [...colThird, ...thirdResult]);

     
      console.log(result , secondResult , thirdResult)
      queryReset && setQueryReset(false);
      setLoading(false)
    } catch (err) {
      console.error(err);
      setLoading(false)
    }
  };


  useEffect(() => {
    if (query && query !== currQuery) {
      setPage(1);
      setCurrQuery(query);
    }
    if (!query && !currQuery) {
       fetchImages();
       
    }
  }, [query]);

 
  

  useEffect(() => {
    if (currQuery === query) {
      document.getElementById('imageGrid')?.scrollTo(0, 0);
      fetchImages();
    }
  }, [currQuery]);

  useEffect(() => {
    if (queryReset) {
      setCurrQuery('');
      setPage(1);
    }
  }, [queryReset]);
  return (
    <>
    { 
    ! isloading ?
    <HStack  p={10} gap={6} alignItems={'flex-start'} >
    <VStack id="imageGrid" spacing={6} sx={{  position: 'relative', h: '100%', overflowY: 'auto' }}>
        {!col?.length ? (
          <NothingFound message="No images were found." />
        ) : (
         
           col.map((img) =>{
            
            return(
               <ImageContianer url={img?.urls.regular} />
               // <Image src={img?.urls.raw} width={400} height={400}  className=" rounded-xl" alt="" />
            )
           })
            
       
        )}
    </VStack>
    <VStack id="imageGrid" spacing={6} sx={{  position: 'relative', h: '100%', overflowY: 'auto' }}>
        {!colSec?.length ? (
          <NothingFound message="No images were found." />
        ) : (
         
           colSec.map((img) =>{
           
            return(
               <ImageContianer url={img?.urls.regular} />
               // <Image src={img?.urls.raw} width={400} height={400}  className=" rounded-xl" alt="" />
            )
           })
            
       
        )}
    </VStack>
    <VStack id="imageGrid" spacing={6} sx={{ pb:4, position: 'relative', h: '100%', overflowY: 'auto' }}>
        {!colThird?.length ? (
          <NothingFound message="No images were found." />
        ) : (
         
           colThird.map((img) =>{
           
            return(
              <ImageContianer url={img?.urls.regular} />
               // <Image src={img?.urls.raw} width={400} height={400}   alt="" />
            )
           })
            
       
        )}
    </VStack>
   
  </HStack>
  :
   <HStack gap={6} justifyContent={'flex-start'} alignItems={'flex-start'}>
     <ImageContianerSkeleton width={400} height={500} />
     <ImageContianerSkeleton width={400} height={500} />
     <ImageContianerSkeleton width={400} height={500} />
   </HStack> 
}
  </>
  )
}

export default ImageList