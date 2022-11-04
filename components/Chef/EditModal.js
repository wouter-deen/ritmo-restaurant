import {
  Button, Flex,
  FormControl, FormHelperText,
  FormLabel, Input,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast
} from "@chakra-ui/react";
import React, {useState} from "react";
import {FaLayerGroup, FaMoneyBill} from "react-icons/fa";
import {Host} from "@/lib/host";
import {mutate} from "swr";

export default function EditModal({isOpen, onClose, item, idToken, itemID}) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const updateItem = async (type) => {
    setLoading(true);

    const inventoryInput = document.getElementById("inventoryInput").value;
    const priceInput = document.getElementById("priceInput").value;

    let data = {};
    if(type === "inventory") data = {quantity: inventoryInput};
    if(type === "price") data = {unitPrice: priceInput};

    await fetch(`${Host()}/api/chef/updateItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: idToken,
        itemID: itemID,
        data: data
      }),
    }).then(response => response.json())
      .then(async res => {
        if (res.status !== 200) {
          throw res;
        } else {
          await mutate(`${Host()}/api/getProducts`);
          setLoading(false);
          toast({
            title: "The item has been updated.",
            duration: 5000,
            status: "success"
          });
          onClose();
        }
      })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit inventory for {item?.name}</ModalHeader>
        <ModalCloseButton/>

        <ModalBody>
          <List justify="center" spacing={2}>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={FaLayerGroup} color="gray.300" w={6} h={6}/>
              <Text fontWeight={600}>{item?.quantity} items</Text>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={FaMoneyBill} color="gray.300" w={6} h={6}/>
              <Text fontWeight={600}>€ {item?.unitPrice}</Text>
            </ListItem>
          </List>

          <Flex align="flex-end" w="fit-content">
            <FormControl mt={4}>
              <FormLabel>Update inventory</FormLabel>
              <NumberInput maxW={36} defaultValue={0} min={-1000} max={1000}>
                <NumberInputField id="inventoryInput"/>
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <Button colorScheme="blue" onClick={() => updateItem("inventory")} isLoading={loading}>Update</Button>
          </Flex>


          <Flex align="flex-end" w="fit-content">
            <FormControl mt={4}>
              <FormLabel>Change price</FormLabel>
              <NumberInput maxW={36} defaultValue={item?.unitPrice} min={0} max={1000}>
                <NumberInputField id="priceInput"/>
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <Button colorScheme="blue" onClick={() => updateItem("price")} isLoading={loading}>Update</Button>
          </Flex>

        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}