import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  useNumberInput
} from "@chakra-ui/react";
import {useContext, useState} from "react";
import BasketContext from "@/components/BasketContext";

export default function ItemModal(props) {
  const [items, addItem, removeItem, prices] = useContext(BasketContext);
  const [radioValue, setRadioValue] = useState("0");
  const [selectValue, setSelectValue] = useState("-1");

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1, defaultValue: 1, min: 1, max: 30, precision: 0
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const quantity = getInputProps()

  const addToBasket = (event) => {
    event.preventDefault();
    const options = []
    let itemIDs = [];

    if(props.radioOptions) {
      options.push(props.radioOptions[radioValue].name);
      itemIDs.push(...props.radioOptions[radioValue].itemIDs);
    }

    if(props.selectOptions && selectValue !== "-1") {
      options.push(props.selectOptions[selectValue].name);
      itemIDs.push(props.selectOptions[selectValue].itemID);
    }

    addItem({
      name: props.name,
      price: props.price,
      quantity: quantity["aria-valuenow"],
      options: options,
      itemIDs: itemIDs,
      img: props.img
    });

    props.onClose();
  }


  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} motionPreset='slideInBottom'>
      <ModalOverlay />
      <ModalContent>
        <Box bgImg={props.pic} borderRadius="6px 6px 0 0" h="200px" backgroundPosition="center" backgroundSize="cover"/>
        <ModalHeader pb={0}>{props.name}</ModalHeader>
        <ModalCloseButton bg="rgba(255,255,255,.6)" backdropFilter="blur(5px)"/>
        <ModalBody>
          <Text pb={4}>{props.descr}</Text>

          <Box as="form" mt={4}>
            {props.selectTitle &&
              <FormControl>
                <FormLabel>{props.selectTitle}</FormLabel>
                <Select placeholder='Select option' onChange={(e) => setSelectValue(e.target.value)} value={selectValue}>
                  {props.selectOptions.map((option, i) => (
                    <option key={i} value={i}>{option.name}</option>
                  ))}
                </Select>
              </FormControl>
            }

            {props.radioTitle &&
              <FormControl mt={2}>
                <FormLabel>{props.radioTitle}</FormLabel>
                <RadioGroup onChange={setRadioValue} value={radioValue}>
                  <Stack direction="column">
                    {props.radioOptions.map((option, i) => (
                      <Radio key={i} value={`${i}`}>{option.name}</Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>
            }

            <FormControl mt={2}>
              <FormLabel>Order amount</FormLabel>
              <HStack mt={2} w="full">
                <Button {...dec}>-</Button>
                <Input {...quantity} />
                <Button {...inc}>+</Button>
              </HStack>
            </FormControl>
          </Box>

        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button colorScheme="blackAlpha" bg="black" _hover={{backgroundColor: "#000"}} onClick={addToBasket}>Add to cart</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}