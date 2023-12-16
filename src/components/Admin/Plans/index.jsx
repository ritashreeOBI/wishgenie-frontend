import {
  Avatar,
  Box,
  Flex,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AddPlanModal from "./AddPlan";
import { TbEdit } from "react-icons/tb";
import Image from "next/image";
import EditPlan from "./EditPlan";
import DeletePlan from "./DeletePlan";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPlans,
  setSelectedPlan,
  setDefaultPlanThunk,
} from "@/store/slices/admin/plansSlice";
import dayjs from "dayjs";

function PlansHome() {
  const dispatch = useDispatch();
  const { planList, isLoading, selectedPlan } = useSelector(
    (state) => state.planSlice
  );
  const [openEditModal, setOpenEditModal] = useState(false);
  useEffect(() => {
    dispatch(getAllPlans());
  }, []);

  const toggleEditModal = () => {
    setOpenEditModal((prevState) => !prevState);
  };

  return (
    <Box display={"flex"} gap={"6"} flexDirection={"column"}>
      <Flex justifyContent={"space-between"} alignItems={"center"} w={"100%"}>
        <VStack alignItems={"flex-start"} gap={"1"}>
          <Text fontSize={"2xl"}>Plan Management</Text>
          <Text fontSize={"xs"} opacity={"50%"}>
            section to manage art wall plans.
          </Text>
        </VStack>
        <AddPlanModal />
      </Flex>
      {isLoading ? (
        <Box
          w="100%"
          p={4}
          color="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="200px"
        >
          <CircularProgress isIndeterminate value={80} />
        </Box>
      ) : (
        <Box className="overflow-x-auto p-6 rounded-2xl bg-white shadow-sm">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr className="text-center">
                  <Th className="text-center">Image</Th>
                  <Th className="text-center">Title</Th>
                  <Th className="text-center">No of Images</Th>
                  <Th className="text-center">Price</Th>
                  <Th className="text-center">Discount</Th>
                  <Th className="text-center">Default</Th>
                  <Th className="text-center">Created At</Th>
                  <Th className="text-center">Updated At</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {planList.map((plan) => (
                  <Tr key={plan._id}>
                    <Td>
                      <Flex gap="6px" alignItems={"center"}>
                        <Image
                          // name="Basic"
                          src={
                            plan?.imageUrl
                              ? plan?.imageUrl
                              : "/affiliate/no-image-icon.gif"
                          }
                          width={40}
                          height={40}
                          alt={plan.title}
                        />
                      </Flex>
                    </Td>
                    <Td style={{ textTransform: "capitalize" }}>
                      {plan.title}
                    </Td>
                    <Td>
                      <VStack alignItems={"flex-start"} gap="1px">
                        <Text fontSize={"sm"}>{plan.noOfImages}</Text>
                      </VStack>
                    </Td>
                    <Td>
                      <VStack alignItems={"flex-start"} gap="1px">
                        <Text fontSize={"sm"}>${plan.price}</Text>
                      </VStack>
                    </Td>
                    <Td>
                      <VStack alignItems={"flex-start"} gap="1px">
                        <Text fontSize={"sm"}>${plan.discount}</Text>
                      </VStack>
                    </Td>
                    <Td>
                      <VStack alignItems={"flex-end"} gap="1px">
                        <Text fontSize={"sm"}>
                          {plan.isDefault ? (
                            <input type="checkbox" checked readOnly />
                          ) : (
                            <button
                              className="bg-slate-500 p-1 rounded-md text-xs text-slate-200 hover:text-slate-50"
                              onClick={() => {
                                dispatch(setDefaultPlanThunk(plan._id));
                              }}
                            >
                              Set Default
                            </button>
                          )}
                        </Text>
                      </VStack>
                    </Td>
                    <Td>
                      <Text fontSize="sm" textAlign="center">
                        {dayjs(plan.createdAt).format("DD-MMM-YYYY")}
                      </Text>
                    </Td>

                    <Td>
                      <Text fontSize="sm" textAlign="center">
                        {dayjs(plan.updatedAt).format("DD-MMM-YYYY")}
                      </Text>
                    </Td>
                    <Td>
                      <HStack gap={8} fontSize={"2xl"}>
                        <TbEdit
                          background={"blue.400"}
                          cursor={"pointer"}
                          onClick={() => {
                            toggleEditModal();
                            dispatch(setSelectedPlan(plan));
                          }}
                        />

                        <EditPlan id={plan._id} />
                        <DeletePlan id={plan._id} />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {openEditModal && (
              <EditPlan
                open={openEditModal}
                closeHandler={toggleEditModal}
                plan={selectedPlan}
              />
            )}
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}

export default PlansHome;

