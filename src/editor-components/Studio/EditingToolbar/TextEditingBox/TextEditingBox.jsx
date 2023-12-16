  import { StageObject } from '@/editor-components/types/stage-object';
  import TextColorPicker from './TextColorPicker';
  import FontSizeInput from './FontSizeInput';
  import FontStyleSettings from './FontStyleSettings';
  import TextDecorationSettings from './TextDecorationSettings';
  import TextAlignment from './TextAlignment';
  import SpacingSettingsMenu from './SpacingSettingsMenu/SpacingSettingsMenu';
  import FontFamilyMenu from './FontFamilyMenu/FontFamilyMenu';
  import FontStyling from './FontStyling';
  import LetterSpacingSettings from './SpacingSettingsMenu/LetterSpacingSettings';
  import LineSpacingSettings from './SpacingSettingsMenu/LineSpacingSetting';
  import { Text, Textarea } from '@chakra-ui/react';
  import TextContent from './TextContent';


  const TextEditing = ({ selectedObject }) => {
    return (
      <>
        <Text fontSize={'sm'} w={'full'} textAlign={'center'} fontWeight={'black'}borderB >Text Customization</Text>
        <TextContent selectedObject={selectedObject} />
        <Text fontSize={'xs'} opacity={'60%'} fontWeight={'bold'} >Font Family</Text>
        <FontFamilyMenu id={selectedObject.id} fontFamily={selectedObject.data.fontFamily} />



        <FontStyling selectedObject={selectedObject} />

        <TextAlignment id={selectedObject.id} textAlign={selectedObject.data.align} />
        <TextDecorationSettings id={selectedObject.id} textDecoration={selectedObject.data.textDecoration} />

        {/* <SpacingSettingsMenu
          id={selectedObject.id}
          letterSpacing={selectedObject.data.letterSpacing}
          lineHeight={selectedObject.data.lineHeight}
        /> */}

        <LetterSpacingSettings id={selectedObject.id} letterSpacing={selectedObject?.data?.letterSpacing} />
        <LineSpacingSettings id={selectedObject?.id} lineHeight={selectedObject?.data?.lineHeight} />
      </>
    );
  };

  export default TextEditing;
