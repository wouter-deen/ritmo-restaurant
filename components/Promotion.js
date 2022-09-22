import {Box, Button, Flex, Heading, Img} from "@chakra-ui/react";

export default function Promotion() {
  return (
    <Flex bgGradient="linear(to-l, black, gray.800)" minH="150px" rounded="2xl" m={4} mt={24} p={4} pt={6}>
      <Img src="/gift.png" w="35%" h="35%" mr={4}/>
      <Box>
        <Heading color="white" fontSize="2xl" mb={2}>Special offer for you in September</Heading>
        <Button colorScheme="gray" w="fit-content" mt={2} size="sm" float="right" pos="static">View it now</Button>
      </Box>
    </Flex>
  )
}