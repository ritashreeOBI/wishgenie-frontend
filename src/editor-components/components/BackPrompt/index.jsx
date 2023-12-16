import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
    useDisclosure,
    Text,
    HStack,
} from '@chakra-ui/react'
import useStageObject from '@/editor-components/hooks/use-stage-object'
import { useRouter } from 'next/router'
import { IoReturnDownBackOutline } from 'react-icons/io5'

function BackPrompt() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {stageObjects}  = useStageObject()
    const cancelRef = React.useRef()
    const router = useRouter()
    const backHandler = () => {
        if(stageObjects.length) {
            onOpen()

        }
        else{
          
                router.back()
            
        }
        
      }
    return (
        <div>

           <Button onClick={backHandler} bg={'transparent'}>
            <HStack  cursor={'pointer'}>
                <IoReturnDownBackOutline fontSize={'24'} opacity={'50%'}  />
                <Text color={'blue.500'} fontSize={'sm'}>Back</Text>
            </HStack>
            </Button>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to discard all of your changes?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                        <Button colorScheme='red' ml={3} onClick={() => router.back()} >
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default BackPrompt