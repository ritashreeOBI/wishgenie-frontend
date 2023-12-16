import { KeysWithDescription } from '@/editor-components/consts/keys';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Button,
    Box,
    VStack,
    Kbd,
    Divider,
    Text,
    Tooltip,
} from '@chakra-ui/react'

import React from 'react'
import { BsInfo } from 'react-icons/bs'


const HotkeyItem = ({ hotkey }) => {
    const keyValue = hotkey.key[0] === ' ' ? 'Space' : hotkey.key[0];
    const key = (
        <span>
            <Kbd fontSize={'xs'} >{keyValue}</Kbd>
            {hotkey.key[1] && (
                <span>
                    + <Kbd fontSize={'xs'} >{hotkey.key[1]}</Kbd>
                </span>
            )}
        </span>
    );

    return (
        <VStack spacing={2}>
            {key}
            <Text fontSize={'8px'}>{hotkey.description}</Text>
        </VStack>
    );
};

function Hotkeys() {

    const keys = KeysWithDescription.map((hotkey) => ({
        ...hotkey,
        key: (hotkey.key).split('+'),
    }));
    return (
        <Box sx={{ position: 'absolute', top: 2, right: 4 ,}}>
            <Popover >
                <PopoverTrigger >
                    
                    <Box sx={{ padding: 1,  opacity:'50%',  rounded: 'full', bg: 'white', shadow: 'md' }}>
 <BsInfo text />
                    </Box>
                    
                </PopoverTrigger>
                <PopoverContent height={'300px'} width={'240px'} bg={'whiteSmoke'}  overflow='scroll' mr={4} rounded={'xl'}>
                

                    <PopoverBody >
                        <VStack spacing={2} divider={<Divider borderColor="gray.300" />}>
                            {keys.map((key, i) => (
                                <HotkeyItem key={i} hotkey={key} />
                            ))}
                        </VStack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Box>
    )
}

export default Hotkeys