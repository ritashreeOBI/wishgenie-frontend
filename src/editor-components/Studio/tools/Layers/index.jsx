import useStageObject from '@/editor-components/hooks/use-stage-object';
import { Box, HStack, Tag, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { BiSolidLockAlt, BiSolidLockOpenAlt } from 'react-icons/bi';
import { MdOutlineDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';

import { sentenceCase } from 'sentence-case';

function Layers({selected}) {
    const { stageObjects, replaceAll , removeOne , updateMany , updateOne} = useStageObject();
    const  {selectedType} = useSelector(state =>  state.template)
    const dragItem = useRef(null);
    const dragOverItem = useRef(null)
    const [targetObject , setTargetObject] = useState({})
    const [draggedObject , setDraggedObject] = useState({})



    // useEffect(() => {
    //     console.log("stage Object" , stageObjects)
    //    setStageObjectList(stageObjects)
    // },[stageObjects])

    // const handleSort = (e , obj) => {
    
    //    let _stageObject = [...stageObjects];
    //    //remove and save the dragged item content
    //    const draggedItem = _stageObject.splice(dragItem.current , 1)[0]

    //    //switch drag end
    //  _stageObject.splice(dragOverItem.current , 0 , draggedItem)

    //  console.log(dragOverItem , dragItem)
    
    //  //setStageObjectList(_stageObject)
    //  const updatedObj = {
    //     id: obj?.id,
    //     data:{
    //         ...obj?.data,
    //         z_index:dragOverItem.current
    //     }
    //  }
    //  const updatedObject = [
    //     targetObject,
    //     currentObject
    //  ]
    //  console.log(updatedObj)
    //  //updateMany(updatedObject)
    //  //replaceAll(_stageObject)
    //  dragItem.current = null ;
    //  dragOverItem.current = null ;
    // }
    const handleSort = () =>{
        const updatedObject = [
            {
                id : targetObject?.id,
                data:{
                    ...targetObject?.data ,
                    z_index:dragItem?.current 
                }
            },
            {
                id : draggedObject?.id,
                data:{
                    ...draggedObject?.data ,
                    z_index:dragOverItem?.current 
                }
            },
        ]
        
        updateOne(updatedObject[0])
        updateOne(updatedObject[1])

        
    }

    const  TargetObjectSetter = (obj) =>{
        setTargetObject(obj)
        dragOverItem.current = obj?.data?.z_index
    }

    const currentObjectSetter = (obj) => {
        setDraggedObject(obj)
        dragItem.current = obj?.data?.z_index
    }
  

    const sortStageObject = () => {
        return stageObjects.sort((obj1, obj2) => {
          if (obj1.data.z_index === obj2.data.z_index) {
            if (obj1.data.z_index < 0) {
              return obj2.data.updatedAt - obj1.data.updatedAt;
            }
            return obj1.data.updatedAt - obj2.data.updatedAt;
          }
          return obj2.data.z_index - obj1.data.z_index;
        });
    };

    const DeleteObjectFromStage = (id) => {
         removeOne(id)
    }
   
    
    console.log("check" , stageObjects)

    return (
        <Box h={'100%'}>
            {
                stageObjects?.length > 0
                    ? <>

                        <VStack gap={'4'}>
                            <Text fontSize={'md'} fontWeight={'bold'}>Layers</Text>
                            {
                                sortStageObject()?.filter((stage) => stage.data.location === selectedType).map((obj , idx) => {
                                
                                    return (
                                                    <section 
                                                    draggable={obj?.data?.draggable} 
                                                    style={{background:'#F5F5F5'}}
                                                    className='w-full shadow-md bg-neutral-100 rounded-xl cursor-pointer p-4 '
                                                    onDragEnter={(e) => TargetObjectSetter(obj)}
                                                    onDragStart={(e) => currentObjectSetter(obj) }
                                                    onDragEnd={(e) => handleSort ( e , obj)}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    >
                                                        {
                                                              obj?.data?.type === "image" || obj?.data?.type === 'shape' ?
                                                              <HStack fontSize={'xs'} w={'full'} >
                                                              <Image src={obj?.data.src} width={'50'} height={'50'} alt='stage-image' style={{ borderRadius: 4 }} />
                                                              <VStack alignItems={'flex-start'} w={'full'} flexGrow={'1'}>
                                                                  <HStack justifyContent={'flex-end'} gap={4} w={'full'}>
                                                                      {
                                                                          obj?.data?.draggable ? <BiSolidLockOpenAlt size={'16px'} /> : <BiSolidLockAlt size={'16px'} />
                                                                      }
                                                                      <MdOutlineDelete className='text-red-400' size={'20px'} onClick={() => DeleteObjectFromStage(obj?.id)} />
                                                                  </HStack>
  
                                                                  <HStack>
                                                                      <Tag bg={'blackAlpha.100'} fontSize={'sm'}>
                                                                          {sentenceCase(obj?.data?.location)}
                                                                      </Tag>
                                                                      <Tag bg={'blackAlpha.100'} fontSize={'xs'}>
                                                                          {sentenceCase(obj?.data?.type)}
                                                                      </Tag>
  
                                                                  </HStack>
  
                                                                  <HStack fontSize={'xs'}>
                                                                      <strong>width:</strong>
                                                                      <Text fontSize={'sm'} >{parseFloat(obj?.data?.height).toFixed(1)}</Text>
                                                                      <strong>height:</strong>
                                                                      <Text fontSize={'sm'}>{parseFloat(obj?.data?.width).toFixed(1)}</Text>
                                                                  </HStack>
                                                              </VStack>
                                                              </HStack> 
                                                             : obj?.data?.type === "text" ?
                                                             <HStack fontSize={'xs'} width={'full'} flexGrow={'1'}>
                                                             <Box position={'relative'}>
                                                                 <Image src={'/transparent.jpg'} width={'100'} height={'100'} alt="transparent" style={{ opacity: '50%' }} />

                                                                 <Text fontStyle={obj?.data?.fontStyle} color={obj?.data?.fill} fontFamily={obj?.data?.fontFamily} position={'absolute'} top={'12'} left={'4'}>
                                                                     {obj?.data?.text}
                                                                 </Text>
                                                             </Box>
                                                             <VStack alignItems={'flex-start'}>
                                                                 <HStack gap={'4'} justifyContent={'flex-end'} w={'full'}>
                                                                     {
                                                                         obj?.data?.draggable ? <BiSolidLockOpenAlt size={'16px'} /> : <BiSolidLockAlt size={'16px'} />
                                                                     }
                                                                     <MdOutlineDelete 
                                                                      className='text-red-400' 
                                                                      size={'20px'} 
                                                                      onClick={() => DeleteObjectFromStage(obj?.id)} 
                                                                      />

                                                                 </HStack>

                                                                 <HStack>
                                                                     <Tag bg={'blackAlpha.100'} fontWeight={'bold'} fontSize={'sm'}>
                                                                         {sentenceCase(obj?.data?.location)}
                                                                     </Tag>
                                                                     <Tag bg={'blackAlpha.100'} fontSize={'xs'}>
                                                                         {sentenceCase(obj?.data?.type)}
                                                                     </Tag>

                                                                 </HStack>

                                                                 <HStack fontSize={'xs'}>
                                                                     <strong>width:</strong>
                                                                     <Text fontSize={'sm'} >{parseFloat(obj?.data?.height).toFixed(1)}</Text>
                                                                     <strong>height:</strong>
                                                                     <Text fontSize={'sm'}>{parseFloat(obj?.data?.width).toFixed(1)}</Text>
                                                                 </HStack>
                                                             </VStack>
                                                             </HStack>
                                                             :""
                                                        }
                                                   
                                                       

                                                   
                                                    </section>
                                                    
                                                 
                                            
                                    
                                    )
                                })
                            }
                        </VStack>
                    </>
                    :
                    <VStack h={'full'} >
                        <Image src={'/noData.png'} alt='nodata' width={'200'} height={'200'} />
                        <Text fontSize={'md'} fontWeight={'bold'}>Start Desiginig</Text>
                        <Text fontSize={'sm'} >Your design layers will appear here.</Text>
                    </VStack>
            }

        </Box>
    )
}

export default Layers