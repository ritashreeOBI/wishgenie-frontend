import { HStack, Icon, IconButton, Text, Tooltip, VStack } from '@chakra-ui/react';
import { HiOutlineMenu, HiOutlineMenuAlt1, HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from 'react-icons/hi';
import useStageObject from '@/editor-components/hooks/use-stage-object';
import { StageTextData } from '@/editor-components/types/stage-object';



const TextAlignment = ({ id, textAlign }) => {
  const { updateOne } = useStageObject();

  const handleAlignmentClick = (textAlign) => {
    updateOne({ id, data: { align: textAlign } });
  };

  const toggleAlignment = (textAlign) => {
    switch (textAlign) {
      case 'left':
        return 'center';
      case 'center':
        return 'right';
      case 'right':
        return 'justify';
      case 'justify':
        return 'left';
      default:
        break;
    }
  };

  const getAlignmentIcon = (textAlign) => {
    switch (textAlign) {
      case 'center':
        return HiOutlineMenuAlt1;
      case 'left':
        return HiOutlineMenuAlt2;
      case 'right':
        return HiOutlineMenuAlt3;
      case 'justify':
        return HiOutlineMenu;
      default:
        break;
    }
  };

  return (
    <VStack alignItems={'flex-start'}>
  <Text fontSize={'xs'} opacity={'60%'} fontWeight={'bold'}  >Text Aligment</Text>
  <HStack>
    <Tooltip hasArrow label="Center Alignment" placement="bottom" openDelay={500}>
      <IconButton
       aria-label="Alignment"
       icon={<Icon as={HiOutlineMenuAlt1} boxSize={6}/>}
       onClick={() => handleAlignmentClick('center')}
      />
    </Tooltip>
    <Tooltip hasArrow label="Left Alignment" placement="bottom" openDelay={500}>
      <IconButton
       aria-label="Alignment"
       icon={<Icon as={HiOutlineMenuAlt2} boxSize={6}/>}
       onClick={() => handleAlignmentClick('left')}
      />
    </Tooltip>
    <Tooltip hasArrow label="Left Alignment" placement="bottom" openDelay={500}>
      <IconButton
       aria-label="Right Alignment"
       icon={<Icon as={HiOutlineMenuAlt3} boxSize={6}/>}
       onClick={() => handleAlignmentClick('right')}
      />
    </Tooltip>
    <Tooltip hasArrow label="Justify Alignment" placement="bottom" openDelay={500}>
      <IconButton
       aria-label="Justify Alignment"
       icon={<Icon as={HiOutlineMenu} boxSize={6}/>}
       onClick={() => handleAlignmentClick('justify')}
      />
    </Tooltip>
    </HStack>
    </VStack>
  );
};

export default TextAlignment;
