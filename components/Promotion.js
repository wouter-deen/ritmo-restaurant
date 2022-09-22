import {Box, Button, Flex, Heading, Img} from "@chakra-ui/react";

export default function Header() {
  return (
    <Flex bg="#919dfe" minH="150px" rounded="3xl" m={4} p={4} pt={6}>
      <Img src="/pizza-icon.png" w="35%" h="35%" mr={4}/>
      <Box>
        <Heading color="white" fontSize="2xl">Special offer for you in September</Heading>
        <Button colorScheme="blackAlpha" bg="black" w="fit-content" mt={2} size="sm" float="right">Add to Cart</Button>
      </Box>
    </Flex>
  )
}