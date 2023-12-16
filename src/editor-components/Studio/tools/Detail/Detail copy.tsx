import { loadingState, setSelectedVariantDetail, templateSetter, templatesSetter, varaintsSetter, variantIdSetter } from '@/store/slices/editor/template-slice'
import { Box, Button, Divider, Flex, HStack, Stack, Text, VStack, Wrap } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiSolidInfoCircle } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'

function Detail() {
    const [product, setProductDetail] = useState([])
    const [variants, setVariants] = useState([])
    const [selectedColor, setSelectedColor] = useState({ colorCode: '', colorName: ''})
    const [availableColor, setAvailableColor] = useState([])
    const [filteredProducts, setFilterProducts] = useState([])
    const productID = 666
   
    const [template, setTemplate] = useState([])
    const [templateVariant, setTemplateVariant] = useState([])
    const [variantID , setVariantID] = useState(0)

    const dispatch = useDispatch()

    

    const PRINTFULL = "http://3.111.156.224:5000/api/"

    const MOCKUP_TEMPLATE = 'http://3.111.156.224:5000/api/mockup_template'

    function filterUniqueKey(arrayOfObjects: any) {
        const uniqueObjects = arrayOfObjects.filter((object: any, index: any, self: any) => {
            // Find the index of the first occurrence of the current object
            const firstIndex = self.findIndex((obj: any) => obj.color === object.color);

            // Include the object only if its index matches the first occurrence index
            return index === firstIndex;
        });

        return uniqueObjects;

    }

    const filterFromSelectedColor = (value: any, variants: any) => {
        return variants?.filter((product: any) => product.color === value)
    }

    // const getCustomProductDetails = async () => {
    //     axios.get(`${PRINTFULL}/products/${productID}`)
    //         .then(response => {
    //             console.log(response)
    //             if (response.data.code === 200) {
    //                 setProductDetail(response.data.result.product);
    //                 setVariants(response.data.result.variants);
    //                 setSelectedColor(
    //                     {
    //                         colorCode: response.data.result.variants[0]?.color_code,
    //                         colorName: response.data.result.variants[0]?.color,
    //                     }
    //                 )
    //                 dispatch(variantIdSetter(response.data.result.variants[0]?.id))
    //                 setVariantID(response.data.result.variants[0]?.id)
    //                 setAvailableColor(filterUniqueKey(response.data.result.variants))
    //                 setFilterProducts(filterFromSelectedColor(response.data.result.variants[0]?.color, response.data.result.variants))

    //             }
    //             dispatch(loadingState(false))
    //         })
    //         .catch(error => {
    //             // Handle any errors that occurred during the POST request
    //             console.error('Error:', error);
    //         });

             
    // }
    // const getMockup = async () => {
    //     axios.get(`${MOCKUP_TEMPLATE}/${productID}`,)
    //         .then(response => {
    //             setTemplate(data?.result?.templates)
    //             dispatch(templatesSetter(data?.result?.templates))

    //             setTemplateVariant(data?.result?.variant_mapping)
    //             dispatch(varaintsSetter(data?.result?.variant_mapping))

    //             console.log('mockup', response.data)
    //             dispatch(loadingState(false))
              
    //         })
    //         .catch(error => {
    //             // Handle any errors that occurred during the GET request
    //             console.error('Error:', error);
    //         });
    // }

    const getCustomProductDetails = async () => {
        try {
            const {data} = await axios.get(`${PRINTFULL}/products/${productID}`)
            if (data.code === 200) {
                setProductDetail(data.result.product);
                setVariants(data.result.variants);
                setSelectedColor(
                    {
                        colorCode: data.result.variants[0]?.color_code,
                        colorName: data.result.variants[0]?.color,
                    }
                )
                dispatch(variantIdSetter(data.result.variants[0]?.id))
                setVariantID(data.result.variants[0]?.id)
                setAvailableColor(filterUniqueKey(data.result.variants))
                setFilterProducts(filterFromSelectedColor(data.result.variants[0]?.color, data.result.variants))

            }
            dispatch(loadingState(false))
        } catch (error) {
            console.error('Error:', error);
        }
}

    const getMockup = async () => {
        try {
            const {data } = await axios.get(`${MOCKUP_TEMPLATE}/${productID}`)
            setTemplate(data?.result?.templates)
            dispatch(templatesSetter(data?.result?.templates))
            setTemplateVariant(data?.result?.variant_mapping)
            dispatch(varaintsSetter(data?.result?.variant_mapping))
            console.log('mockup', data)
            dispatch(loadingState(false))
        } catch (error) {
            console.error('Error:', error);
        }
}

   const fetchDetail = async () => {
       await getCustomProductDetails();
       await getMockup()
   }
    

    const colorSelection = (color: string, colorCode: string, id: number) => {
        setSelectedColor({
            colorCode: colorCode,
            colorName: color
        })
        dispatch(variantIdSetter(id))
        setVariantID(id)
        setFilterProducts(filterFromSelectedColor(color, variants))

    }
    console.log("filtered", filteredProducts)

    useEffect(() => {
            if (productID) {
            fetchDetail()
    
        }
    }, [productID])

  
    useEffect(() =>{
       const type = templateVariant?.filter((data:any) => data?.variant_id === variantID)
       console.log(type)
       dispatch(templateSetter(type[0]))
       setTemplate(type)
    },[variantID])
    useEffect(( ) =>{
          const variantDetail = variants?.filter((data:any) => data?.id === variantID)[0]
          dispatch(setSelectedVariantDetail(variantDetail))
    },[variantID])

    console.log(availableColor)
    return (
        <VStack gap='30px'>
            <Text fontSize={'md'} fontWeight={'bold'} >Unisex Organic Cotton T-Shirt | Stanley/Stella STTU755</Text>
            <HStack alignItems={'flex-start'}>
                <BiSolidInfoCircle opacity={'80%'} />
                <Text fontSize={'xs'} opacity={'70%'}>Available product customization based on your selling region and preference </Text>

            </HStack>
            <Stack w={'100%'} gap={'10px'}>
                <Text fontSize={'sm'} opacity={'60%'}>Choose Technique</Text>
                <Flex justifyContent={'space-between'} gap={'8px'}>
                    <Button flexGrow={'1'} fontWeight={'normal'} p={'6'} background={'white'} borderWidth={'2px'} borderColor={'blue.400'} >DTG Printing</Button>
                    <Button flexGrow={'1'} fontWeight={'normal'} p={'6'} background={'white'} borderWidth={'2px'} borderColor={'blue.400'} >Embriodery</Button>
                </Flex>
            </Stack>
            <Divider />
            <Stack w={'100%'} gap={'10px'} >
                <Text fontSize={'sm'} opacity={'90%'} fontWeight={'medium'}>Choose color:</Text>
                <Wrap gap={'2px'}>
                    {
                        availableColor?.map((color: any, idx: number) => {

                            return (

                                <Box key={idx} style={{ padding: 2, borderRadius: 10, border:'2px' , borderStyle: color?.color === selectedColor?.colorName ?'none' : 'dashed' , borderColor: '#ffffff' }}  >
                                    {
                                        color?.color_code2 ?
                                            <Button className={`w-6 h-6 rounded-md flex `} style={{ width: 10, height: 10 }} onClick={() => colorSelection(color?.color, color?.color_code,color?.id)}>
                                                <Box className='w-3 h-full rounded-l-md' style={{ backgroundColor: color?.color_code, cursor: 'pointer' }} />
                                                <Box className='w-3 h-full rounded-r-md' style={{ backgroundColor: color?.color_code2, cursor: 'pointer' }} />
                                            </Button>
                                            :
                                            <Button onClick={() => colorSelection(color?.color, color?.color_code, color?.id)} style={{ borderStyle: color?.color === selectedColor?.colorName ?'none' : 'dashed' , borderColor: '#ffffff' , border:2, backgroundColor: color?.color_code ,  width: 40, height: 40, borderRadius: 10, cursor: 'pointer' }} />

                                    }

                                </Box>
                             )
                        })
                    }


                </Wrap>
            </Stack>
            <Divider />
            <Stack w={'100%'} gap={'10px'} >
                <Text fontSize={'sm'} opacity={'90%'} fontWeight={'medium'}>Choose size</Text>
                <Wrap>
                    {filteredProducts.map((variant: any, idx: number) => (
                        <Button key={idx} onClick={() => dispatch(variantIdSetter(variant?.id))} alignItems={'center'} bg={'white'} _hover={{ bg: 'blue.400', fontColor: 'white', borderColor: 'blue.400' }} borderRadius={'md'} justifyContent={'center'} width={'10'} h={'10'} border={'1px'} className='border-2 w-8 h-8 flex cursor-pointer items-center justify-center hover:border-black rounded p-1'>
                            <Text fontSize={'xs'} fontWeight={'bold'}>{variant?.size}</Text>
                        </Button>
                    ))}
                </Wrap>
            </Stack>
        </VStack>
    )

}

export default Detail