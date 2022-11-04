import {
  Badge,
  Box,
  Button, CircularProgress,
  Flex, Heading, IconButton,
  List,
  ListItem,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure, useToast,
  VStack
} from "@chakra-ui/react";
import {FaCheck, FaPlay, FaSync, FaSyncAlt, FaTrash} from "react-icons/fa";
import {useState} from "react";
import AcceptModal from "@/components/Chef/AcceptModal";
import CompleteModal from "@/components/Chef/CompleteModal";
import useSWR, {mutate} from "swr";
import {Host} from "@/lib/host";
import DeclineModal from "@/components/Chef/DeclineModal";

export default function OrdersTable({idToken, type}) {
  const toast = useToast();
  const [orderID, setOrderID] = useState();
  const [revalidating, setRevalidating] = useState(false);
  const { isOpen: acceptOpen, onOpen: onOpenAccept, onClose: onCloseAccept } = useDisclosure();
  const { isOpen: completeOpen, onOpen: onOpenComplete, onClose: onCloseComplete } = useDisclosure();
  const { isOpen: declineOpen, onOpen: onOpenDecline, onClose: onCloseDecline } = useDisclosure();

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {data: orders, isValidating} = useSWR(() => idToken && `${Host()}/api/chef/getOrders/${type}/${idToken}`, fetcher, {refreshInterval: 10000});

  const handleAccept = (id) => {
    setOrderID(id);
    onOpenAccept();
  }

  const handleDecline = (id) => {
    setOrderID(id);
    onOpenDecline();
  }

  const handleComplete = (id) => {
    setOrderID(id);
    onOpenComplete();
  }

  const handleRefresh = async () => {
    await mutate(`${Host()}/api/chef/getOrders/${type}/${idToken}`)
    toast({
      title: "Orders refreshed.",
      description: "We refreshed the orders from the database.",
      status: "success",
      isClosable: true,
      duration: 3000
    })
  }

  return (
    <>
      <Flex justify="space-between">
        <Heading fontFamily="Merriweather" mb={2} fontWeight={800}>{type.charAt(0).toUpperCase() + type.slice(1)} orders</Heading>
        <IconButton aria-label="refresh" icon={<FaSyncAlt/>} size="sm" onClick={handleRefresh} disabled={isValidating}/>
      </Flex>
      {!orders &&
        <Box align="center">
          <CircularProgress isIndeterminate/>
        </Box>
      }
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
            const orderDate = new Date(order.timestamp);
            return (
              <Tr key={key}>
                <Td>{order.orderID.substring(0,8)}</Td>
                <Td>
                  {order.status === 0 ? <Badge bg="red.300" color="white">waiting</Badge>
                    : order.status === 1 ? <Badge bg="orange.300" color="white">preparing</Badge>
                    : order.status === 2 ? <Badge bg="green.300" color="white">complete</Badge>
                    : order.status === 3 && <Badge bg="red.300" color="white">declined</Badge>
                  }
                </Td>
                <Td>{orderDate.getHours()}:{("0"+orderDate.getMinutes()).slice(-2)}</Td>
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
                        <Button colorScheme="green" leftIcon={<FaPlay/>} onClick={() => handleAccept(order.orderID)}>
                          Start
                        </Button>
                        <Button colorScheme="red" leftIcon={<FaTrash/>} onClick={() => handleDecline(order.orderID)}>
                          Decline
                        </Button>
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
      <DeclineModal isOpen={declineOpen} onClose={onCloseDecline} orderID={orderID} idToken={idToken}/>
    </>
  )
}