import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  useNumberInput
} from "@chakra-ui/react";
import {useState} from "react";

export default function AcceptModal(props) {
  const [radioValue, setRadioValue] = useState('0');

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
        <ModalHeader pb={0}>Start order</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>

          <FormControl>
            <FormLabel>Chef ID</FormLabel>
            <HStack>
              <PinInput type='number'>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </FormControl>

        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button colorScheme="green">Start order</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}