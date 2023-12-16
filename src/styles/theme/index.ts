import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `"Inter", sans-serif`,
    body: `"Inter", sans-serif`,
  },
  semanticTokens: {
    colors: {
      primary: {
        default: 'blue.500',
      },
    },
  },
});

export default theme;
