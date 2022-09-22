import {
  Box,
  Button, Divider, FormControl, FormLabel, HStack, Img, Input, InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Radio, RadioGroup, Select, Stack, Text, useNumberInput
} from "@chakra-ui/react";
import {createContext, useState} from "react";

export default function ItemModal(props) {
  const [radioValue, setRadioValue] = useState('0');
  const CartContext = createContext(null);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
  useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 30,
    precision: 0,
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

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
                <Select placeholder='Select option'>
                  {props.selectOptions.map((option, i) => (
                    <option key={i} value={i}>{option}</option>
                  ))}
                </Select>
              </FormControl>
            }

            {props.radioTitle &&
              <FormControl mt={2}>
                <FormLabel>{props.radioTitle}</FormLabel>
                <RadioGroup onChange={setRadioValue} value={radioValue}>
                  <Stack direction="row">
                    {props.radioOptions.map((option, i) => (
                      <Radio key={i} value={`${i}`}>{option}</Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>
            }

            <FormControl mt={2}>
              <FormLabel>Order amount</FormLabel>
              <HStack mt={2} w="full">
                <Button {...dec}>-</Button>
                <Input {...input} />
                <Button {...inc}>+</Button>
              </HStack>
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Notes</FormLabel>
              <Input placeholder="Gluten allergy, etc." id="notesInput"/>
            </FormControl>
          </Box>

        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button colorScheme="blackAlpha" bg="black" _hover={{backgroundColor: "#000"}}>Add to cart</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}