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

export default function DeclineModal({isOpen, onClose, orderID, idToken}) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const declineOrder = async () => {
    setLoading(true);
    await fetch(`${Host()}/api/chef/updateOrderStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: idToken,
        orderID: orderID,
        status: 3
      }),
    }).then(response => response.json())
      .then(async res => {
        if (res.status !== 200) {
          throw res;
        } else {
          await mutate(`${Host()}/api/chef/getOrders/active/${idToken}`);
          setLoading(false);
          toast({
            title: "Order declined.",
            description: "The order has been declined. It will still be visible in the completed orders tab.",
            duration: 10000,
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
        <ModalHeader pb={0}>Decline order</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Text>Are you sure that you want to decline this order?</Text>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="red" onClick={declineOrder} isLoading={loading}>Decline order</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}