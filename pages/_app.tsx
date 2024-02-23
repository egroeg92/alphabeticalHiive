import "@/styles/globals.css";
import type { AppProps } from "next/app";
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { fonts } from '../lib/fonts'
import theme from '../lib/theme'

export default function App({ Component, pageProps }: AppProps) {

  return(
  <>
    <style jsx global>
      {`
        :root {
          --font-rubik: ${fonts.rubik.style.fontFamily};
        }
      `}
    </style>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </>
  )
}


