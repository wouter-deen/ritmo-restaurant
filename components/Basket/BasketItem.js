import {Box, Flex, IconButton, Img, ListItem, Text, UnorderedList} from "@chakra-ui/react";
import {FaPen} from "react-icons/fa";

export default function BasketItem({item}) {

  return (
    <ListItem my={2} px={4}>
      <Flex justify="space-between">
        <Flex rounded="md" border="1px solid" borderColor="gray.200" align="center" h="75px" w="75px">
          <Img alt="illustration" src={item.img} h="75px" w="75px" objectFit="contain"/>
        </Flex>
        <Box>
          <Flex align="center">
            <Text fontWeight={700} mr={1}>{item.name}</Text>
            <Box bg="black" rounded="md" h="fit-content" px={1} fontWeight="bold" color="white" fontSize="sm">
              {item.quantity}×
            </Box>
          </Flex>
          <UnorderedList>
            {item.options?.map((option, key) => (
              <ListItem key={key}>{option}</ListItem>
            ))}
          </UnorderedList>

          <Box bg="gray.100" rounded="md" w="fit-content" textAlign="right" mt={1}>
            <Text px={1}>€ {item.price * item.quantity} ({item.quantity} × {item.price})</Text>
          </Box>
        </Box>
        <IconButton aria-label={"remove"} icon={<FaPen/>} size="sm"/>
      </Flex>
    </ListItem>
  )
}