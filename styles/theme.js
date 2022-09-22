import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Inter, sans-serif',
  },
  colors: {

  },
}

const theme = extendTheme({ config })

export default theme