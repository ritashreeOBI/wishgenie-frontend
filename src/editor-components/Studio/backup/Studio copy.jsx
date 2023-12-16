import { Flex, Center, Box, Spinner, Button, Text, ModalOverlay, VStack, HStack, Tooltip } from '@chakra-ui/react';
import React, { useState, useEffect, lazy, useRef, use } from 'react';
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
import { BsInfo } from 'react-icons/bs';
import Hotkeys from './tools/Hotkeys';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import { Router, useRouter } from 'next/router';
import BackgroundImageObject from './objects/ImageObject/BackgroundImageObj';
import { SlEarphones } from 'react-icons/sl';
import { LuLayoutDashboard } from 'react-icons/lu'
import { HiMagnifyingGlassPlus } from 'react-icons/hi2'
import { LiaExpandSolid } from 'react-icons/lia';
import { setScale } from '@/store/slices/editor/frame-slice';
import Art from './tools/AiArt';
import BackPrompt from '../components/BackPrompt';
import { ToastContainer } from 'react-toastify';

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

  const router = useRouter()
  const [navbarHeight, setNavbarHeight] = useState(NAVBAR_HEIGHT);
  const [editingToolbarHeight, setEditingToolbarHeight] = useState(EDITING_TOOLBAR_HEIGHT);
  const OPTIONS = editOptions
  const [selected, setSelected] = useState('')
  const [typeID, setTypeId] = useState(0)
  const dispatch = useDispatch()
  const { variantId, selectedVaraintDetails, selectedType, templateTypes, templates, templateVariants, pending } = useSelector(state => state.template)
  const { files, recipentInfo } = useSelector((state) => state.order)
  const [zoom, setZoom] = useState(false)

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



  useEffect(() => {
    // console.log("------" ,templateTypes?.templates?.length && templateTypes?.templates[0].template_id)
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
  const transformers = { imageTransformer };

  const { onObjectSelect, resetObjectSelect } = useObjectSelect(transformers);

  useEffect(() => {
    if (templateTypes?.templates?.length > 0) {
      dispatch(setAreaType(templateTypes?.templates[0]?.placement))
    }
  }, [templateTypes])
  console.log(selected)

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
      if(zoom){
        setDimension(pre => {
          return {
            width: 600,
            height: 600,
            ratio: selected?.template_width / 600
          }
        })
        
      }
      else{
        setDimension(pre => {
          return {
            width: 600,
            height: 600,
            ratio: selected?.template_width / 600
          }
        })
        
      }
     
    }
    setTimeout(() => setImageLoading(true), 1000)
    //setImageLoading(false)
  }, [selectedType, zoom , selected?.template_width, selectedType?.template_height])


  const backHandler = () => {
    router.back()
  }

  const [scale, setScale] = useState(1);
  
  const handleZoomIn = () => {
    setScale(scale * 1.2); // Increase the scale by 20% for zoom in
  };

  const handleZoomOut = () => {
    setScale(scale / 1.2); // Decrease the scale by 20% for zoom out
  };

  const magnificationHandler = () => {
    setZoom(pre => !pre)
  }
return (
  <>
    {
      <Box bg={'white'}>

      

        <Flex width={'100%'} px={'4'} py={'4'} alignItems={'center'} gap={'4'} bg='white' boxShadow={'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'} display={'flex'} justifyContent='space-between' >

          <Flex alignItems={'center'} gap={'6'}>
            <BackPrompt/>
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
          <Toolbar stageRef={stageRef} selected={selected} />

          <Box position={'relative'} flexGrow={1} bg={'whitesmoke'} >
            <EditingToolbar stageRef={stageRef}  />

            <VStack p={2} px={4} gap={4} position={'relative'} >
              <Hotkeys />
              <Flex overflowX={'auto'} height={'fit-content'} justifyContent={'center'} gap={'5'} position={'relative'} >

                {
                  templateTypes?.templates?.map((list, idx) => {
                    let selected = list?.placement === selectedType
                    return (
                      <Text textColor={selected ? 'white' : ''} bg={selected ? 'blue.400' : 'white'} key={idx} onClick={() => selectedArea(list?.template_id, list?.placement)} shadow='md' style={{ padding: 10, textAlign: 'center', margin: '5px', fontSize: '12px', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} >
                        {sentenceCase(list?.placement)}
                      </Text>
                    )
                  })
                }

              </Flex>


              <Box sx={{ shadow: 'md', width: "100%", position: 'relative', borderRadius: 'xl', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white' }}>
                {
                  imageLoading ?
                    <>
                      <Box sx={{ position: 'relative', background: selected?.background_color, w: selected?.template_width/dimension?.ratio, h:selected?.template_height/dimension?.ratio}} >

                        {selected?.image_url && !zoom   &&

                          <Image
                            src={selected?.image_url}
                            priority
                            className=''
                            alt=''
                            style={{ border:'1px'}}
                            width={selected?.template_width/ dimension?.ratio  || 0}
                            height={selected?.template_height/ dimension?.ratio || 0 } 
                            />


                        }
                        <Frame stageRef={stageRef} zoom={zoom} dimension={dimension} selected={selected} ratio={dimension.ratio} />

                      </Box>
                      <Art/>
                      <VStack 
                      alignItems={'flex-start'}
                       sx={{
                        position: 'absolute',
                        //shadow:'md',
                        right: 4,
                        top: 4,
                        zIndex: 1,
                        gap:16

                      }}>
                        
                        
                        <VStack
                         gap={6} 
                         fontSize={'2xl'} 
                         color='blue.600' 
                         position={'relative'} 
                         sx={{ 
                          p: 3,
                          py: 4,
                       
                          border: '2px solid #F5F5F5 ',
                          borderRadius: 'xl',
                          }}
                           >
                          <LuLayoutDashboard title='all layout' />
                          <LiaExpandSolid title='expand' />
                          <HiMagnifyingGlassPlus title='zoom' onClick={magnificationHandler} />

                        </VStack>
                      </VStack>
                    </>
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
              {/* 
                <Stage  width={dimension.width}
                            height={dimension.height}
                             style={{background:'white' }} >
                     <Layer>
                         <BackgroundImageObject src={selected?.image_url} scale={scale} dimension={dimension}/>
                     </Layer>
                </Stage>
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>  */}
            </VStack>
          </Box>
        </Flex>

      </Box>


    }
  </>
);
};

export default Studio;
