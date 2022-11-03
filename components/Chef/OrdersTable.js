import {
  Badge,
  Box,
  Button,
  Flex,
  List,
  ListItem,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import {FaCheck, FaPlay, FaTrash} from "react-icons/fa";
import {useState} from "react";
import AcceptModal from "@/components/Chef/AcceptModal";
import CompleteModal from "@/components/Chef/CompleteModal";
import useSWR from "swr";
import {Host} from "@/lib/host";

export default function OrdersTable({idToken, type}) {
  const [orderID, setOrderID] = useState();
  const { isOpen: acceptOpen, onOpen: onOpenAccept, onClose: onCloseAccept } = useDisclosure();
  const { isOpen: completeOpen, onOpen: onOpenComplete, onClose: onCloseComplete } = useDisclosure();

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {data: orders} = useSWR(() => idToken && `${Host()}/api/chef/getOrders/${type}/${idToken}`, fetcher, {
    refreshInterval: type === "active" ? 10*1000 : 60*1000
  });

  const handleAccept = (id) => {
    setOrderID(id);
    onOpenAccept();
  }

  const handleComplete = (id) => {
    setOrderID(id);
    onOpenComplete();
  }

  return (
    <>
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Status</Th>
            <Th>Time</Th>
            <Th>Items</Th>
            {type === "active" &&
              <Th>Options</Th>
            }
          </Tr>
        </Thead>
        <Tbody>
          {orders?.map((order, key) => {
            const date = new Date(order.timestamp);
            return (
              <Tr key={key}>
                <Td>{order.orderID.substring(0,8)}</Td>
                <Td>
                  {order.status === 0 ? <Badge bg="red.300">waiting</Badge>
                    :order.status === 1 ? <Badge bg="orange.300">preparing</Badge>
                  : order.status === 2 && <Badge bg="green.300">complete</Badge> }
                </Td>
                <Td>{date.getHours()}:{("0"+date.getMinutes()).slice(-2)}</Td>
                <Td>
                  <List>
                    {order.items.map((item, i) => (
                      <ListItem key={i}>
                        <Flex align="center" mt={1}>
                          <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>{item.quantity}x</Box>
                          {item.name}
                          {item.options.map((option, i) => (
                            <Badge ml={2} bg="gray.200" key={i}>{option}</Badge>
                          ))}
                        </Flex>
                      </ListItem>
                    ))}
                  </List>
                </Td>
                {type === "active" &&
                  <Td>
                    {order.status === 0 ?
                      <VStack spacing={2} align="left" w="fit-content">
                        <Button colorScheme="green" leftIcon={<FaPlay/>} onClick={() => handleAccept(order.orderID)}>Accept</Button>
                        <Button colorScheme="red" leftIcon={<FaTrash/>}>Decline</Button>
                      </VStack>
                      : order.status === 1 &&
                      <Button colorScheme="blue" leftIcon={<FaCheck/>} onClick={() => handleComplete(order.orderID)}>
                        Complete
                      </Button>
                    }
                  </Td>
                }
              </Tr>
            )
          })}
        </Tbody>
      </Table>

      <AcceptModal isOpen={acceptOpen} onClose={onCloseAccept} orderID={orderID} idToken={idToken}/>
      <CompleteModal isOpen={completeOpen} onClose={onCloseComplete} orderID={orderID} idToken={idToken}/>
    </>
  )
}