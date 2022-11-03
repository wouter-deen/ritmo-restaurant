import {Box, Button, Circle, Flex, IconButton, Img} from "@chakra-ui/react";
import {FaShoppingBasket} from "react-icons/fa";
import {useRouter} from "next/router";
import {useContext} from "react";
import basketContext from "@/lib/basket-context";

export default function NavBar() {
  const router = useRouter();
  const [basketItems] = useContext(basketContext)

  return (
    <Box pt={2} pos="relative">
      <Flex boxShadow="xl" px={2} py={2} mx={2} mb={8} rounded="xl" bg="white" pos="fixed" w="calc(100% - 1rem)"
            zIndex={1} justify="space-between"
      >
        <Flex align="center">
          <Img src="/ritmo-logo.svg" boxSize={10} mr={3} onClick={() => router.push("/")}/>
          <Button onClick={() => router.push("/")}>Menu</Button>
        </Flex>
        <IconButton
          aria-label='Options'
          icon={<FaShoppingBasket />}
          fontSize="22"
          mr={2}
          onClick={() => router.push("/basket")}
        />
        <Circle pos="absolute" size="18px" bg="red.300" color="white" fontWeight={600} fontSize="2xs" right={3} top={1}>
          {basketItems.length}
        </Circle>
      </Flex>
    </Box>
  )
}