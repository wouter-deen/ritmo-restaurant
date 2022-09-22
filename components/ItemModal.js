import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";

export default function ItemModal({isOpen, onClose, name, descr, img}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {descr}
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blackAlpha" bg="black" _hover={{backgroundColor: "#000"}}>Add to cart</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}