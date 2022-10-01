import { extendTheme } from "@chakra-ui/react"
import { StepsStyleConfig } from 'chakra-ui-steps';

const config = {
  components: {
    StepsStyleConfig,
  },
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Inter, sans-serif',
  },

}

const theme = extendTheme({ config })

export default theme