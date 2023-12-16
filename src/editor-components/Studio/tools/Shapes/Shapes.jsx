import { Box, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import useStageObject from '@/editor-components/hooks/use-stage-object';
import { DEFAULT_SHAPE_OBJECT } from '@/editor-components/consts/stage-object';
import { shapesItems, shapeItemType } from './shapes_items';
import { useSelector } from 'react-redux';

const Shapes = () => {
  const { createOne } = useStageObject();
  const {selectedType} = useSelector((state) => state.template)
  const addShapeToStage = (shapeItem) => {
    createOne({
      ...DEFAULT_SHAPE_OBJECT,
      ...shapeItem,
      location:selectedType ,
    });
  };

  return (
    <Stack gap={6}>
    <Text fontSize={'xl'} fontWeight={'medium'}>Available Shapes</Text>
    <SimpleGrid columns={3} spacing={2}>
      {shapesItems.map((shapeItem, index) => {
        console.log(shapeItem)
        return(
       <Box boxShadow={'rgba(0, 0, 0, 0.16) 0px 1px 4px;'} padding={4} borderRadius={'md'}>
        <Image
          key={index}
          src={shapeItem.src}
          alt={shapeItem.name}
          onClick={() => addShapeToStage(shapeItem)}
          cursor="pointer"
        />
        </Box>
      )})}

      
    </SimpleGrid>
    </Stack>
  );
};

export default Shapes;
