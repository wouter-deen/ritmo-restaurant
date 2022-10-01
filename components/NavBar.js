import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Img,
  Input,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  UnorderedList
} from "@chakra-ui/react";
import {FaPen, FaShoppingBasket} from "react-icons/fa";
import {useRouter} from "next/router";

export default function NavBar() {
  const router = useRouter();

  const ItemPrice = ({price, amount}) => (
    <Box bg="gray.100" rounded="md" w="fit-content" textAlign="right" mt={1}>
      <Text px={1}>€ {price * amount} ({amount} × {price})</Text>
    </Box>
  )

  return (
    <Box pt={2}>
      <Flex boxShadow="xl" px={2} py={2} mx={2} mb={8} rounded="xl" bg="white" pos="fixed" w="calc(100% - 1rem)" zIndex={1}>
        <Img src="/ritmo-logo.svg" boxSize={10} mr={3} onClick={() => router.push("/")}/>
        <Input placeholder="Search..." mr={2}/>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<FaShoppingBasket />}
            fontSize="22"
            mr={2}
          />
          <MenuList>
            <List spacing={2}>

              <ListItem px={4} pb={2}>
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

              <ListItem px={4} pb={2}>
                <Flex justify="space-between">
                  <Box>
                    <Flex align="center">
                      <Text fontWeight={700} mr={1}>Granny's Pancakes</Text>
                      <Box bg="black" rounded="md" h="fit-content" px={1} fontWeight="bold" color="white" fontSize="sm">
                        1x
                      </Box>
                    </Flex>

                    <ItemPrice price={8.99} amount={1}/>
                  </Box>
                  <IconButton aria-label={"remove"} icon={<FaPen/>} size="sm"/>
                </Flex>
              </ListItem>
              
              <Divider/>

              <ListItem px={4} pb={2}>
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

              <Divider/>

              <ListItem px={4} pb={2}>
                <Box border="1px solid" borderColor="gray.200" borderRadius="6px">
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
                      <Tr>
                        <Td p={1} fontWeight="bold">Total</Td>
                        <Td p={1} fontWeight="bold">€ 64.06</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>

              </ListItem>

              <Divider/>

              <Flex w="full" justify="flex-end">
                <Button colorScheme="blue" mr={2} onClick={() => router.push("/payment")}>Proceed</Button>
              </Flex>

            </List>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  )
}