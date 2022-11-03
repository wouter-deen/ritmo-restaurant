import {Box, Button, Fade, Heading, Img, Text, useDisclosure} from "@chakra-ui/react";
import ItemModal from "@/components/Menu/ItemModal";

export default function MenuItem(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box bg="gray.100" rounded="2xl" p={4} mt={4} pos="relative">
      <Fade in={true}>
        <Box>
          <Heading fontSize="2xl" fontWeight={800}>{props.name}</Heading>
          <Text>{props.descr}</Text>
          <Button colorScheme="blackAlpha" bg="black" _hover={{backgroundColor: "#000"}} w="fit-content" mt={2} onClick={onOpen}>Customize</Button>
        </Box>
        <Img w={24} src={props.img} pos="absolute" bottom={props.bottomOffset} right={4} filter="drop-shadow(0 10px 8px rgba(0,0,0,.15))"/>
      </Fade>

      <ItemModal isOpen={isOpen} onClose={onClose} {...props}/>
    </Box>
  )
}