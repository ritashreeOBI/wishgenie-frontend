import { StageObject } from '@/editor-components/types/stage-object';
import TextColorPicker from './TextColorPicker';
import FontSizeInput from './FontSizeInput';
import FontStyleSettings from './FontStyleSettings';
import TextDecorationSettings from './TextDecorationSettings';
import TextAlignment from './TextAlignment';
import SpacingSettingsMenu from './SpacingSettingsMenu/SpacingSettingsMenu';
import FontFamilyMenu from './FontFamilyMenu/FontFamilyMenu';


const TextEditing = ({ selectedObject }) => {
  return (
    <>
      <div className='w-full'>
      <FontFamilyMenu id={selectedObject.id} fontFamily={selectedObject.data.fontFamily}/>
      </div>
      
      <FontSizeInput id={selectedObject.id} fontSize={selectedObject.data.fontSize} />
      <TextColorPicker id={selectedObject.id} selectedObject={selectedObject.data} />
      <FontStyleSettings
        id={selectedObject.id}
        fontVariants={selectedObject.data.fontVariants}
        fontStyle={selectedObject.data.fontStyle}
        webFont={selectedObject.data.webFont}
      />
      <TextDecorationSettings id={selectedObject.id} textDecoration={selectedObject.data.textDecoration} />
      <TextAlignment id={selectedObject.id} textAlign={selectedObject.data.align} />
      <SpacingSettingsMenu
        id={selectedObject.id}
        letterSpacing={selectedObject.data.letterSpacing}
        lineHeight={selectedObject.data.lineHeight}
      />
    </>
  );
};

export default TextEditing;
