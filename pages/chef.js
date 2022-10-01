import {
  Box,
  Button,
  Flex,
  ListItem,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  UnorderedList,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import {FaCheck, FaPlay, FaTrash} from "react-icons/fa";
import AcceptModal from "@/components/Chef/AcceptModal";
import {useState} from "react";

export default function ChefPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [orderID, setOrderID] = useState();

  const handleAccept = (id) => {
    setOrderID(id);
    onOpen();
  }

  return (
    <Box fontSize="2xl">
      <Table>
        <Thead bg="black">
          <Tr>
            <Th fontSize="md" color="#fff">
              Order ID
            </Th>
            <Th fontSize="md" color="#fff">
              Items
            </Th>
            <Th fontSize="md" color="#fff">
              Options
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr bg="red.200">
            <Td>8943518</Td>
            <Td>
              <UnorderedList>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>3x</Box>
                    Neapolitan Pizza | Margherita, Tomato sauce
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>1x</Box>
                    Granny's Pancakes
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>2x</Box>
                    Farmer's Fries | Mayonnaise sauce
                  </Flex>
                </ListItem>
              </UnorderedList>
            </Td>
            <Td>
              <Button colorScheme="blue" leftIcon={<FaCheck/>} size="lg">Complete</Button>
            </Td>
          </Tr>
          <Tr bg="red.200">
            <Td>8641351</Td>
            <Td>
              <UnorderedList>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>3x</Box>
                    Neapolitan Pizza | Margherita, Tomato sauce
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>1x</Box>
                    Granny's Pancakes
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>2x</Box>
                    Farmer's Fries | Mayonnaise sauce
                  </Flex>
                </ListItem>
              </UnorderedList>
            </Td>
            <Td>
              <Button colorScheme="blue" leftIcon={<FaCheck/>} size="lg">Complete</Button>
            </Td>
          </Tr>
          <Tr bg="red.200">
            <Td>6859518</Td>
            <Td>
              <UnorderedList>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>3x</Box>
                    Neapolitan Pizza | Margherita, Tomato sauce
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>1x</Box>
                    Granny's Pancakes
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>2x</Box>
                    Farmer's Fries | Mayonnaise sauce
                  </Flex>
                </ListItem>
              </UnorderedList>
            </Td>
            <Td>
              <Button colorScheme="blue" leftIcon={<FaCheck/>} size="lg">Complete</Button>
            </Td>
          </Tr>
          <Tr bg="green.200">
            <Td>8954651</Td>
            <Td>
              <UnorderedList>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>3x</Box>
                    Neapolitan Pizza | Margherita, Tomato sauce
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>1x</Box>
                    Granny's Pancakes
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>2x</Box>
                    Farmer's Fries | Mayonnaise sauce
                  </Flex>
                </ListItem>
              </UnorderedList>
            </Td>
            <Td>
              <VStack spacing={2}>
                <Button colorScheme="green" leftIcon={<FaPlay/>} size="lg" onClick={() => handleAccept(8954651)}>Accept</Button>
                <Button colorScheme="red" leftIcon={<FaTrash/>} size="lg">Decline</Button>
              </VStack>
            </Td>
          </Tr>
          <Tr>
            <Td>3565884</Td>
            <Td>
              <UnorderedList>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>3x</Box>
                    Neapolitan Pizza | Margherita, Tomato sauce
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>1x</Box>
                    Granny's Pancakes
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>2x</Box>
                    Farmer's Fries | Mayonnaise sauce
                  </Flex>
                </ListItem>
              </UnorderedList>
            </Td>
            <Td>
              <VStack spacing={2}>
                <Button colorScheme="green" leftIcon={<FaPlay/>} size="lg">Accept</Button>
                <Button colorScheme="red" leftIcon={<FaTrash/>} size="lg">Decline</Button>
              </VStack>
            </Td>
          </Tr>
          <Tr>
            <Td>9465327</Td>
            <Td>
              <UnorderedList>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>3x</Box>
                    Neapolitan Pizza | Margherita, Tomato sauce
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>1x</Box>
                    Granny's Pancakes
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>2x</Box>
                    Farmer's Fries | Mayonnaise sauce
                  </Flex>
                </ListItem>
              </UnorderedList>
            </Td>
            <Td>
              <VStack spacing={2}>
                <Button colorScheme="green" leftIcon={<FaPlay/>} size="lg">Accept</Button>
                <Button colorScheme="red" leftIcon={<FaTrash/>} size="lg">Decline</Button>
              </VStack>
            </Td>
          </Tr>
          <Tr>
            <Td>6491875</Td>
            <Td>
              <UnorderedList>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>3x</Box>
                    Neapolitan Pizza | Margherita, Tomato sauce
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>1x</Box>
                    Granny's Pancakes
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>2x</Box>
                    Farmer's Fries | Mayonnaise sauce
                  </Flex>
                </ListItem>
              </UnorderedList>
            </Td>
            <Td>
              <VStack spacing={2}>
                <Button colorScheme="green" leftIcon={<FaPlay/>} size="lg">Accept</Button>
                <Button colorScheme="red" leftIcon={<FaTrash/>} size="lg">Decline</Button>
              </VStack>
            </Td>
          </Tr>
          <Tr>
            <Td>6642784</Td>
            <Td>
              <UnorderedList>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>3x</Box>
                    Neapolitan Pizza | Margherita, Tomato sauce
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>1x</Box>
                    Granny's Pancakes
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" mt={1}>
                    <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>2x</Box>
                    Farmer's Fries | Mayonnaise sauce
                  </Flex>
                </ListItem>
              </UnorderedList>
            </Td>
            <Td>
              <VStack spacing={2}>
                <Button colorScheme="green" leftIcon={<FaPlay/>} size="lg">Accept</Button>
                <Button colorScheme="red" leftIcon={<FaTrash/>} size="lg">Decline</Button>
              </VStack>
            </Td>
          </Tr>
        </Tbody>
      </Table>

      <AcceptModal isOpen={isOpen} onClose={onClose}/>
    </Box>
  )
}