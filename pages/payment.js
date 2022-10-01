import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Img,
  List,
  ListItem,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  UnorderedList
} from "@chakra-ui/react";
import {FaPen, FaShoppingBasket} from "react-icons/fa";
import NavBar from "@/components/NavBar";

export default function PaymentScreen() {
  const ItemPrice = ({price, amount}) => (
    <Box bg="gray.100" rounded="md" w="fit-content" textAlign="right" mt={1}>
      <Text px={1}>€ {price * amount} ({amount} × {price})</Text>
    </Box>
  )

  return (
    <Box minH="100vh" bg="gray.100" pb={12}>
      <NavBar/>
      <Box bg="white" rounded="xl" p={4} m={4} mt={24}>
        <Flex>
          <Icon as={FaShoppingBasket} boxSize={9} mr={2}/>
          <Heading fontFamily="Merriweather">What's in it?</Heading>
        </Flex>
        <List mt={4} border="1px solid" borderColor="gray.200" rounded="md">
          <ListItem my={2} px={4}>
            <Flex justify="space-between">
              <Box mr={8}>
                <Flex align="center">
                  <Text fontWeight={700} mr={1}>Neapolitan Pizza</Text>
                  <Box bg="black" rounded="md" h="fit-content" px={1} fontWeight="bold" color="white" fontSize="sm">
                    3x
                  </Box>
                </Flex>
                <UnorderedList>
                  <ListItem>Margherita</ListItem>
                  <ListItem>Tomato sauce</ListItem>
                </UnorderedList>

                <ItemPrice price={11.99} amount={3}/>
              </Box>
              <IconButton aria-label={"remove"} icon={<FaPen/>} size="sm"/>
            </Flex>
          </ListItem>

          <Divider/>

          <ListItem my={2} px={4}>
            <Flex justify="space-between">
              <Box>
                <Flex align="center">
                  <Text fontWeight={700} mr={1}>Farmer's Fries</Text>
                  <Box bg="black" rounded="md" h="fit-content" px={1} fontWeight="bold" color="white" fontSize="sm">
                    2x
                  </Box>
                </Flex>
                <UnorderedList>
                  <ListItem>Mayonnaise sauce</ListItem>
                  <ListItem fontStyle="italic">Please add extra sauce</ListItem>
                </UnorderedList>

                <ItemPrice price={3.99} amount={2}/>
              </Box>
              <IconButton aria-label={"remove"} icon={<FaPen/>} size="sm"/>
            </Flex>
          </ListItem>
        </List>
      </Box>

      <Box bg="white" rounded="xl" mt={4} mx={4} p={4}>
        <Flex align="center">
          <Img src="/ideal-logo.svg" alt="iDEAL logo" boxSize={9} mr={1}/>
          <Heading fontFamily="Merriweather">Payment</Heading>
        </Flex>
        <Box border="1px solid" borderColor="gray.200" rounded="md" mt={2}>
          <Table>
            <Tbody>
              <Tr>
                <Td p={1}>Subtotal</Td>
                <Td p={1}>€ 52.94</Td>
              </Tr>
              <Tr>
                <Td p={1}>BTW</Td>
                <Td p={1}>€ 11.12</Td>
              </Tr>
              <Tr bg="gray.50">
                <Td p={1} fontWeight="bold">Total</Td>
                <Td p={1} fontWeight="bold">€ 64.06</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>

        <Select placeholder='Select bank' mt={4}>
          <option>ABN Amro</option>
          <option>ASN Bank</option>
          <option>Bunq</option>
          <option>ING</option>
          <option>Knab</option>
          <option>Rabobank</option>
          <option>Regiobank</option>
          <option>Revolut</option>
          <option>SNS</option>
          <option>Triodos Bank</option>
          <option>Van Lanschot</option>
          <option>N26</option>
        </Select>

        <Flex justify="flex-end" pt={4}>
          <Button colorScheme="pink" bg="#d20072">Pay by iDEAL</Button>
        </Flex>
      </Box>

    </Box>
  )
}