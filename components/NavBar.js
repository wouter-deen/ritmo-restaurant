import {Box, Flex, IconButton, Img, Input, Text} from "@chakra-ui/react";
import {FaShoppingBasket} from "react-icons/fa";
import {useRouter} from "next/router";

export default function NavBar() {
  const router = useRouter();

  const ItemPrice = ({price, quantity}) => (
    <Box bg="gray.100" rounded="md" w="fit-content" textAlign="right" mt={1}>
      <Text px={1}>€ {price * quantity} ({quantity} × {price})</Text>
    </Box>
  )

  return (
    <Box pt={2}>
      <Flex boxShadow="xl" px={2} py={2} mx={2} mb={8} rounded="xl" bg="white" pos="fixed" w="calc(100% - 1rem)" zIndex={1}>
        <Img src="/ritmo-logo.svg" boxSize={10} mr={3} onClick={() => router.push("/")}/>
        <Input placeholder="Search..." mr={2}/>
        <IconButton
          aria-label='Options'
          icon={<FaShoppingBasket />}
          fontSize="22"
          mr={2}
          onClick={() => router.push("/basket")}
        />
      </Flex>
    </Box>
  )
}