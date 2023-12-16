import { Button } from '@chakra-ui/react';
import useStageObject from '@/editor-components/hooks/use-stage-object';
import { StageObject } from '@/editor-components/types/stage-object';

type Props = {
  selectedObject: StageObject;
};

const ImageFlip = ({ selectedObject }: Props) => {
  const { id, data } = selectedObject;
  const { updateOne } = useStageObject();

  const flipVertically = () => {
    const offsetY = data.height / 2;
    const scaleY = -1 * data.scaleY;
    updateOne({ id, data: { offsetY, scaleY } });
  };

  const flipHorizontally = () => {
    const offsetX = data.width / 2;
    const scaleX = -1 * data.scaleX;
    updateOne({ id, data: { offsetX, scaleX } });
  };

  return (
    <>
      <Button onClick={() => flipVertically()} fontSize={14} fontWeight={'medium'}>Flip vertically</Button>
      <Button onClick={() => flipHorizontally()} fontSize={14} fontWeight={'medium'}>Flip horizontally</Button>
    </>
  );
};

export default ImageFlip;
