import { setSearchQuery } from '@/store/slices/art-wall/search-query-slice'
import { Box, HStack, chakra } from '@chakra-ui/react'
import React, { useState } from 'react'
import { GoSearch } from 'react-icons/go'
import { useDispatch } from 'react-redux'

function SearchBar() {
  const [query , setQuery] = useState('')
  const dispatch = useDispatch()

  const changeHandler = (e) => {
     e.preventDefault();
     setQuery(e.target.value)
  }

  const SearchHandler = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(query))
  }



  return (
    <HStack className='p-3  px-4 rounded-full w-[40%]  bg-slate-100'>
      <form onSubmit={SearchHandler} className='flex gap-4 items-center w-full  '>
        <GoSearch className='text-[20px]'  onClick={SearchHandler} />
        <input type='text' value={query} onChange={changeHandler} className='w-full focus:outline-none bg-transparent placeholder:text-sm'  placeholder='Search high-quality image '/>
      </form>
    </HStack>
  )
}

export default SearchBar