import { HStack, Icon, IconButton, Spacer, Tooltip } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { HiOutlineRefresh, HiOutlineReply } from 'react-icons/hi';
import { EDITING_TOOLBAR_HEIGHT } from '@/editor-components/consts/components';
import { KeyType } from '@/editor-components/consts/keys';
import { useAppSelector } from '@/editor-components/hooks/use-app-selector';
import useHistory from '@/editor-components/hooks/use-history';
import useStageResize from '@/editor-components/hooks/use-stage-resize';
import { stageObjectSelector } from '@/store/slices/editor/stage-object-slice';
import { StageObjectType } from '@/editor-components/types/stage-object';
import ImageEditing from './ImageEditing/ImageEditing';
import ShapesEditing from './ShapesEditing/ShapesEditing';
import TextEditing from './TextEditing/TextEditing';
import CanvasContentSave from '../canvas-actions/CanvasContentSave';
import Konva from 'konva';



const EditingToolbar = ({ stageRef }) => {
  const stageObjects = useAppSelector(stageObjectSelector.selectAll);
  const { selected } = useAppSelector((state) => state.selected);
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { savePast, goBack, goForward } = useHistory();

  const { setStageSize } = useStageResize({});

  useHotkeys(KeyType.UNDO, (e) => {
    e.preventDefault();
    goBack();
  });

  useHotkeys(KeyType.REDO, (e) => {
    e.preventDefault();
    goForward();
  });

  useEffect(() => {
    savePast(stageObjects);
  }, [stageObjects]);

  const getSelectedObject = () => {
    if (selected.length === 1 && stageObjects) {
      return stageObjects.find((obj) => obj.id === selected[0]);
    }
    return null;
  };

  const selectedObject = getSelectedObject();

  const renderEditing = () => {
    switch (selectedObject?.data.type) {
      case StageObjectType.IMAGE:
        return <ImageEditing selectedObject={selectedObject} />;
      case StageObjectType.SHAPE:
        return <ShapesEditing selectedObject={selectedObject} />;
      // case StageObjectType.TEXT:
      //   return <TextEditing selectedObject={selectedObject} />;
      default:
        return null;
    }
  };

  return (
    <HStack  id="editing_toolbar" spacing={3} sx={{ px: 4 ,py:2 }} bg="transparent">
      <Tooltip hasArrow label="Undo Ctrl + Z" placement="bottom"  openDelay={500}>
        <IconButton bg={'white'} rounded={'full'} shadow={'md'} aria-label="Undo" icon={<Icon as={HiOutlineReply} boxSize={4}  />} onClick={() => goBack()} />
      </Tooltip>
      <Tooltip hasArrow label="Redo Ctrl + Y" placement="bottom" openDelay={500}>
        <IconButton
          aria-label="Redo"
          bg={'white'} rounded={'full'} shadow={'md'}
          icon={<Icon as={HiOutlineReply} transform="scaleX(-1)" boxSize={4} />}
          onClick={() => goForward()}
        />
      </Tooltip>
      <Tooltip hasArrow label="Reset zoom" placement="bottom" openDelay={500}>
        <IconButton
          aria-label="Reset zoom"
            bg={'white'} rounded={'full'} shadow={'md'}
          icon={<Icon as={HiOutlineRefresh} boxSize={4} />}
          onClick={() => setStageSize()}
        />
      </Tooltip>
      {renderEditing()}
     
        <>
          <Spacer />
          <CanvasContentSave  stageRef={stageRef}/>
        </>
    
    </HStack>
  );
};

export default EditingToolbar;
