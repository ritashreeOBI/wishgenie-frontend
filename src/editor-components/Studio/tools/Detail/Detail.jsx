import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BiSolidInfoCircle } from 'react-icons/bi';
import { Box, Button, Divider, Flex, HStack, Stack, Text, VStack, Wrap } from '@chakra-ui/react';
import {
  loadingState,
  templateSetter,
  templatesSetter,
  variantIdSetter,
  varaintsSetter,
  setSelectedVariantDetail,
  setPrintTechnique,
} from '@/store/slices/editor/template-slice';
import { useRouter } from 'next/router';
import { GET_PRODUCT_DETAIL, MOCKUP_TEMPLATE } from '@/api/Api';



function Detail() {
  const [product, setProductDetail] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedColor, setSelectedColor] = useState({ colorCode: '', colorName: '' });
  const [availableColor, setAvailableColor] = useState([]);
  const [filteredProducts, setFilterProducts] = useState([]);
 
  const router = useRouter()
  const productID = router?.query?.productID ; 

  const [template, setTemplate] = useState([]);
  const [templateVariant, setTemplateVariant] = useState([]);


  const dispatch = useDispatch();

  const {variantId , templateTypes, templates, printTechnique, templateVariants } = useSelector(state => state.template)


  // Function to filter unique keys in an array of objects
  function filterUniqueKey(arrayOfObjects) {
    const uniqueObjects = arrayOfObjects.filter((object, index, self) => {
      const firstIndex = self.findIndex((obj) => obj.color === object.color);
      return index === firstIndex;
    });
    return uniqueObjects;
  }

  // Function to filter variants based on selected color
  const filterFromSelectedColor = (value, variants) => {
    return variants?.filter((product) => product.color === value);
  };

  useEffect(() =>{
    if(router.query.type){
     dispatch(setPrintTechnique(router.query?.type?.toLowerCase() || ""))
    }
    else {
     dispatch(setPrintTechnique(product?.techniques?.filter(tech => tech.is_default)[0]?.key?.toLowerCase()))
    }
 } ,[router.query])


  const getCustomProductDetails = async () => {
        axios.get(`${GET_PRODUCT_DETAIL}/${productID}`)
            .then(response => {
              
                let productDetail = response.data.result[0]
             
                if (productDetail) {
                    setProductDetail(productDetail);
                    setVariants(productDetail.variants);
        
                    setSelectedColor(
                        {
                            colorCode: productDetail.variants[0]?.color_code,
                            colorName: productDetail.variants[0]?.color,
                        }
                    )
                    
                   dispatch(variantIdSetter(  productDetail.variants[0]?.id))
                    //setVariantID(productDetail.variants[0]?.id)
                    setAvailableColor(filterUniqueKey(productDetail.variants))
                    setFilterProducts(filterFromSelectedColor(productDetail.variants[0]?.color, productDetail.variants))

                }
                dispatch(loadingState(false))
            })
            .catch(error => {
                // Handle any errors that occurred during the POST request
                console.error('Error:', error);
            });

             
  }


  const getMockup = async () => {
    dispatch(loadingState(true))
        axios.get(`${MOCKUP_TEMPLATE}/${productID}?technique=${printTechnique}`,)
            .then(response => {
             
                setTemplate(response?.data?.result?.templates)
                dispatch(templatesSetter(response?.data?.result?.templates))

                setTemplateVariant(response?.data?.result?.variant_mapping)
                dispatch(varaintsSetter(response?.data?.result?.variant_mapping))

                
              getCustomProductDetails()
              dispatch(loadingState(false))
            })
            .catch(error => {
                // Handle any errors that occurred during the GET request
                console.error('Error:', error);
            });
    }

  // Function to handle color selection
  const colorSelection = (color, colorCode, id) => {
    setSelectedColor({
      colorCode: colorCode,
      colorName: color,
    });


    dispatch(variantIdSetter(id));
    // setVariantID(id);
    setFilterProducts(filterFromSelectedColor(color, variants));
  };

  const variantIDSetter = ( id ) =>{
    dispatch(variantIdSetter(id))
   // setVariantID(id)
  }

  useEffect(() => {
    if (productID) {
      // getCustomProductDetails();
      getMockup()
    }
  }, [productID, printTechnique])


  useEffect(() => {
    const type = templateVariants?.filter((data) => data?.variant_id === variantId);
    dispatch(templateSetter(type[0]));
    setTemplate(type);
  }, [variantId,templateVariants]);

  useEffect(( ) => {
    const variantDetail = variants?.filter((data) => data?.id === variantId)[0]
   
    dispatch(setSelectedVariantDetail(variantDetail))
},[variantId, variants])

  return (
    <VStack gap="30px" pb={'20'}>
      <Text fontSize="md" fontWeight="bold">
        {/* Unisex Organic Cotton T-Shirt | Stanley/Stella STTU755 */}
        {product?.title}
      </Text>
      <Text fontSize="sm" w={'100%'}>
        {/* Unisex Organic Cotton T-Shirt | Stanley/Stella STTU755 */}
        Brand - {product?.brand}
      </Text>
      <HStack alignItems="flex-start">
        <BiSolidInfoCircle opacity="80%" />
        <Text fontSize="xs" opacity="70%">
          Available product customization based on your selling region and preference
        </Text>
      </HStack>
      <Stack w="100%" gap="10px">
        <Text fontSize="sm" opacity="60%">
          Choose Technique
        </Text>
        <Flex justifyContent="space-between" gap="8px">
            {
                product?.techniques?.map((tech , idx) =>{
                    return(
                        <Button key={idx} onClick={() => dispatch(setPrintTechnique(tech?.key.toLowerCase()))} flexGrow="1" borderRadius={'full'} shadow={'md'} fontWeight="normal" p="6" background={tech?.key.toLowerCase() === printTechnique ? "blue.500":"white" } color={tech?.key.toLowerCase() === printTechnique ?"white": "blue.500"}>
                         {tech?.display_name}
                      </Button>
                    )
                })
            }
        </Flex>
      </Stack>
      <Divider />
      <Stack w="100%" gap="10px">
        <Text fontSize="sm" opacity="90%" fontWeight="medium">
          Choose color:
        </Text>
        <Wrap gap="2px">
          {availableColor?.map((color, idx) => {
           
            return (
              <Box
                key={idx}
                style={{
                  padding: 2,
                  borderRadius: 10,
                  border: 2,
                  borderStyle: color?.color === selectedColor?.colorName ? 'dashed':'solid' ,
                  borderColor:color?.color === selectedColor?.colorName ? 'black':'white',
                  
                }}
              >
                {color?.color_code2 ? (
                  <Flex
                   
                    style={{borderRadius:8 , overflow:'hidden'}}
                    onClick={() => colorSelection(color?.color, color?.color_code,color?.id)}
                  >
                    <Box
                  
                      style={{ backgroundColor: color?.color_code, cursor: 'pointer' ,width: '15px', height: '30px'  }}
                    />
                    <Box
                   
                      style={{ backgroundColor: color?.color_code2, cursor: 'pointer',width: '15px', height: '30px'  }}
                    />
                  </Flex>
                ) : (
                  <Button
                    onClick={() => colorSelection(color?.color, color?.color_code, color?.id)}
                    style={{
                      
                      borderColor: '#ffffff',
                      border: '1px',
                      boxShadow:'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                      backgroundColor: color?.color_code,
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      cursor: 'pointer',
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Wrap>
      </Stack>
      <Divider />
      <Stack w="100%" gap="10px">
        <Text fontSize="sm" opacity="90%" fontWeight="medium">
          Choose size
        </Text>
        <Wrap>
          {filteredProducts.map((variant, idx) => (
            <Button
              key={idx}
              onClick={() => variantIDSetter(variant?.id) }
              alignItems="center"
              bg= { variantId  === variant?.id ? 'blue.400' :"white" } 
              color={ variantId  != variant?.id ? 'blue.400' :"white" }
              _hover={{ bg: 'blue.400', color: 'white', borderColor: 'blue.400' }}
              borderRadius="md"
              justifyContent="center"
              minWidth="12"
              minH="12"
              border="1px"
            >
              <Text fontSize="xs" fontWeight="bold">
                {variant?.size}
              </Text>
            </Button>
          ))}
        </Wrap>
      </Stack>
    </VStack>
  );
}

export default Detail;
