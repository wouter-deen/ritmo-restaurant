import {
  Alert, AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Circle,
  Collapse,
  Flex,
  Heading,
  Icon,
  Text,
  useToast
} from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import {FaCheck, FaStar} from "react-icons/fa";
import useSWR from "swr";
import {Host} from "@/lib/host";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function OrderTracker() {
  const toast = useToast();
  const router = useRouter();
  const {orderID} = router.query;
  const [status, setStatus] = useState(0);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {data: order} = useSWR(() => orderID && `${Host()}/api/getOrderStatus/${orderID}`, fetcher, {refreshInterval: 10000});

  if(order && status !== order.status) setStatus(order.status);

  // Listen to a status change to display a toast notification
  useEffect(() => {
    if(status === 1) {
      toast.closeAll();
      toast({
        title: "Order accepted.",
        description: "Our chefs started preparing your order.",
        status: "info",
        duration: 15000,
        isClosable: true
      })
    }
    if(status === 2) {
      toast.closeAll();
      toast({
        title: "Served hot!",
        description: "Your order is ready for pick-up.",
        status: "success",
        duration: 15000,
        isClosable: true
      })
    }
  }, [status])

  return (
    <Box minH="100vh" bg="gray.100" pb={12}>
      <NavBar/>
      <Box bg="green.400" color="white" rounded="xl" p={4} m={4} mt={32} align="center" pos="relative">
        <Circle pos="absolute" top={-10} left="50%" transform="translate(-50%)" bg="green.400" border="8px solid" borderColor="gray.100">
          <Icon as={FaCheck} boxSize={16} color="white" p={4}/>
        </Circle>
        <Heading fontFamily="Merriweather" mr={2} mt={8}>Thanks heaps!</Heading>
        <Text mb={6}>Your order has been received and will be prepared shortly.</Text>
      </Box>

      <Box bg="white" rounded="xl" p={4} m={4} mt={8}>
        <Flex>
          <Icon as={FaStar} color="yellow.300" boxSize={8} mr={2}/>
          <Heading fontFamily="Merriweather" mr={2} fontWeight={800}>Status tracker</Heading>
        </Flex>

        <Flex flexDir="column" mt={2}>
          <Flex my={1}>
            <Circle bg="green.300" size={10} mr={4} fontSize="xl" fontWeight={700} fontFamily="Poppins">
              <Icon as={FaCheck} color="white"/>
            </Circle>
            <Box mt={2}>
              <Text fontWeight={600} fontSize="lg">Received</Text>
            </Box>
          </Flex>

          <Flex>
            <Box borderRadius="md" border="2px solid" h="25px" ml="18px"
                 borderColor={status === 1 || status === 2 ? "green.200" : "gray.200"}
            />
          </Flex>

          <Flex my={1}>
            <Circle size={10} mr={4} fontSize="xl" fontWeight={700} fontFamily="Poppins"
                    bg={status === 1 || status === 2 ? "green.300" : "gray.300"}
            >
              <Icon as={FaCheck} color="white"/>
            </Circle>
            <Box mt={2}>
              <Text fontWeight={600} fontSize="lg">Preparing</Text>
            </Box>
          </Flex>

          <Flex>
            <Box borderRadius="md" border="2px solid" h="25px" ml="18px" borderColor={status === 2 ? "green.200" : "gray.200"}/>
          </Flex>

          <Flex my={1}>
            <Circle bg={status === 2 ? "green.300" : "gray.300"} size={10} mr={4} fontSize="xl" fontWeight={700} fontFamily="Poppins">
              <Icon as={FaCheck} color="white"/>
            </Circle>
            <Box mt={2}>
              <Text fontWeight={600} fontSize="lg">Ready for pick-up</Text>
              <Collapse in={status === 2}>
                <Text>Go to the counter and show the staff member your order number:</Text>
                <Text fontSize="5xl" fontWeight={800} mt={2} bg="black" w="fit-content" px={2} color="white" rounded="lg">
                  {orderID?.substring(0,8)}
                </Text>
              </Collapse>
            </Box>
          </Flex>

        </Flex>

        <Collapse in={status === 0 || status === 1}>
          <Alert status="info" alignItems="flex-start" rounded="lg" mt={4}>
            <AlertIcon/>
            <Flex flexDir="column">
              <AlertTitle>No need to refesh</AlertTitle>
              <AlertDescription>The status updates automatically.</AlertDescription>
            </Flex>
          </Alert>
        </Collapse>
      </Box>

      <Text align="center" px={4} mt={6} fontWeight={500}>
        A receipt has been sent to your e-mail
      </Text>
    </Box>
  )
}