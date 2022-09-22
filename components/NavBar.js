import {Box, Flex, IconButton, Img, Input, Text} from "@chakra-ui/react";
import {FaShoppingBasket, FaUser} from "react-icons/fa";

export default function NavBar() {
  return (
    <Box pt={2}>
      <Flex boxShadow="xl" px={2} py={2} mx={2} mb={8} rounded="xl" bg="white" pos="fixed" w="calc(100% - 1rem)" zIndex={1}>
        <Img src="/ritmo-logo.svg" boxSize={10} mr={3}/>
        <Input placeholder="Search..." mr={2}/>
        <IconButton icon={<FaShoppingBasket/>} fontSize="22" mr={2}/>
        <IconButton icon={<FaUser/>} fontSize="22"/>
      </Flex>
    </Box>
  )
}