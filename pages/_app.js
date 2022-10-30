import '../styles/globals.css'
import {ChakraProvider} from "@chakra-ui/react";
import theme from "@/styles/theme";

//import all fonts and variants
import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import "@fontsource/inter/800.css"

import "@fontsource/poppins/400.css"
import "@fontsource/poppins/400-italic.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/600-italic.css"
import "@fontsource/poppins/700.css"
import "@fontsource/poppins/700-italic.css"

import "@fontsource/reem-kufi/400.css"

import "@fontsource/merriweather/400.css"
import "@fontsource/merriweather/400-italic.css"
import "@fontsource/merriweather/700.css"
import "@fontsource/merriweather/900.css"
import {BasketProvider} from "@/lib/basket-context";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <BasketProvider>
        <Component {...pageProps} />
      </BasketProvider>
    </ChakraProvider>
  )
}

export default MyApp
