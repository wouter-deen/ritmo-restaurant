import {
  Box,
  Circle,
  Flex,
  Grid,
  GridItem, HStack,
  IconButton,
  Img,
  ListItem,
  Text,
  UnorderedList,
  VStack
} from "@chakra-ui/react";
import {FaPen, FaTrash} from "react-icons/fa";

export default function BasketItem({item}) {

  return (
    <ListItem my={4} px={4}>
      <HStack align="top" pos="relative">
        <Box rounded="lg" border="1px" borderColor="gray.200" align="center" boxSize="70px" pos="relative">
          <Img alt="illustration" src={item.img} boxSize="70px" objectFit="contain" p={1}/>
          <Circle pos="absolute" size="25px" bg="gray.50" border="1px" borderColor="gray.200" fontWeight="600"
                  fontSize="sm" right={-3} top={-3}>
            {item.quantity}
          </Circle>
        </Box>

        <Box pl={3}>
          <Flex align="center">
            <Text fontWeight={700} fontSize="lg">{item.name}</Text>
          </Flex>

          {item.options?.map((option, key) => (
            <Text key={key} color="gray.500" fontStyle="italic">{option} </Text>
          ))}

          <Flex align="flex-end">
            <Text fontWeight={500}>€ {item.price * item.quantity}</Text>
            <Text fontSize="xs" color="gray.400" ml={1}>(€{item.price} each)</Text>
          </Flex>
        </Box>

        <IconButton aria-label={"remove"} icon={<FaTrash/>} size="sm" pos="absolute" right={0} top={0}/>
      </HStack>
    </ListItem>
  )
}