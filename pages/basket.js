import {
  Alert, AlertDescription, AlertIcon, AlertTitle,
  Box,
  Button, Collapse,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Img,
  Input,
  List,
  Select,
  Table,
  Tbody,
  Td,
  Tr
} from "@chakra-ui/react";
import {FaShoppingBasket} from "react-icons/fa";
import NavBar from "@/components/NavBar";
import {useContext, useEffect, useState} from "react";
import BasketContext from "@/lib/basket-context";
import BasketItem from "@/components/Basket/BasketItem";
import {useRouter} from "next/router";
import {Host} from "@/lib/host";
import {ArrowForwardIcon} from "@chakra-ui/icons";

export default function Basket() {
  const router = useRouter();
  const [basketItems, addItem, removeItem, prices, clearBasket] = useContext(BasketContext);
  const [email, setEmail] = useState(String());
  const [bank, setBank] = useState("");
  const [paymentButtonDisabled, setPaymentButtonDisabled] = useState(true);
  const banks = ["ABN Amro", "ASN Bank", "Bunq", "ING", "Knab", "Rabobank", "Regiobank", "Revolut", "SNS",
    "Triodos Bank", "Van Lanschot", "N26"];

  const placeOrder = async () => {
    await fetch(`${Host()}/api/placeOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: basketItems,
        prices: prices,
        email: email
      }),
    }).then((response) => response.json())
      .then(async (res) => {
        clearBasket();
        await router.push(`/tracker?orderID=${res.orderID}`)
      })
  }

  useEffect(() => {
    if(bank !== "" && email && email !== "" && email.includes("@") && email.includes(".")) {
      setPaymentButtonDisabled(false);
    } else setPaymentButtonDisabled(true);
  }, [bank, email]);

  return (
    <Box minH="100vh" bg="gray.100" pb={12}>
      <NavBar/>
      <Box bg="white" rounded="xl" p={4} m={4} mt={24}>
        <Flex>
          <Icon as={FaShoppingBasket} boxSize={9} mr={2}/>
          <Heading fontFamily="Merriweather" fontWeight={800}>Your items</Heading>
        </Flex>
        {basketItems.length > 0 &&
          <List mt={4} border="1px solid" borderColor="gray.200" rounded="md">
            {basketItems.map((item) => (
              <BasketItem item={item} key={item.options}/>
            ))}
          </List>
        }
        <Collapse in={basketItems.length === 0}>
          <Alert status="info" rounded="md" alignItems="flex-start" mt={4}>
            <AlertIcon/>
            <Flex flexDir="column">
              <AlertTitle color="blue.800">Your basket is empty.</AlertTitle>
              <AlertDescription color="blue.800">Take a look at the menu and order some smokin' hot food!</AlertDescription>
              <Button w="fit-content" rightIcon={<ArrowForwardIcon/>} mt={2} colorScheme="blue"
                      onClick={() => router.push("/")}
              >
                To menu
              </Button>
            </Flex>
          </Alert>
        </Collapse>
      </Box>

      <Collapse in={basketItems.length > 0}>
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
                  <Td p={1}>VAT (9%)</Td>
                  <Td p={1}>€ {prices.vat}</Td>
                </Tr>
                <Tr bg="gray.50">
                  <Td p={1} fontWeight="bold">Total</Td>
                  <Td p={1} fontWeight="bold">€ {prices.total}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>


          <FormControl mt={4}>
            <FormLabel>Bank</FormLabel>
            <Select placeholder='Select bank' onChange={(e) => setBank(e.target.value)}>
              {banks.map((bank, key) => (
                <option key={key}>{bank}</option>
              ))}
            </Select>
          </FormControl>


          <FormControl mt={2}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="user@domain.com" onChange={(e) => setEmail(e.target.value)}/>
          </FormControl>

          <Flex justify="flex-end" pt={4}>
            <Button colorScheme="pink" bg="#d20072" onClick={placeOrder} disabled={paymentButtonDisabled}>Pay by iDEAL</Button>
          </Flex>
        </Box>
      </Collapse>

    </Box>
  )
}