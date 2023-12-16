import { Box, Button, HStack, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { FcApproval, FcCancel } from 'react-icons/fc'
import { GrView } from 'react-icons/gr'
import ViewImageModal from './ViewImageModal'
import ApproveModal from './ApproveModal'
import DenyModal from './DenyModal'


function Request({ data , setUpdate }) {
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

    return (

        <>
        {
            data?.length > 0 ?
        <TableContainer mt={'6'} w={'full'}>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>UserId</Th>
                        <Th>UserName </Th>
                        <Th>Request Type</Th>
                        <Th>Request Date</Th>
                        <Th>Action</Th>

                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.slice((page * 8) - 8, page * 8).map((pro) => {
                            return (
                                <Tr>
                                    <Td className='text-xs opacity-40'>{pro?._id}</Td>
                                    <Td>
                                        <VStack alignItems={'flex-start'}>
                                            <Text fontSize={'sm'} >{pro?.userName} </Text>
                                            <Text fontSize={'xs'} opacity={'50%'} >{pro?.userEmail} </Text>
                                        </VStack>

                                    </Td>

                                    <Td>
                                        <Text fontSize={'xs'} opacity={'50%'}  >{pro?.type}</Text>
                                    </Td>

                                    <Td> <Text fontSize="sm" textAlign='center'>{pro?.createAt}</Text></Td>

                                    <Td>
                                        <HStack gap={6} fontSize={'2xl'}>
                                            <ViewImageModal img={pro?.path} />
                                            <ApproveModal id={pro?._id} setUpdate={setUpdate} />
                                            <DenyModal id={pro?._id} setUpdate={setUpdate}   />
                                        </HStack>


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
        :
        <Text textAlign={'center'} w={'full'}py={4}>No Image Request found!</Text>
        }
        </>

    )
}

export default Request