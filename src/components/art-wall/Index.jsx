import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { categories } from './categories'
import ImageList from './components/Image-grid-list/Index'
import { useDispatch, useSelector } from 'react-redux'
import { sentenceCase } from 'sentence-case'
import { setSearchQuery } from '@/store/slices/art-wall/search-query-slice'

function ArtWallMain() {
  const {query } = useSelector(state => state.searchQuery)
  const dispatch = useDispatch()
  return (
    <Box className=''>
        <HStack gap={'6'} className='p-2 pb-4 w-full border-b  mt-24'  justifyContent={'center'}>
             
             {
                  categories.map((list) => {
                     return(
                       <Text key={list?.id} onClick={() => dispatch(setSearchQuery(list?.name))}  className=' font-bold border cursor-pointer p-4   hover:border-sky-500  hover:bg-sky-500 hover:text-white rounded-md   text-sm opacity-70'>
                         {list?.name}
                       </Text>
                     )
                  })
             }
         </HStack>
       <VStack className='py-12' >

           <Text fontSize={'5xl'} fontWeight={'bold'}>{sentenceCase(query) }</Text>

            <ImageList/>

       </VStack>
    </Box>
  )
}

export default ArtWallMain