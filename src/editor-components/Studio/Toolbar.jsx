import { Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import Konva from 'konva';
import { TOOLBAR_TABS } from '@/editor-components/consts/components';
import Export from './tools/Export';
import ImageUpload from './tools/ImageUpload/ImageUpload';
import Images from './tools/Images/Images';
import Resize from './tools/Resize';
import Shapes from './tools/Shapes/Shapes';
import Texts from './tools/Text/Texts';
import HotkeysList from './tools/Hotkeys/Hotkeys';
import AiImages from './tools/AiGenerated/AiImages';
import Detail from './tools/Detail/Detail';
import Link from 'next/link';
import Image from 'next/image';
import Layers from './tools/Layers';



const Toolbar = ({ stageRef }) => {
  return (
    <VStack h="100%" borderRight="2px" shadow='xl' borderLeft="0" borderColor="gray.200" >
     
      <Tabs
        isLazy
        lazyBehavior="keepMounted"
        orientation="vertical"
        variant="line"
        colorScheme="blue"
        h="100%"
        id="toolbar"
        bgColor="white"
        
      >
        <TabList gap={3} p={2}  borderRight={'1px'} borderColor='gray.200' bgColor={'white'}   >
          {TOOLBAR_TABS.map((t, i) => (
            <Tab
              px="1"
              py='2px'
              key={i}
              h={'20'}
              
              border={'1px'}
              bgColor="white"
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              fontSize="10px"
              fontWeight="400"
              gap={1}
              borderColor='gray.300'
              borderRadius='md'
         
              _selected={{ bgColor: 'gray.100', color: 'blue.500', }}
              _hover={{ color: 'sky.500', bgColor:'gray.100'  }}
            >
              <Icon as={t.icon} boxSize={6} fontWeight={''}   />
              {t.title}
            </Tab>
          ))}
        </TabList>
     

        <TabPanels minW="350px" maxW="350px"  bgColor="white" overflowY="auto">
          <TabPanel>
            <Detail/>
          </TabPanel>
          <TabPanel>
           <Layers/>
          </TabPanel>
          <TabPanel p="0" h="100%" overflow="hidden">
           <AiImages/> 
          </TabPanel>
           {/* <TabPanel>
            <Export stageRef={stageRef} />
          </TabPanel>  */}
           <TabPanel p="0" h="100%" overflow="hidden">
            <Texts />
          </TabPanel>
          <TabPanel p="0" h="100%" overflow="hidden">
            <Images /> 
          </TabPanel>
          <TabPanel>
            <ImageUpload />
          </TabPanel>
         
          <TabPanel>
            <Shapes />
          </TabPanel>
          {/* <TabPanel>
            <HotkeysList />
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default Toolbar;
