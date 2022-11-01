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
  useNumberInput, useToast
} from "@chakra-ui/react";
import {useContext, useEffect, useState} from "react";
import BasketContext from "@/lib/basket-context";

export default function ItemModal(props) {
  const [basketItems, addItem, removeItem, prices] = useContext(BasketContext);
  const [radioValue, setRadioValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const [maxOrderQuantity, setMaxOrderQuantity] = useState(1);

  const minInventoryAmount = process.env.NEXT_PUBLIC_MIN_INVENTORY_AMOUNT;
  const toast = useToast();

  if(!props.radioOptions && !props.selectOptions && addButtonDisabled) setAddButtonDisabled(false);

  let { value, getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1, defaultValue: 1, min: 1, max: maxOrderQuantity, precision: 0, value: orderQuantity
  })

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const quantity = getInputProps();

  const addToBasket = (event) => {
    event.preventDefault();
    let options = [];
    let itemIDs = [];

    if(props.radioOptions) {
      options.push(props.radioOptions[radioValue].name);
      itemIDs.push(...props.radioOptions[radioValue].itemIDs);
    } else if(props.selectOptions && selectValue !== "") {
      options.push(props.selectOptions[selectValue].name);
      itemIDs.push(props.selectOptions[selectValue].itemID);
    } else {
      itemIDs.push(props.itemID)
    }

    addItem({
      name: props.name,
      price: props.price,
      quantity: orderQuantity,
      options: options,
      itemIDs: itemIDs,
      img: props.img
    });

    toast({
      title: `We've added ${orderQuantity} ${props.name} to your basket.`,
      status: "success",
      isClosable: true,
      duration: 5000
    });

    props.onClose();
  }

  // Sets and updates maxOrderQuantity
  useEffect(() => {
    if (selectValue !== "") {
      const itemID = props.selectOptions[selectValue]?.itemID;
      const item = props.items[itemID];
      if (item.quantity <= minInventoryAmount){
        setAddButtonDisabled(true);
      } else {
        setAddButtonDisabled(false);
      }
    }
  }, [props.items, selectValue])

  useEffect(() => {
    if(props.radioOptions && radioValue !== "") {
      const itemIDs = props.radioOptions[parseInt(radioValue)]?.itemIDs;
      let minQuantity = 1E9;
      for(const itemID of itemIDs) {
        const quantity = props.items[itemID].quantity;
        if(quantity < minQuantity) {
          minQuantity = quantity;
        }
      }
      if(minQuantity <= minInventoryAmount) {
        setAddButtonDisabled(true);
      } else setAddButtonDisabled(false);
    }
  }, [props.items, radioValue])

  // Fires when the user changes the select or radio input.
  const handleChange = (e, type) => {
    if(type === "select") {
      const newValue = e.target.value;
      setSelectValue(newValue);
      if(newValue !== "") {
        const itemID = props.selectOptions[newValue]?.itemID;
        const item = props.items[itemID];
        setMaxOrderQuantity(item?.quantity - minInventoryAmount);
        setAddButtonDisabled(false);
      } else {
        setAddButtonDisabled(true);
      }
    } else if(type === "radio") {
      setRadioValue(e);
      let localMaxAmount = 1E9;
      const option = props.radioOptions[parseInt(e)];
      option.itemIDs.forEach((itemID) => {
        const item = props.items[itemID];
        if (item.quantity < localMaxAmount) localMaxAmount = item.quantity - minInventoryAmount;
      })
      setMaxOrderQuantity(localMaxAmount);
    }
    setOrderQuantity(1);
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
                <Select placeholder='Select option' onChange={(e) => handleChange(e, "select")} value={selectValue}>
                  {props.selectOptions.map((option, i) => (
                    <option key={i} value={i} disabled={props.items[option.itemID]?.quantity <= minInventoryAmount}>
                      {option.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            }

            {props.radioTitle &&
              <FormControl mt={2}>
                <FormLabel>{props.radioTitle}</FormLabel>
                <RadioGroup onChange={(val) => handleChange(val, "radio")} value={radioValue}>
                  <Stack direction="column">
                    {props.radioOptions.map((option, i) => (
                      <Radio key={i} value={`${i}`} isDisabled={props.items[option.itemIDs[1]]?.quantity <= minInventoryAmount}>
                        {option.name}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>
            }

            <FormControl mt={2}>
              <FormLabel>Order amount</FormLabel>
              <HStack mt={2} w="full">
                <Button {...dec} onClick={() => setOrderQuantity(orderQuantity-1)}>-</Button>
                <Input {...quantity} onChange={(e) => setOrderQuantity(e.target.value)}/>
                <Button {...inc} onClick={() => setOrderQuantity(orderQuantity+1)}>+</Button>
              </HStack>
            </FormControl>
          </Box>

        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button colorScheme="blackAlpha" bg="black" _hover={{backgroundColor: "#000"}} onClick={addToBasket} disabled={addButtonDisabled}>
            Add to cart
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}