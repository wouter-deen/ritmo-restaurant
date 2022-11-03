import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import {ArrowForwardIcon} from "@chakra-ui/icons";

export default function PromotionModal({isOpen, onClose}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pb={0}>Special promotion</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Text>
            For each order in November larger than €25, you&apos;ll get two <b>free fast passes</b> for a ride of your choice!
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" rightIcon={<ArrowForwardIcon/>} onClick={onClose}>
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}