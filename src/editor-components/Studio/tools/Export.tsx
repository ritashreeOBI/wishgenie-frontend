import React from 'react';
import Konva from 'konva';
import { Button } from '@chakra-ui/react';
import { useAppSelector } from '@/editor-components/hooks/use-app-selector';

type IProps = {
  stageRef: React.RefObject<Konva.Stage> | null;
};

const Export = ({ stageRef }: IProps) => {
  const { width, height } = useAppSelector((state) => state.frame);

  const downloadURI = (uri: string, name: string) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    link.click();
  };

  const handleExport = () => {
    if (stageRef?.current) {
      console.log(stageRef.current.scaleX() , stageRef.current.scaleY() )
      const dataURL = stageRef.current.toDataURL({
        x: 0,
        y: 0,
        width: 1038/5,
        height: 1383/5,
        pixelRatio: 2 / stageRef.current.attrs.scaleX ,
      });
      console.log(dataURL)
      downloadURI(dataURL, 'webster');
    }
  };




  return (
    <Button onClick={handleExport} w="100%">
      Export
    </Button>
  );
};

export default Export;
