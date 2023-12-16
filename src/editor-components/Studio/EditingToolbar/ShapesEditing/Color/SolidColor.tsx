import { useState, useEffect } from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import useStageObject from '@/editor-components/hooks/use-stage-object';
import { getRGBAString } from '@/editor-components/utils/get-rgba-string';
import { StageObjectData } from '@/editor-components/types/stage-object';
import { ShapeType } from '@/editor-components/types/shape-type';

type IProps = {
  shapeId: string;
  selectedObject: StageObjectData;
};

const SolidColor = ({ shapeId, selectedObject }: IProps) => {
  const { updateOne } = useStageObject();

  const [color, setColor] = useState(selectedObject.fill);

  useEffect(() => {
    setColor(selectedObject.fill);
  }, [shapeId]);

  const handleSolidColorChange = (c: ColorResult) => {
    const rgbaC = getRGBAString(c.rgb);
    setColor(rgbaC);

    let stroke = selectedObject.stroke;
    if (selectedObject.shapeType === ShapeType.ARROW) {
      stroke = rgbaC;
    }

    updateOne({
      id: shapeId,
      data: { fill: rgbaC, fillPriority: 'color', stroke },
    });
  };

  return <SketchPicker color={color} onChangeComplete={handleSolidColorChange} style={{border:'none'}} />;
};

export default SolidColor;
