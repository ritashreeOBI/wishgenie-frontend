import Layout from '@/components/Layout'
import { StoreWrapper } from '@/redux/store';
import '@/styles/globals.css'
import 'regenerator-runtime/runtime'
function App({ Component, pageProps }) {
  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default StoreWrapper.withRedux(App)