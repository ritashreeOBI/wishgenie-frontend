import { printFullApi } from '@/api/Api';
import { Grid, GridItem, HStack, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Box,
    useColorMode,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    IconButton,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import Card from '../shared-components/card/Card';
import { search_history } from './dummy';
import SmCard from '../shared-components/card/SmCard';
import Image from 'next/image';
import ProductList from '../Admin/Products/ProductList';
import Productlist from '../shared-components/product-list/Productlist';
import { useDispatch, useSelector } from 'react-redux';
import { setProductCategory } from '@/store/slices/ProductSlice';
import CardSkeleton from '../shared-components/skeleton/CardSkeleton';
import Pagination from './Pagination';

function CustomResultsSection() {

    const [categories, setCategory] = useState(1);
    const [subCategory, setSubCategory] = useState(0);
    const [menuMainCategories, setMenuMainCategories] = useState([]);
    const { category } = useSelector((state) => state.ProductList);
    const [productsList, setProducts] = useState([]);
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        // Check if data exists in local storage
        const cachedData = localStorage.getItem('menuData');

        if (cachedData) {
            // Parse and set the cached data to your state
            setMenuMainCategories(JSON.parse(cachedData));
        } else {
            axios({
                method: 'GET',
                url: `${printFullApi}/categories`
            })
                .then((result) => {
                    const responseData = result.data;
                    const allCategories = responseData.result?.categories;
                    console.log(allCategories)

                    // Separate and sort main categories
                    const mainCategories = allCategories?.filter(category => category.parent_id === 0)
                        .sort((a, b) => a.catalog_position - b.catalog_position);

                    // Organize data into the desired structure
                    const organizedData = {};
                    mainCategories.forEach(main => {
                        // Find and sort sub-categories for this main category
                        const mainSubCategories = allCategories?.filter(sub => sub.parent_id === main.id)
                            .sort((a, b) => a.catalog_position - b.catalog_position);

                        // For each sub-category, find and sort its sub-sub-categories
                        mainSubCategories.forEach(sub => {
                            sub.subSubCategories = allCategories?.filter(subSub => subSub.parent_id === sub.id)
                                .sort((a, b) => a.catalog_position - b.catalog_position);
                        });

                        organizedData[main.id] = {
                            main_category: main,
                            sub_categories: mainSubCategories
                        };
                    });

                    // Set the organized data to state
                    setMenuMainCategories(organizedData);

                    // Cache the organized data in local storage for future use
                    localStorage.setItem('menuData', JSON.stringify(organizedData));


                })
                .catch((err) => {
                    // Code to handle errors
                    console.error('Error:', err); // For example, log the error
                });

        }


    }, []);

    console.log(menuMainCategories)

    const showProductsByCategory = async (para) => {
        console.log('Show Products', category);
        dispatch(
            setProductCategory({
                category: para,
            })
        );

    }

    const getCustomProducts = async () => {
        setLoading(true);
        axios.get(`${printFullApi}/products`, {
            params: {
                "category_id": category
            }
        })
            .then(response => {
                // Handle the success response here
                console.log('Response:', response.data);
                setLoading(false);
                if (response.data.code === 200) {
                    const productsWithPrice = response.data.result.map(product => {
                        return {
                            ...product,
                            store_rating: Math.floor(Math.random() * 6),
                            store_review: Math.floor(Math.random() * 1000),
                        }
                    });

                    setProducts(productsWithPrice);
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the POST request
                console.error('Error:', error);
                setLoading(false);
            });
    }
    useEffect(() => {
        getCustomProducts();
    }, [category]);
    return (
        <Grid templateColumns='repeat(5, 1fr)' py={32} px={10} gap={8} alignItems={'flex-start'}>

            <GridItem colSpan={1}>
                <VStack bg={'white'} p={4} borderRadius={'2xl'} >
                    <Accordion allowToggle='true' >
                        {
                            Object.values(menuMainCategories)?.map((category, idx) => {
                                return (
                                    <AccordionItem p={3} border={'none'} >
                                        <h2 >
                                            <AccordionButton>
                                                <Box flex="1" textAlign="left">
                                                    {category?.main_category?.title}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel >

                                            {
                                                // Extract half of the sub-categories using slice
                                                category.sub_categories.map(subItem => {
                                                    return (
                                                        <>
                                                            <Text
                                                                fontSize={'sm'}
                                                                fontWeight={'bold'}
                                                                cursor={'pointer'}
                                                                ml={2}
                                                                py={3}
                                                                onClick={() => showProductsByCategory(subItem?.id)}
                                                            >
                                                                {subItem?.title}
                                                            </Text>
                                                            {
                                                                subItem?.subSubCategories?.length > 0 &&
                                                                <VStack gap={6} alignItems={'flex-start'} py={4} ml={4}>{
                                                                    subItem?.subSubCategories?.map((items) => {
                                                                        return (
                                                                            <Text onClick={() => showProductsByCategory(items?.id)} fontSize={'sm'} cursor={'pointer'} sx={{ _hover: { scale: '14px' } }} >{items?.title}</Text>
                                                                        )
                                                                    })
                                                                }
                                                                </VStack>
                                                            }
                                                        </>
                                                    )
                                                })
                                            }


                                        </AccordionPanel>
                                    </AccordionItem>
                                )
                            })
                        }
                    </Accordion>

                </VStack>
            </GridItem>
            <GridItem colSpan={4} >
                {
                    productsList.length > 0 ?
                    
                        <Wrap spacing={'8'} w={'full'}>
                              {/* <Pagination data={productsList}  itemsPerPage={8} /> */}
                            <Productlist list={productsList} /> 
                        </Wrap>
                       :
                    loading ?
                     <Wrap  spacing={'8'}>
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />

                     </Wrap>    
                        :
                        <VStack w={'full'} gap={'8'}>
                            <VStack w={'full'} gap={'4'} alignItems={'flex-start'}>
                                <Grid templateColumns='repeat(4, 1fr)' w={'full'} gap={4}>
                                    {
                                        search_history?.slice(1, 5).map((product) => {
                                            return (
                                                <GridItem colSpan={1}>
                                                    <Card pro={product} />
                                                </GridItem>
                                            )
                                        })
                                    }
                                </Grid>

                            </VStack>
                            <VStack w={'full'} gap={'8'} alignItems={'flex-start'}>
                                <Text fontSize={'2xl'} fontWeight={'bold'} >Suggested For you</Text>
                                <Grid templateColumns='repeat(3, 1fr)' w={'full'} gap={4}>
                                    {
                                        search_history?.slice(8, 11).map((product) => {
                                            return (
                                                <GridItem colSpan={1}>
                                                    <SmCard pro={product} />
                                                </GridItem>
                                            )
                                        })
                                    }
                                </Grid>

                            </VStack>

                            <VStack w={'full'} gap={'4'} alignItems={'flex-start'} >
                                <Text fontSize={'2xl'} fontWeight={'bold'} >Shop by</Text>
                                <Wrap w={'full'} gap={1} justifyContent={'flex-start'} alignItems={'flex-start'}>

                                    {
                                        Object.values(menuMainCategories)?.map((category, idx) => {
                                            return (
                                                <VStack flexGrow={'1'} gap={2} cursor={'pointer'} onClick={() => showProductsByCategory(category?.main_category?.id)} >
                                                    <Image src={category?.main_category?.image_url} alt='category' className='rounded-md shadow-md' width={180} height={300} />
                                                    <Text fontSize={'xs'}>{category?.main_category?.title}</Text>

                                                </VStack>
                                            )
                                        })
                                    }
                                </Wrap>

                            </VStack>
                        </VStack>
                }

            </GridItem>

        </Grid>
    )

}

export default CustomResultsSection