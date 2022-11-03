import {Box, Button, Flex, Heading, Img, useDisclosure} from "@chakra-ui/react";
import PromotionModal from "@/components/Menu/PromotionModal";

export default function Promotion() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex bgGradient="linear(to-l, black, gray.800)" minH="150px" rounded="2xl" m={4} mt={24} p={4} pt={6}>
      <Img src="/gift.png" w="35%" h="35%" mr={4}/>
      <Box>
        <Heading color="white" fontSize="2xl" mb={2}>Special offer for you in November</Heading>
        <Button colorScheme="gray" w="fit-content" mt={2} size="sm" float="right" pos="static" onClick={onOpen}>
          View it now
        </Button>
      </Box>

      <PromotionModal isOpen={isOpen} onClose={onClose}/>
    </Flex>
  )
}