import type { AppProps } from 'next/app'
import { AuthProvider } from '../lib/authContext'
import { RecoilRoot } from "recoil";
import { Header } from '../components/header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Header/>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  )
}

export default MyApp
