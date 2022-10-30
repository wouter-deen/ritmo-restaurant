import {Box, Button, Divider, Flex, Heading, Icon, Img, List, Select, Table, Tbody, Td, Tr} from "@chakra-ui/react";
import {FaShoppingBasket} from "react-icons/fa";
import NavBar from "@/components/NavBar";
import {useContext} from "react";
import BasketContext from "@/lib/basket-context";
import BasketItem from "@/components/Basket/BasketItem";

export default function Basket() {
  const [basketItems, addItem, removeItem, prices] = useContext(BasketContext);
  const banks = ["ABN Amro", "ASN Bank", "Bunq", "ING", "Knab", "Rabobank", "Regiobank", "Revolut", "SNS",
    "Triodos Bank", "Van Lanschot", "N26"]

  return (
    <Box minH="100vh" bg="gray.100" pb={12}>
      <NavBar/>
      <Box bg="white" rounded="xl" p={4} m={4} mt={24}>
        <Flex>
          <Icon as={FaShoppingBasket} boxSize={9} mr={2}/>
          <Heading fontFamily="Merriweather" fontWeight={800}>Your items</Heading>
        </Flex>
        <List mt={4} border="1px solid" borderColor="gray.200" rounded="md">
          {basketItems.map((item, key) => (
            <BasketItem item={item} key={key}/>
          ))}
        </List>
      </Box>

      <Box bg="white" rounded="xl" mt={4} mx={4} p={4}>
        <Flex align="center">
          <Img src="/ideal-logo.svg" alt="iDEAL logo" boxSize={9} mr={1}/>
          <Heading fontFamily="Merriweather" fontWeight={800}>Payment</Heading>
        </Flex>
        <Box rounded="md" mt={4}>
          <Table>
            <Tbody>
              <Tr>
                <Td p={1}>Subtotal</Td>
                <Td p={1}>€ {prices.subtotal}</Td>
              </Tr>
              <Tr>
                <Td p={1}>BTW</Td>
                <Td p={1}>€ {prices.vat}</Td>
              </Tr>
              <Tr bg="gray.50">
                <Td p={1} fontWeight="bold">Total</Td>
                <Td p={1} fontWeight="bold">€ {prices.total}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>

        <Select placeholder='Select bank' mt={4}>
          {banks.map((bank, key) => (
            <option key={key}>{bank}</option>
          ))}
        </Select>

        <Flex justify="flex-end" pt={4}>
          <Button colorScheme="pink" bg="#d20072">Pay by iDEAL</Button>
        </Flex>
      </Box>

    </Box>
  )
}