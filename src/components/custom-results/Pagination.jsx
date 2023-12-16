import React, { useState, useEffect } from 'react';
import Card from '../shared-components/card/Card';
import { Button, HStack, Text, Wrap } from '@chakra-ui/react';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

const Pagination = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const updatedItems = data.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(updatedItems);
  }, [data, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      {/* Display current items */}
      <Wrap spacing={'8'} w={'full'}>
        {currentItems.map((item, index) => (
          <Card pro={item} />
        ))}
      </Wrap>

      <HStack w={'full'} justifyContent={'flex-end'} gap={6}>

      {/* Pagination controls */}
      <Button onClick={handlePrevPage} bg={'white'} rounded={'full'} px={2} shadow={'lg'} disabled={currentPage === 1}>
      <MdKeyboardDoubleArrowLeft />

      </Button>
      <Button Button onClick={handlePrevPage} bg={'white'} rounded={'full'} px={2} shadow={'lg'} onClick={handleNextPage} disabled={currentPage === totalPages}>
      <MdKeyboardDoubleArrowRight />
      </Button>
      <Text fontSize={'sm'}>
        Page {currentPage} of {totalPages}
      </Text>
      </HStack>
    </>
  );
};

export default Pagination;
