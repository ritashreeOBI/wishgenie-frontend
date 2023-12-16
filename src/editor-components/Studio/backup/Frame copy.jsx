import React, { useEffect, useState } from 'react';
import Konva from 'konva';
import { Box } from '@chakra-ui/react';
import { Stage, Layer, Transformer, Image } from 'react-konva';
import { useAppSelector } from '@/editor-components/hooks/use-app-selector';
import TextObject from './objects/TextObject/TextObject';
import { KonvaEventObject } from 'konva/lib/Node';
import ImageObject from './objects/ImageObject/ImageObject';
import ShapeObject from './objects/ShapeObject/ShapeObject';
import useStageObject from '@/editor-components/hooks/use-stage-object';
import { StageObject, StageObjectType, StageTextObjectData } from '@/editor-components/types/stage-object';
import useTransformer from '@/editor-components/hooks/use-transformer';
import useObjectSelect from '@/editor-components/hooks/use-object-select';
import { loadGoogleFontsDefaultVariants } from '@/editor-components/utils/load-google-fonts-default-variants';
import useHotkeySetup from '@/editor-components/hooks/use-hotkey-setup';
import useStageResize from '@/editor-components/hooks/use-stage-resize';
import { useSelector } from 'react-redux';



const Frame = ({ stageRef, selected, dimension, ratio, zoom }) => {
  const { stageObjects, resetAll, replaceAll } = useStageObject();
  const { transformer: imageTransformer, onTransformerEnd: onImageTransformerEnd } = useTransformer({ stageRef });
  const { transformer: textTransformer, onTransformerEnd: onTextTransformerEnd } = useTransformer({ stageRef });
  const { transformer: multiTransformer, onTransformerEnd: onMultiTransformerEnd } = useTransformer({ stageRef });

  const transformers = { imageTransformer, textTransformer, multiTransformer };

  const { onObjectSelect, resetObjectSelect } = useObjectSelect(transformers);

  useHotkeySetup(transformers);

  const { width, height, scale, stage } = useAppSelector((state) => state.frame);
  const { boxWidth, boxHeight, handleZoom, handleDragMoveStage } = useStageResize({ stageRef });



  useEffect(() => {
    const fontsToLoad = stageObjects
      .filter((obj) => obj.data.type === StageObjectType.TEXT && obj.data.webFont)
      .map((obj) => obj.data.fontFamily);

    if (fontsToLoad.length) loadGoogleFontsDefaultVariants(fontsToLoad);

    resetObjectSelect();
  }, []);
  useEffect(() => {
    const content = stage.content;
    resetObjectSelect();
    if (JSON.stringify(content) === JSON.stringify(stageObjects)) {
      return;
    }
    if (content === null || content === undefined || content === '""' || !content.length) {
      resetAll();
      return;
    }

    replaceAll(content);
  }, [stage.id, stage.content]);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      resetObjectSelect();
    }
  };

  const sortStageObject = () => {
    return stageObjects.sort((obj1, obj2) => {
      if (obj1.data.z_index === obj2.data.z_index) {
        if (obj1.data.z_index < 0) {
          return obj2.data.updatedAt - obj1.data.updatedAt;
        }
        return obj1.data.updatedAt - obj2.data.updatedAt;
      }
      return obj1.data.z_index - obj2.data.z_index;
    });
  };

  const renderStageObject = (obj) => {
    const data = obj.data;
    switch (data.type) {
      case StageObjectType.IMAGE:
        return <ImageObject onSelect={onObjectSelect} obj={obj} />;
      case StageObjectType.TEXT:
        return <TextObject onSelect={onObjectSelect} shapeProps={obj} />;
      case StageObjectType.SHAPE:
        return <ShapeObject onSelect={onObjectSelect} obj={obj} />;
      default:
        return null;
    }
  };

  const { selectedType } = useSelector((state) => state.template)



  return (
    <Box
      overflow='hidden'
      position='absolute'
      sx={{
        top: !zoom ? selected?.print_area_top / ratio : 4,
        left: !zoom ? selected?.print_area_left / ratio : 4
      }}
      border={'2px'} borderStyle={'dashed'}
      borderColor={'green.400'}
      borderRadius={'md'}
      maxW={zoom ? selected?.print_area_width  : selected?.print_area_width / ratio}
      maxH={zoom ?selected?.print_area_height : selected?.print_area_height / ratio}
    >

      <Stage
        width={boxWidth}
        height={boxWidth}
       // width={ zoom ? selected?.print_area_width  : selected?.print_area_width / ratio}
       // height={zoom ? selected?.print_area_height  : selected?.print_area_height / ratio }
        style={{ background: 'transparent' }}
        // scaleX={scale / 2}
        // scaleY={scale / 2}
        draggable={true}
        ref={stageRef}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        onWheel={handleZoom}
        onDragMove={handleDragMoveStage}
      >

        <Layer>


          {sortStageObject().filter((stage) => stage.data.location === selectedType).map((obj) => (
            <React.Fragment key={obj.id}>{renderStageObject(obj)}</React.Fragment>
          ))}
          <Transformer ref={imageTransformer} onTransformEnd={onImageTransformerEnd} ignoreStroke={true} />
          <Transformer
            ref={textTransformer}
            onTransformEnd={onTextTransformerEnd}
            rotationSnaps={[0, 90, 180, 270]}
            rotateEnabled={true}
            enabledAnchors={['middle-left', 'middle-right']}
            boundBoxFunc={(_oldBox, newBox) => {
              newBox.width = Math.max(30, newBox.width);
              return newBox;
            }}
          />
          <Transformer
            ref={multiTransformer}
            onTransformEnd={onMultiTransformerEnd}
            enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
            boundBoxFunc={(_oldBox, newBox) => {
              newBox.width = Math.max(30, newBox.width);
              return newBox;
            }}
            ignoreStroke={true}
          />
        </Layer>

      </Stage>
    </Box>
  );
};

export default Frame;
