import React, { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  InputGroup,
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
import { useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import axios from "axios";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { editPlan, setSelectedPlan } from "@/store/slices/admin/plansSlice";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
function EditAffiliate({ open, closeHandler, plan }) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const inputRef = useRef(null);
  const [image, setImage] = useState(
    plan && plan.imageUrl ? plan.imageUrl : ""
  );
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [content, setContent] = useState(
    plan && plan.description ? plan.description : ""
  );
  const [title, setTitle] = useState(plan && plan.title ? plan.title : "");
  const [price, setPrice] = useState(plan && plan.price ? plan.price : 0);
  const [colorLight, setColorLight] = useState(
    plan && plan.colorLight ? plan.colorLight : "#fffde7"
  );
  const [colorDark, setColorDark] = useState(
    plan && plan.colorDark ? plan.colorDark : "#f9a825"
  );
  const [noOfImages, setNoOfImages] = useState(
    plan && plan.noOfImages ? plan.noOfImages : 0
  );
  const [discount, setDiscount] = useState(
    plan && plan.discount ? plan.discount : 0
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);
  console.log("image", image);
  console.log("typeof image", typeof image);
  const updatePlanDetails = async () => {
    console.log("image ssssss", image);
    const dataBody = {
      id: plan._id,
      image: image,
      title,
      price,
      noOfImages,
      description: content,
      discount,
      colorLight,
      colorDark,
    };
    console.log(dataBody);
    try {
      console.log("image", image);
      if (title && price && noOfImages) {
        dispatch(editPlan(dataBody))
          .then(unwrapResult)
          .then(() => {
            toast.success("Plan updated successfully");
            dispatch(setSelectedPlan({}));
            setPrice(0);
            setDiscount(0);
            setImage([]);
            setTitle("");
            setNoOfImages(0);
            setContent("");
            closeHandler();
          })
          .catch((err) => {
            console.log("err", err);
            toast.error(err || "Something went wrong");
          });
      }
    } catch (error) {
      console.log(error?.message);
      setLoading(false);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      {/* <TbEdit background={"blue.400"} onClick={onOpen} cursor={"pointer"} /> */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={open}
        onClose={closeHandler}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxW={"800px"}>
          <VStack alignItems={"flex-start"} gap={"1px"} p={"6"}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Edit Plan Information
            </Text>
            <Text fontSize={"10px"} opacity={"50%"}>
              {" "}
              plan management
            </Text>
          </VStack>
          <ModalCloseButton />
          {!loading ? (
            <ModalBody pb={6}>
              <form className="flex flex-col gap-2">
                <Grid gap={"2"}>
                  <GridItem>
                    <label className="text-xs opacity-60  ">Plan Logo*</label>
                    {typeof image === "string" ? (
                      <Box className="p-4 flex mt-2 gap-4 ">
                        <Image src={image} alt="" width={100} height={100} />
                        <MdDelete
                          color="red"
                          fontSize={"24"}
                          cursor={"pointer"}
                          onClick={() => setImage([])}
                        />
                      </Box>
                    ) : (
                      <InputGroup onClick={handleClick}>
                        <input
                          type={"file"}
                          hidden
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                          ref={inputRef}
                        />
                        <VStack
                          overflow="hidden"
                          gap={"1"}
                          align="center"
                          w="70%"
                          border={"1px"}
                          borderRadius={"2xl"}
                          padding={"6"}
                          borderStyle={"dashed"}
                        >
                          <BiImageAdd fontSize={42} />
                          <Text fontSize={"sm"}>
                            Browse and Upload your image here.
                          </Text>
                          <Text fontSize="9px" opacity={"initial"}>
                            Support JPG, JPEG, PNG
                          </Text>
                        </VStack>
                        <VStack w="30%">
                          {typeof image === "object" &&
                          !Array.isArray(image) ? (
                            <Image
                              src={URL.createObjectURL(image)}
                              alt="img"
                              width="100"
                              height="100"
                            />
                          ) : null}
                        </VStack>
                      </InputGroup>
                    )}
                  </GridItem>
                  <GridItem gap={"2"}>
                    <label className="text-xs opacity-60 ">Title*</label>
                    <input
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      placeholder="e.g. amazon"
                      className="p-4 border w-full rounded-xl"
                    />
                  </GridItem>

                  <GridItem gap={"2"}>
                    <label className="text-xs opacity-60 ">No of images*</label>
                    <input
                      type="number"
                      onChange={(e) => setNoOfImages(e.target.value)}
                      value={noOfImages}
                      placeholder="e.g. 399"
                      className="p-4 border w-full rounded-xl"
                    />
                  </GridItem>
                  <GridItem gap={"2"}>
                    <label className="text-xs opacity-60 ">Price*</label>
                    <input
                      type="number"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                      placeholder="e.g. $99"
                      className="p-4 border w-full rounded-xl"
                    />
                  </GridItem>
                  <GridItem gap={"2"}>
                    <label className="text-xs opacity-60 ">Discount ($)</label>
                    <input
                      type="text"
                      onChange={(e) => setDiscount(e.target.value)}
                      value={discount}
                      placeholder="e.g 99"
                      className="p-4 border w-full rounded-xl"
                    />
                  </GridItem>
                  <GridItem gap={"2"} display="flex" alignItems={"center"}>
                    <label className="text-xs opacity-60 ">
                      Light Color Code
                    </label>
                    <input
                      type="color"
                      onChange={(e) => setColorLight(e.target.value)}
                      value={colorLight}
                      placeholder="e.g #fffde7"
                      className="px-1 border w-[100px] h-[40px] "
                    />
                  </GridItem>
                  <GridItem gap={"2"} display="flex" alignItems={"center"}>
                    <label className="text-xs opacity-60 ">
                      Dark Color Code{" "}
                    </label>
                    <input
                      type="color"
                      onChange={(e) => setColorDark(e.target.value)}
                      value={colorDark}
                      placeholder="e.g 99"
                      className="px-1 border w-[100px] h-[40px] "
                    />
                  </GridItem>
                  <GridItem gap={"2"}>
                    <label className="text-xs opacity-60 ">Plan Details</label>
                    {/* //CK-EDITOR */}
                    {editorLoaded ? (
                      <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                          console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setContent(data);
                        }}
                      />
                    ) : null}
                  </GridItem>
                </Grid>
              </form>
            </ModalBody>
          ) : (
            <Box display={"flex"} justifyContent={"center"} width={"100%"}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Box>
          )}

          <HStack p={4} py={6} gap={4} justifyContent={"end"}>
            <Button
              bg={"blue.400"}
              onClick={updatePlanDetails}
              textColor={"white"}
            >
              Confirm
            </Button>
            <Button onClick={closeHandler}>Cancel</Button>
          </HStack>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditAffiliate;
