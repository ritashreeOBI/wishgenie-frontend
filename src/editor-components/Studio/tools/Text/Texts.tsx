import { Box, Button, SimpleGrid, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { DEFAULT_TEXT_OBJECT } from '@/editor-components/consts/stage-object';
import useStageObject from '@/editor-components/hooks/use-stage-object';
import { StageTextData } from '@/editor-components/types/stage-object';
import SearchForm, { TFilter } from './SearchForm';
import { loadGoogleFontsDefaultVariants } from '@/editor-components/utils/load-google-fonts-default-variants';
import useGetFontListQuery from '@/editor-components/hooks/use-get-font-list-query';
import { GoogleFont } from '@/editor-components/types/google-font-type';
import { useSelector } from 'react-redux';
//import TextEditing from '../../EditingToolbar/TextEditing/TextEditing';
import { useAppSelector } from '@/editor-components/hooks/use-app-selector';
import TextEditing from '../../EditingToolbar/TextEditingBox/TextEditingBox';

const defaultTextStylesButtons: Partial<StageTextData>[] = [
  {
    text: 'Add a heading',
    fontSize: 68,
    width: 600,
    fontStyle: 'bold',
  },
  {
    text: 'Add a subheading',
    fontSize: 44,
    width: 400,
    fontStyle: 'bold',
  },
  {
    text: 'Add a little bit of body text',
    fontSize: 30,
    width: 400,
    fontStyle: 'normal',
  },
];

const Texts = () => {
  const { createOne , stageObjects} = useStageObject();
  const [query, setQuery] = useState<string>(' ');
  const [selectedFonts, setSelectedFonts] = useState<GoogleFont[]>([]);
  const { fontList, isLoaded } = useGetFontListQuery();
  const { selected } = useAppSelector((state) => state.selected);
  useEffect(() => {
    if (!isLoaded) return;

    const fonts = fontList.filter((font) => font.family.toLowerCase().startsWith(query.toLowerCase())).slice(0, 15);
    const fontFamilies = fonts.map((font: any) => font.family);

    if (fonts.length) {
      loadGoogleFontsDefaultVariants(fontFamilies);
      setSelectedFonts(fonts);
    }
  }, [query, isLoaded]);

  const {selectedType} = useSelector((state:any) => state.template)

  const getSelectedObject = () => {
    if (selected.length === 1 && stageObjects) {
      return stageObjects.find((obj) => obj.id === selected[0]);
    }
    return null;
  };

  const selectedObject = getSelectedObject();

  const addTextToStage = (options: Partial<StageTextData> = {}) => {
    createOne({
      ...DEFAULT_TEXT_OBJECT,
      ...options,
      location:selectedType
    });
  };

  const onSearchSubmit = (data: TFilter) => {
    setQuery(data.query);
  };

  const onSearchReset = () => {
    setQuery(' ');
  };

  return (
    <>
      {/* <VStack bgColor="white" w="100%" spacing={3} p={4}>
        <SearchForm placeholder="Search fonts" onSubmit={onSearchSubmit} onReset={onSearchReset} />
      </VStack> */}
      <VStack spacing={3} sx={{ p: 4, position: 'relative', h: '100%', overflowY: 'auto' }}>
        {selectedFonts.length && query.trim() ? (
          <SimpleGrid columns={2} gap={1} sx={{ mt: '0' }}>
            {selectedFonts.map((font: any , idx:any) => (
             <Box borderBottom={'1px'}  borderColor={'gray.200'} p={1}>
              <Button
                key={font.family}
                fontFamily={font.family}
                 w="100%"
                 h={20}
                 bg={'white'}
                 borderRadius={'0'}
                 borderLeft={ (idx%2) ?  '1px': ''}
                 borderColor={'gray.100'}
                fontSize={16}
                fontWeight={300}
                onClick={() =>
                  addTextToStage({
                    text: font.family,
                    fontFamily: font.family,
                    fontVariants: font.variants, // set variants that available to load from Google Fonts
                    webFont: true,
                    fontSize: 50,
                    fontStyle: 'normal',
                  })
                }
              >
                {font.family}
              </Button>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <VStack w="100%" spacing={3} >
            <Button w="100%" p={'8'} fontSize={'xl'} colorScheme="blue" onClick={() => addTextToStage()}>
             + Add a text box
            </Button>
            {/* <Text w="100%" pt={2} textAlign="left" fontSize="14px" fontWeight="bold">
              Default text styles
            </Text> */}
            {/* {defaultTextStylesButtons.map((data, i) => (
              <Button key={i} w="100%" onClick={() => addTextToStage(data)}>
                {data.text}
              </Button>
            ))}
            {!selectedFonts.length && query.trim() && (
              <Text pt="20px" fontSize="14px" textAlign="center">
                Sorry, we couldn&apos;t find any text for {`"${query.trim()}"`}. Try searching something related.
              </Text>
            )} */}

{
   selectedObject?.id && <VStack spacing={4}  w={'full'} alignItems={'flex-start'}> <TextEditing selectedObject={selectedObject}/></VStack> 
}
            


          </VStack>
        )}
      </VStack>
    </>
  );
};

export default Texts;
