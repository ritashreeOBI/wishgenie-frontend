import { Image as ChakraImage, SimpleGrid, Wrap } from '@chakra-ui/react';
import { Photo } from './AiImages';
import { DEFAULT_IMAGE_OBJECT } from '@/editor-components/consts/stage-object';
import useStageObject from '@/editor-components/hooks/use-stage-object';

type Props = {
  images: Photo[];
};

const ImagesGrid = ({ images }: Props) => {
  const { createOne } = useStageObject();

  const addImageToStage = (img: Photo) => {
    createOne({
      src: img.urls.regular,
      ...DEFAULT_IMAGE_OBJECT,
    });
  };

  return (
    // <SimpleGrid columns={2} gap={2} spacingY={4} >
    <Wrap spacing='2'>
      {images.map((img, i) => (
        <ChakraImage key={i} src={img.urls.regular} rounded="md" onClick={() => addImageToStage(img)} />
      ))}
      </Wrap>
    //</SimpleGrid>
  );
};

export default ImagesGrid;
