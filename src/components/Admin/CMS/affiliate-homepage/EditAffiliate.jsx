import React, { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FcApproval } from "react-icons/fc";
import { BiImageAdd } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import axios from "axios";
import { GET_AFFILIATE, UPDATE_AFFILIATE } from "@/api/AdminApi";
import Image from "next/image";
import { IoAmericanFootball } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

function EditAffiliate({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const inputRef = useRef(null);
  const [images, setImages] = useState([]);
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [list, setList] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  const getAffiliateList = async () => {
    try {
      const { data } = await axios.get(`${GET_AFFILIATE}/${id}`);
      setList(data);
      setContent(data[0]?.description);
      setTitle(data[0]?.title);
      setLink(data[0]?.link);
      setImages(data[0]?.image);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const updateAffiliate = async () => {
    const dataBody = {
      image: images,
      title,
      description: content,
      link,
    };
    console.log(dataBody);
    try {
      if (title && images && link && content) {
        setLoading(true);
        const { data } = await axios.put(
          `${UPDATE_AFFILIATE}/${id}`,
          dataBody,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data);
        setLoading(false);
        onClose();
      }
    } catch (error) {
      console.log(error?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAffiliateList();
  }, []);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <TbEdit background={"blue.400"} onClick={onOpen} />
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxW={"800px"}>
          <VStack alignItems={"flex-start"} gap={"1px"} p={"6"}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Aprrove Image Request
            </Text>
            <Text fontSize={"10px"} opacity={"50%"}>
              Resulted image required approval for further process
            </Text>
          </VStack>
          <ModalCloseButton />
          {!loading ? (
            <ModalBody pb={6}>
              <form className="flex flex-col gap-2">
                <Grid gap={"2"}>
                  <GridItem>
                    <label className="text-xs opacity-60  ">
                      Affiliate Logo*
                    </label>
                    {images === "" ? (
                      <InputGroup onClick={handleClick}>
                        <input
                          type={"file"}
                          hidden
                          accept="image/*"
                          onChange={(e) => setImages(e.target.files[0])}
                          ref={inputRef}
                        />
                        <VStack
                          overflow="hidden"
                          gap={"1"}
                          align="center"
                          w="100%"
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
                      </InputGroup>
                    ) : (
                      <Box className="p-4 flex mt-2 gap-4 ">
                        <Image src={images} alt="" width={100} height={100} />
                        <MdDelete
                          color="red"
                          fontSize={"24"}
                          cursor={"pointer"}
                          onClick={() => setImages([])}
                        />
                      </Box>
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
                    <label className="text-xs opacity-60 ">
                      Affiliate URL*
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setLink(e.target.value)}
                      value={link}
                      placeholder="e.g. https://www.amazon.com"
                      className="p-4 border w-full rounded-xl"
                    />
                  </GridItem>
                  <GridItem gap={"2"}>
                    <label className="text-xs opacity-60 ">
                      Affiliate URL*
                    </label>
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
              onClick={updateAffiliate}
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

export default EditAffiliate;
