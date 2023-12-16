import React from "react";
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { deletePlanById } from "@/store/slices/admin/plansSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
function DeletePlanModal({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const dispatch = useDispatch();

  const deletePlanHandler = async () => {
    dispatch(deletePlanById(id))
      .then(() => {
        toast.success("Plan deleted successfully");
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err || "Something went wrong");
      });
  };

  return (
    <>
      <RiDeleteBin3Line onClick={onOpen} color="red" cursor={"pointer"} />
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent width={"500px"}>
          <VStack alignItems={"flex-start"} gap={"1px"} p={"6"}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Delete Plan
            </Text>
            <Text fontSize={"10px"} opacity={"50%"}>
              Removal of plan will results the removal of plan information
            </Text>
          </VStack>
          <ModalCloseButton />
          <ModalBody pb={2}>
            <Text>Are you sure you want to delete the plan content?</Text>
          </ModalBody>
          <HStack p={4} py={6} gap={4} justifyContent={"end"}>
            <Button
              bg={"red.400"}
              onClick={deletePlanHandler}
              textColor={"white"}
            >
              Confirm
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </HStack>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeletePlanModal;
