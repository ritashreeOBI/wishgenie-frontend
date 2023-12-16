import Image from "next/image"

const { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Spinner } = require("@chakra-ui/react")

export const NavigationModal = ({ viewModal }) => {


    return (
        <>
            <input type="checkbox" id="my_modal_6" checked={viewModal} readOnly className="modal-toggle" />
            <div className="modal">
                <div className="modal-box flex flex-col  items-center">
                    <h3 className="font-bold text-lg "></h3>
                    <Image src="/banner.jpg" width={450} height={200} alt="" />
                    <p className="py-4 text-sm font-bold text-center leading-6">Thank You for choosing WishGenie. </p>
                    <p>Redirecting...</p>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                    <p className="py-4 text-xs opacity-50  text-center ">Please note that  As an Amazon Associate, WishGenie earns from qualifying purchases.</p>

                </div>
            </div>
        </>

    )
}