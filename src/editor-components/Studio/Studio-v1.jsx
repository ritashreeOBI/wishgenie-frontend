import { Flex, Center, Box, Spinner, Button, Text, ModalOverlay, VStack } from '@chakra-ui/react';
import React, { useState, useEffect, lazy, useRef } from 'react';
import Konva from 'konva';
import Frame from './Frame';
import Toolbar from './Toolbar';
import EditingToolbar from './EditingToolbar/EditingToolbar';
import { NAVBAR_HEIGHT, EDITING_TOOLBAR_HEIGHT, FRAME_CONTAINER_PADDING } from '@/editor-components/consts/components';
import Image from 'next/image';
import { editOptions } from '@/demo/demoOption';
import { useDispatch, useSelector } from 'react-redux';
import { sentenceCase } from 'sentence-case';
import { setAreaType } from '@/store/slices/editor/template-slice';
import axios from 'axios';
import Link from 'next/link';
import { SpinnerIcon } from '@chakra-ui/icons';
import { Layer, Stage } from 'react-konva';
import ImageObject from './objects/ImageObject/ImageObject';
import useObjectSelect from '../hooks/use-object-select';
import useTransformer from '../hooks/use-transformer';


// interface option {
//   "template_id": number,
//   "image_url": string,
//   "background_url": any,
//   "background_color": string,
//   "printfile_id": number,
//   "template_width": number,
//   "template_height": number,
//   "print_area_width": number,
//   "print_area_height": number,
//   "print_area_top": number,
//   "print_area_left": number,
//   "is_template_on_front": Boolean,
//   "orientation": string,
//   "placement": string,
// }

const Studio = ({ productId }) => {
  const stageRef = React.useRef(null);

  const [navbarHeight, setNavbarHeight] = useState(NAVBAR_HEIGHT);
  const [editingToolbarHeight, setEditingToolbarHeight] = useState(EDITING_TOOLBAR_HEIGHT);
  const OPTIONS = editOptions
  const [selected, setSelected] = useState(OPTIONS[0])
  const [typeID, setTypeId] = useState(0)
  const dispatch = useDispatch()
  const { variantId, selectedVaraintDetails, selectedType, templateTypes, templates, templateVariants, pending } = useSelector(state => state.template)
  const { files, recipentInfo } = useSelector((state) => state.order)

  console.log(selectedVaraintDetails)
  console.log(files, recipentInfo)


  useEffect(() => {
    const navbar = document.querySelector('#navbar')
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const editingToolbar = document.querySelector('#editing_toolbar')
    setEditingToolbarHeight(editingToolbar.offsetHeight);

  }, []);


  useEffect(() => {
    const selectedTemplate = templates?.filter((data) => data?.template_id === typeID)[0]
    setSelected(selectedTemplate)
  }, [variantId, templateTypes, typeID])

  console.lo

  useEffect(() => {
    console.log("------" ,templateTypes?.templates?.length && templateTypes?.templates[0].template_id)
    setTypeId(templateTypes?.templates?.length && templateTypes?.templates[0].template_id
    )
  }, [templateTypes, variantId])

  const [imageLoading, setImageLoading] = useState(false);

  const selectedArea = (id, placement) => {
    setTypeId(id)
    dispatch(setAreaType(placement))
  }

  const [dimension, setDimension] = useState({
    width: 0,
    height: 0,
    ratio: 1,
  })



  const OrderHandler = async () => {
    try {

      const ORDER_API = "http://3.111.156.224:5000/api/create_new_order"
      const order_detail = {
        "recipient": recipentInfo,
        "items": [
          {
            "variant_id": variantId,
            "quantity": 1,
            "files": files,
            "options": [
              {
                "id": "stitch_color",
                "value": "#101010",
              }
            ]
          }
        ]
      }
      const { data } = await axios.post(ORDER_API, order_detail)
      console.log(data)

    } catch (error) {
      console.log(error)
    }
  }
  const { transformer: imageTransformer, onTransformerEnd: onImageTransformerEnd } = useTransformer({ stageRef });
  const transformers = { imageTransformer};
  const { onObjectSelect, resetObjectSelect } = useObjectSelect(transformers);
  useEffect(() => {
    if (templateTypes?.templates?.length > 0) {
      dispatch(setAreaType(templateTypes?.templates[0]?.placement))
    }
  }, [templateTypes])

  useEffect(() => {
    if (selected?.template_width < 600 && selected?.template_height < 600) {
      setDimension(pre => {
        return {
          width: selected?.template_width,
          height: selected?.template_height,
          ratio: 1
        }
      })
    }
    else {
      setDimension(pre => {
        return {
          width: 600,
          height: 600,
          ratio: selected?.template_width / 600
        }
      })
    }
    setTimeout(() => setImageLoading(true), 1000)
    //setImageLoading(false)
  }, [selectedType, selected?.template_width, selectedType?.template_height])
  console.log(selectedType)
  console.log(stageRef)

  return (
    <>
      {

  

        <Box bg={'white'}>

          <Flex width={'100%'}  px={'4'} py={'2'} alignItems={'center'} gap={'4'}  bg='white' boxShadow={'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'} display={'flex'} justifyContent='space-between' >
           
           <Flex alignItems={'center'} gap={'2'}>
           
            <Text fontWeight={'bold'} fontSize={'xl'}>{selectedVaraintDetails?.name}</Text>
           </Flex>
           

            <Flex alignItems={'center'} gap={'6'}  >
              <Text fontSize={'xl'} fontWeight={'semibold'}>${selectedVaraintDetails?.price}</Text>
              <Button onClick={OrderHandler} bg={'blue.400'} _hover={{ bg: 'blue.300' }} p={'5'} textColor={'white'} fontSize={'md'}>
                save product template
              </Button>
            </Flex>
          </Flex>

          <Flex h={'100vh'} w="100%" borderTop={'2px'} borderColor="gray.200">
            <Toolbar stageRef={stageRef} />
            <Box position={'relative'} flexGrow={1} bg={'whitesmoke'} >
              <EditingToolbar stageRef={stageRef} />
              <VStack p={2} gap={4}>
              <Flex   overflowX={'auto'} height={'fit-content'} justifyContent={'center'} gap={'5'}  >
                  {
                  templateTypes?.templates?.map((list, idx) => {
                    let selected = list?.placement === selectedType
                    return (
                      <Text textColor={selected ? 'white' : ''} bg={selected ? 'blue.400' : 'white'} key={idx} onClick={() => selectedArea(list?.template_id, list?.placement)} style={{ padding: 10, textAlign:'center', marginTop: '5px',  fontSize: '12px', borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} >
                        {sentenceCase(list?.placement)}
                      </Text>
                    )
                  })
                }

              </Flex>
   
              <Box sx={{  width:"100%" ,borderRadius:'md', display:'flex' , flexDirection:'column', alignItems:'center' , background:'white'}}>
                {
                  imageLoading ?
                    <div style={{ position: 'relative' , background:selected?.background_color  }} >
                      {/* src=*/}
                      
                     
                      {selected?.image_url &&
                      
                        <Image
                          src={selected?.image_url}
                          priority
                          className=''
                          alt='' 
                          width={dimension.width}
                          height={dimension.height}/>
                        
                    
                        }
                        <Frame  stageRef={stageRef} dimension={dimension} selected={selected} ratio={dimension.ratio} /> 

                    </div>
                    :
                    <Spinner
                      thickness='4px'
                      speed='0.65s'
                      emptyColor='gray.200'
                      color='blue.500'
                      size='xl'
                    />
                }

              </Box>
              </VStack>
            </Box>
          </Flex>

        </Box>
     

      }
    </>
  );
};

export default Studio;
