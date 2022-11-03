import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast
} from "@chakra-ui/react";
import {Host} from "@/lib/host";
import {useState} from "react";
import {mutate} from "swr";

export default function AcceptModal({isOpen, onClose, orderID, idToken}) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const startOrder = async () => {
    setLoading(true);
    await fetch(`${Host()}/api/chef/updateOrderStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: idToken,
        orderID: orderID,
        status: 1
      }),
    }).then(response => response.json())
      .then(async res => {
        if (res.status !== 200) {
          throw res;
        } else {
          await mutate(`${Host()}/api/chef/getOrders/active/${idToken}`);
          setLoading(false);
          toast({
            title: "Order accepted.",
            duration: 3000,
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
        <ModalHeader pb={0}>Start order</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Text>Are you sure that you want to start this order?</Text>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={startOrder} isLoading={loading}>Start order</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}