import {
  Box,
  Button,
  Flex,
  ListItem,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  UnorderedList,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import {FaCheck, FaPlay, FaTrash} from "react-icons/fa";
import AcceptModal from "@/components/Chef/AcceptModal";
import {useEffect, useState} from "react";
import {useAuth} from "@/lib/auth";
import useSWR from "swr";
import {Host} from "@/lib/host";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useRouter} from "next/router";
import CompleteModal from "@/components/Chef/CompleteModal";

export default function Dashboard() {
  const auth = useAuth();
  const router = useRouter();
  const { isOpen: acceptOpen, onOpen: onOpenAccept, onClose: onCloseAccept } = useDisclosure();
  const { isOpen: completeOpen, onOpen: onOpenComplete, onClose: onCloseComplete } = useDisclosure();
  const [orderID, setOrderID] = useState();
  const [idToken, setIDToken] = useState();
  const [completeLoading, setCompleteLoading] = useState(false);

  //send unauthenticated user back to landing page
  const firebaseAuth = getAuth();
  onAuthStateChanged(firebaseAuth, (user) => {
    if(!user && typeof window !== "undefined") router.push("/chef/login");
  })

  useEffect(() => {
    firebaseAuth.currentUser?.getIdToken()?.then(token => {
      setIDToken(token);
    });
  }, [auth.user])

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {data: orders} = useSWR(() => idToken && `${Host()}/api/chef/getActiveOrders/${idToken}`, fetcher, { refreshInterval: 10000 });

  const handleAccept = (id) => {
    setOrderID(id);
    onOpenAccept();
  }

  const handleComplete = (id) => {
    setOrderID(id);
    onOpenComplete();
  }

  return (
    <Box fontSize="2xl">
      <Table>
        <Thead bg="black">
          <Tr>
            <Th fontSize="md" color="#fff">
              Order ID
            </Th>
            <Th fontSize="md" color="#fff">
              Items
            </Th>
            <Th fontSize="md" color="#fff">
              Options
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders?.map((order, key) => (
            <Tr bg={order.status === 1 ? "red.200" : order.status === 2 && "green.200"} key={key}>
              <Td>{order.orderID.substring(0,8)}</Td>
              <Td>
                <UnorderedList>
                  {order.items.map((item, key) => (
                    <ListItem key={key}>
                      <Flex align="center" mt={1}>
                        <Box bg="black" color="white" px={1} py={1} rounded="md" w="fit-content" fontWeight="700" mr={1}>{item.quantity}x</Box>
                        {item.name} {item.options[0]}
                      </Flex>
                    </ListItem>
                  ))}
                </UnorderedList>
              </Td>
              <Td>
                {order.status === 0 ?
                  <VStack spacing={2}>
                    <Button colorScheme="green" leftIcon={<FaPlay/>} size="lg" onClick={() => handleAccept(order.orderID)}>Accept</Button>
                    <Button colorScheme="red" leftIcon={<FaTrash/>} size="lg">Decline</Button>
                  </VStack>
                : order.status === 1 &&
                  <Button colorScheme="blue" leftIcon={<FaCheck/>} size="lg" isLoading={completeLoading}
                          onClick={() => handleComplete(order.orderID)}
                  >
                    Complete
                  </Button>
                }
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>



      <Flex justify="center" my={8}>
        <Button onClick={() => auth.signout()}>Log out</Button>
      </Flex>

      <AcceptModal isOpen={acceptOpen} onClose={onCloseAccept} orderID={orderID} idToken={idToken}/>
      <CompleteModal isOpen={completeOpen} onClose={onCloseComplete} orderID={orderID} idToken={idToken}/>
    </Box>
  )
}