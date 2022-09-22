import {
  Box, Button, Divider,
  Flex,
  IconButton,
  Img,
  Input,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  Text,
  UnorderedList
} from "@chakra-ui/react";
import {FaShoppingBasket, FaTrash, FaUser} from "react-icons/fa";

export default function NavBar() {
  return (
    <Box pt={2}>
      <Flex boxShadow="xl" px={2} py={2} mx={2} mb={8} rounded="xl" bg="white" pos="fixed" w="calc(100% - 1rem)" zIndex={1}>
        <Img src="/ritmo-logo.svg" boxSize={10} mr={3}/>
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
                  </Box>
                  <IconButton aria-label={"remove"} icon={<FaTrash/>} size="sm"/>
                </Flex>
              </ListItem>

              <Divider/>

              <ListItem px={4} pb={2}>
                <Flex justify="space-between">
                  <Box>
                    <Flex align="center">
                      <Text fontWeight={700} mr={1}>Farmer's Fries</Text>
                      <Box bg="black" rounded="md" h="fit-content" px={1} fontWeight="bold" color="white" fontSize="sm">
                        1x
                      </Box>
                    </Flex>
                    <UnorderedList>
                      <ListItem>Satay sauce</ListItem>
                    </UnorderedList>
                  </Box>
                  <IconButton aria-label={"remove"} icon={<FaTrash/>} size="sm"/>
                </Flex>
              </ListItem>

              <Divider/>

              <Flex w="full" justify="flex-end">
                <Button colorScheme="blue" mr={2}>Proceed</Button>
              </Flex>

            </List>
          </MenuList>
        </Menu>
        <IconButton icon={<FaUser/>} fontSize="22"/>
      </Flex>
    </Box>
  )
}