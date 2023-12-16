import Layout from '@/components/Layout'
import { StoreWrapper } from '@/store/store';
import '@/styles/globals.css'
import theme from '@/styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import 'regenerator-runtime/runtime'
function App({ Component, pageProps }) {
  return (
    <div>
      <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </ChakraProvider>
    </div>
  )
}

export default StoreWrapper.withRedux(App)