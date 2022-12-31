import type { AppProps } from 'next/app'
import { AuthProvider } from '../lib/authContext'
import { RecoilRoot } from "recoil"
import { Header } from '../components/header'
import { ThemeProvider } from '@mui/material/styles'
import Theme from '../const/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <ThemeProvider theme={Theme}>
          <Header/>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </RecoilRoot>
  )
}

export default MyApp
