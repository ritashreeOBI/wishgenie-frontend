import { HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import TextColorPicker from './TextColorPicker'
import FontStyleSettings from './FontStyleSettings'
import FontSizeInput from './FontSizeInput'
import LetterSpacingSettings from './SpacingSettingsMenu/LetterSpacingSettings'
import LineSpacingSettings from './SpacingSettingsMenu/LineSpacingSetting'

function FontStyling({ selectedObject }) {
    return (
        <VStack alignItems={'flex-start'}>
            <Text fontSize={'xs'} opacity={'60%'} fontWeight={'bold'}  >Text Styling</Text>
            <HStack>
                <FontSizeInput id={selectedObject.id} fontSize={selectedObject.data.fontSize} />
                <TextColorPicker id={selectedObject.id} selectedObject={selectedObject.data} />
                <FontStyleSettings
                    id={selectedObject.id}
                    fontVariants={selectedObject.data.fontVariants}
                    fontStyle={selectedObject.data.fontStyle}
                    webFont={selectedObject.data.webFont}
                />
            </HStack>
        </VStack>
    )
}

export default FontStyling