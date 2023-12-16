import { InView } from 'react-intersection-observer';
import { GoogleFont } from '@/editor-components/types/google-font-type';
import { loadGoogleFontsDefaultVariants } from '@/editor-components/utils/load-google-fonts-default-variants';
import { css } from '@emotion/react';
import { useToken } from '@chakra-ui/react';

type Props = {
  font: GoogleFont;
  onClick: () => void;
};

const FontFamilyMenuItem = ({ font, onClick }: Props) => {
  const [gray200] = useToken('colors', ['gray.200']);
  console.log(font)
  return (
    <InView
      as="option"
      //rootMargin="50px"
      style={{
        fontFamily:font.family,
        padding:'10px',
       // marginLeft:'10px',
        borderBottom:'1px solid #F3EEEA'
      }}
      value={font.family}
      css={css`
        font-family: ${font.family};
        padding: 5px 10px;
        transition: all 0.1s linear;
        &:hover {
          cursor: pointer;
          background-color: ${gray200};
        }
      `}
      triggerOnce={true}
      onClick={onClick}
      onChange={(inView) => {
        if (inView) {
          loadGoogleFontsDefaultVariants([font.family]);
        }
      }}
    >
      {font.family}
    </InView>
  );
};

export default FontFamilyMenuItem;
