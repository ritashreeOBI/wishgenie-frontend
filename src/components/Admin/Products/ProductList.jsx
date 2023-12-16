"use client"
import { Avatar, Badge, Box, Button, Flex, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { products } from './dummy'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md'
import PriceUpdaterModal from './PriceUpdaterModal'
import { GET_ALL_PRODUCTS } from '@/api/Api'
import { useEffect } from 'react'
import axios from 'axios'

function ProductList() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [items, setItems] = useState({
        curr: 8,
        prev: 0

    })
    const IncrementPage = () => {
        setPage(prev => prev + 1)

    }
    const DecrementPage = () => {
        if (page > 1) { setPage(prev => prev - 1) }
    }
    useEffect(() => {
        setItems(pre => {
            return {
                curr: page * 8,
                prev: (page * 8) - 8
            }
        })
    }, [page])

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(GET_ALL_PRODUCTS)
            console.log(data.result)
            setProducts(data.result)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <Box display={'flex'} gap={'6'} flexDirection={'column'}>
            <Flex justifyContent={'space-between'} alignItems={'center'} w={'100%'} >
                <VStack alignItems={'flex-start'} gap={'1'}>
                    <Text fontSize={'2xl'} >Available Products</Text>
                    <Text fontSize={'xs'} opacity={'50%'} >section to view product detail also you can increase price from here.</Text>
                </VStack>
                <PriceUpdaterModal />
            </Flex>
            <Box className='overflow-x-auto p-6 rounded-2xl bg-white shadow-sm'>




                <TableContainer mt={'2'}>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Product ID</Th>
                                <Th>Product name </Th>
                                <Th >Category</Th>
                                <Th>Price Range</Th>
                                <Th>Availiblity</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                products.slice((page * 8) - 8, page * 8).map((pro) => {
                                    return (
                                        <Tr>
                                            <Td>{pro?.id}</Td>
                                            <Td>
                                                <Flex gap='6px' alignItems={'center'}>
                                                    <Avatar name={pro?.title} src={pro?.image} />
                                                    <VStack alignItems={'flex-start'} gap='1px'>
                                                        <Text fontSize={'sm'} >{pro?.title} </Text>
                                                        {pro?.brand && <Text opacity='50%' fontSize={'xs'} >Brand- {pro?.brand} </Text>}
                                                    </VStack>

                                                </Flex>

                                            </Td>
                                            <Td> <Text fontSize="sm" textAlign='center'>{pro?.type}</Text></Td>
                                            <Td><Text fontSize="sm" textAlign='center'>{pro?.product_price?.max_price} - {pro?.product_price?.min_price}</Text></Td>
                                            <Td>
                                                {!pro?.is_discontinued ? <Badge colorScheme='green' fontSize="xs" borderRadius={'lg'} p="2">Available</Badge> : <Badge colorScheme='red'>Discontinued</Badge>}
                                            </Td>

                                            <Td>
                                                <BsThreeDotsVertical />
                                            </Td>

                                        </Tr>
                                    )
                                })
                            }


                        </Tbody>
                        <Tfoot>
                            <Box p={'4'}>
                                <Button borderRightRadius={'0'} onClick={DecrementPage} >
                                    <MdKeyboardDoubleArrowLeft />
                                </Button>
                                <Button borderRadius={'0'}>
                                    Page {page}
                                </Button>
                                <Button borderLeftRadius={'0'} onClick={IncrementPage} >
                                    <MdKeyboardDoubleArrowRight />
                                </Button>

                            </Box>
                        </Tfoot>

                    </Table>
                </TableContainer>

            </Box>
        </Box>
    )
}

export default ProductList