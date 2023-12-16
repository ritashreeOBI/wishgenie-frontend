import React from 'react';
import { Avatar, Box, Button, Grid, GridItem, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import { MdLocationPin, MdOutlineUploadFile, MdUploadFile } from 'react-icons/md';
import { RiExchangeDollarFill } from 'react-icons/ri';
import { FaRegImages } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';
import axios from 'axios';
import { Router } from 'react-router';
import { useSelector } from 'react-redux';
import { STRIPE_ONBOARD, STRIPE_PAYOUT_USER } from '@/api/Api';

const list =
  [
    {
      title: 'Posted Images'
    },
    {
      title: "Income History"
    },
    {
      title: "Pending Request"
    }
  ]

function ArtWallProfile() {
  const { loggedIn , user } = useSelector((state) => state.userAuthSlice);
  const onboardUserHandler = () => {
    axios({
      method: "POST",
      url: STRIPE_ONBOARD,
      data: {
        userId: 18,
      },
    })
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          window.open(res.data.url);
        }
      })
      .catch((err) => {
        alert(err.message);
        console.log("err", err);
      });
  };
  const payoutHandler = () => {
    axios({
      method: "POST",
      url: STRIPE_PAYOUT_USER,
      data: {
        artWallUserId: 24,
      },
    })
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          console.log("res.data", res.data);
          alert(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
        }
        console.log("err", err);
      });
  };

  const router = Router;
  return (
    <VStack w={'full'} py={32} bg={'whitesmoke'} >

      <Grid
        h='450px'
        w={'80%'}
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
        p={12}
        border={'1px'}
        borderColor={'blackAlpha.100'}
        rounded={'xl'}
        bg={'white'}

      >

        <GridItem rowSpan={2} colSpan={1}  >
          {
             loggedIn ?
             <Avatar src={user?.profile} size={'2xl'} />
             :
             <Avatar name={user?.userName} size={'2xl'}/>
          }
         
          {/* <Avatar src='https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250' width={'full'} h={'full'} /> */}
        </GridItem>
        <GridItem colSpan={2} padding={'4'} >
          <Text fontSize={'xl'} fontWeight={'bold'}>{user?.userName}</Text>

          <Text fontSize={'xs'} fontWeight={'bold'} opacity={'60%'} display={'flex'} alignItems={'center'} gap={2} >
            <MdLocationPin /> New York, USA
          </Text>
          <Text mt={2} fontSize={'xs'} >I’m not the kind of person who tries to be cool or trendy, I’m definitely an individual.</Text>
        </GridItem>
        <GridItem colSpan={2} padding={'4'}>
          <Button rounded={'full'} bg={'blue.400'} color={'white'}>Edit Profile</Button>
        </GridItem>
        <GridItem gap={4} gridGap={2}>
        <HStack gap={4}>
        <Button
          bg={"blue.500"}
          color={"white"}
          onClick={onboardUserHandler}
          className="py-6 my-2"
        >
          <MdUploadFile className="text-2xl mr-2" /> Onboard
        </Button>
        <Button
          bg={"blue.500"}
          color={"white"}
          onClick={payoutHandler}
          className="py-6 my-2"
        >
          <MdUploadFile className="text-2xl mr-2" /> Request Payout
        </Button>
        </HStack>
      </GridItem>
        <GridItem colSpan={4}  >
          <Grid
            h={'full'}
            w={'full'}
            templateColumns='repeat(3, 1fr)'
            gap={8}
            p={4}
            >
            <Box
              w={'full'}
              h={'full'}
            >
              <Grid
                h={'full'}
                w={'full'}
                templateColumns='repeat(5, .5fr)'
                gap={1}


              >
                <GridItem colSpan={1} mt={2}>
                  <RiExchangeDollarFill fontSize={'36px'} opacity={'40%'} />
                </GridItem>
                <GridItem colSpan={4} gap={1}>
                  <Text fontSize={'2xl'} fontWeight={'bold'}>$32</Text>
                  <Text fontSize={'xs'} opacity={'50%'} >Total Earning</Text>
                </GridItem>
              </Grid>

            </Box>

            <Box
              rounded={'xl'}
              w={'full'} 
              >
              <Grid
                h={'full'}
                w={'full'}
                templateColumns='repeat(5, .5fr)'
                gap={1}
              >
                <GridItem colSpan={1} mt={2}>
                  <FaRegImages fontSize={'36px'} opacity={'40%'} />
                </GridItem>
                <GridItem colSpan={4} gap={1}>
                  <Text fontSize={'2xl'} fontWeight={'bold'}>1.2K</Text>
                  <Text fontSize={'xs'} opacity={'50%'} >Total Uploaded Art</Text>
                </GridItem>
              </Grid>
            </Box>
            <Box
              rounded={'xl'}
              w={'full'}
            >
              <Grid
                h={'full'}
                w={'full'}
                templateColumns='repeat(5, .5fr)'
                gap={1}
              >
                <GridItem colSpan={1} mt={2}>
                  <BsClockHistory fontSize={'36px'} opacity={'40%'} />
                </GridItem>
                <GridItem colSpan={4} gap={1}>
                  <Text fontSize={'2xl'} fontWeight={'bold'}>3.2K</Text>
                  <Text fontSize={'xs'} opacity={'50%'} >Pending Approval</Text>
                </GridItem>
              </Grid>
            </Box>

          </Grid>
        </GridItem>
       
        <GridItem colSpan={4}  >
          <Grid>
        <Tabs
          isLazy
          lazyBehavior="keepMounted"
          orientation='horizontal'
          variant="line"
          colorScheme="blue"
          h="100%"
          id="toolbar"
          bgColor="white"
          display={'flex'}

        >
          <TabList display={'flex'}>
            {
              list?.map((nav) => {
                return (
                  <Tab>
                    {
                      nav?.title
                    }
                  </Tab>
                )
              })
            }

          </TabList>
          <TabPanels minW="350px" maxW="350px" bgColor="white" overflowY="auto">
            <TabPanel>
                <Text>Posted Images</Text>
            </TabPanel>
            <TabPanel>
            <Text>Incoming incoming</Text>
            </TabPanel>
            <TabPanel>
            <Text>Pending request</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
        </Grid>
        </GridItem>
      </Grid>
      <VStack>
        

      </VStack>
    </VStack>
  )
}

export default ArtWallProfile