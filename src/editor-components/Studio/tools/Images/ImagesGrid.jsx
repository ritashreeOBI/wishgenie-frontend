import { Image as ChakraImage, SimpleGrid, Wrap } from '@chakra-ui/react';
import { Photo } from './Images';
import { DEFAULT_IMAGE_OBJECT } from '@/editor-components/consts/stage-object';
import useStageObject from '@/editor-components/hooks/use-stage-object';
import { useSelector } from 'react-redux';


const ImagesGrid = ({ images }) => {
  const { createOne, stageObjects } = useStageObject();

  const {selectedType} = useSelector((state) => state.template)

  const addImageToStage = (img) => {
    createOne({
      src: img.urls.regular,
      location:selectedType ,
      ...DEFAULT_IMAGE_OBJECT,
    });
  };

  return (
    // <SimpleGrid columns={2} gap={2} spacingY={4} >
    <Wrap spacing='2'>
      {images.map((img, i) => {
        return (
          
            <ChakraImage key={i} src={img.urls.regular} rounded="md" onClick={() => addImageToStage(img)} />
          
        )
      })}
    </Wrap>
    //</SimpleGrid>
  );
};

export default ImagesGrid;
