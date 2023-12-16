import useStageObject from '@/editor-components/hooks/use-stage-object';
import { Text, Textarea, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

function TextContent({selectedObject}) {
    const { updateOne  } = useStageObject();
 
    

    const handleChange = (e) => {
        console.log(selectedObject)
        updateOne({ id:selectedObject?.id, data: { text:e.target.value } });
      }; 

    return (
        <VStack alignItems={'flex-start'} w={'full'}>
            <Text fontSize={'xs'} opacity={'60%'} fontWeight={'bold'}  >Content</Text>
            <Textarea placeholder='text ....' value={selectedObject?.data?.text}  onChange={handleChange} />
        </VStack>

    )
}

export default TextContent