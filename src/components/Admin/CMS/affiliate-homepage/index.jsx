import { Avatar, Box, Flex, HStack, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import AddAffiliate from './AddAffiliate'
import axios from 'axios'
import { GET_ALL_AFFILIATE } from '@/api/AdminApi'
import Image from 'next/image'
import EditAffiliate from './EditAffiliate'
import DeleteAffiliate from './DeleteAffiliate'

function AffiliateHome() {

    const [list, setList] = useState([])

    const getAffiliateList = async () => {
        try {
            const { data } = await axios.get(GET_ALL_AFFILIATE)
            setList(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getAffiliateList()
    }, [])

    console.log(list)

    return (
        <Box display={'flex'} gap={'6'} flexDirection={'column'}>
            <Flex justifyContent={'space-between'} alignItems={'center'} w={'100%'} >
                <VStack alignItems={'flex-start'} gap={'1'}>
                    <Text fontSize={'2xl'} >Affiliate Content Manager</Text>
                    <Text fontSize={'xs'} opacity={'50%'} >section to view affiliateduct detail also you can increase price from here.</Text>
                </VStack>
                <AddAffiliate />
            </Flex>
            <Box className='overflow-x-auto p-6 rounded-2xl bg-white shadow-sm'>

                <TableContainer>
                    <Table variant='simple'>

                        <Thead>
                            <Tr className='text-center'>
                                <Th className='text-center'>Title</Th>
                                <Th className='text-center'>Detail</Th>
                                <Th className='text-center'>Created At</Th>
                                <Th className='text-center' >Updated At</Th>
                                <Th >Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                list?.map((affiliate, idx) => {
                                    return (
                                        <Tr key={idx}>
                                            <Td>{affiliate?.title}</Td>
                                            <Td>
                                                <Flex gap='6px' alignItems={'center'}>
                                                    <Image name={affiliate?.title} src={affiliate?.image} width={40} height={40} />
                                                    <VStack alignItems={'flex-start'} gap='1px'>
                                                        <Text fontSize={'sm'} >{affiliate?.title} </Text>
                                                        <Text opacity='50%' fontSize={'xs'} >{affiliate?.link} </Text>
                                                    </VStack>

                                                </Flex>

                                            </Td>
                                            <Td><Text fontSize="sm" textAlign='center'>{affiliate?.createdAt}</Text></Td>

                                            <Td><Text fontSize="sm" textAlign='center'>{affiliate?.updatedAt}</Text></Td>
                                            <Td>
                                                <HStack gap={8} fontSize={'2xl'}>
                                                  <EditAffiliate id={affiliate?._id}/>
                                                  <DeleteAffiliate id={affiliate?._id}/>

                                                </HStack>


                                            </Td>
                                        </Tr>
                                    )
                                })
                            }


                        </Tbody>

                    </Table>
                </TableContainer>

            </Box>
        </Box>
    )
}

export default AffiliateHome