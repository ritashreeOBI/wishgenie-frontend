import { Button, HStack, Text, Tooltip, VStack } from '@chakra-ui/react';
import useStageObject from '@/editor-components/hooks/use-stage-object';
import { StageTextData } from '@/editor-components/types/stage-object';


const TextDecorationSettings = ({ id, textDecoration }) => {
  const { updateOne } = useStageObject();

  const isUnderlineActive = textDecoration?.includes('underline');
  const isLineThroughActive = textDecoration?.includes('line-through');

  const handleUnderlineClick = () => {
    updateOne({ id, data: { textDecoration: toggleUnderline(textDecoration) } });
  };

  const handleLineThroughClick = () => {
    updateOne({ id, data: { textDecoration: toggleLineThrough(textDecoration) } });
  };

  const toggleUnderline = (textDecoration) => {
    switch (textDecoration) {
      case '':
        return 'underline';
      case 'underline':
        return '';
      case 'line-through':
        return 'underline line-through';
      case 'underline line-through':
        return 'line-through';
      default:
        break;
    }
  };

  const toggleLineThrough = (textDecoration) => {
    switch (textDecoration) {
      case '':
        return 'line-through';
      case 'underline':
        return 'underline line-through';
      case 'line-through':
        return '';
      case 'underline line-through':
        return 'underline';
      default:
        break;
    }
  };

  return (
    <VStack alignItems={'flex-start'}>
       <Text fontSize={'xs'} opacity={'60%'} fontWeight={'bold'}  > Text Decoration</Text>
      <HStack>
      <Tooltip hasArrow label="Underline" placement="bottom" openDelay={500}>
        <Button isActive={isUnderlineActive} textDecoration="underline" fontSize="xl" onClick={handleUnderlineClick}>
          U
        </Button>
      </Tooltip>
      <Tooltip hasArrow label="Line-through" placement="bottom" openDelay={500}>
        <Button
          isActive={isLineThroughActive}
          textDecoration="line-through"
          fontSize="xl"
          onClick={handleLineThroughClick}
        >
          S
        </Button>
      </Tooltip>
      </HStack>
    </VStack>
  );
};

export default TextDecorationSettings;
