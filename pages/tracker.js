import {Box, Button, Circle, Flex, Heading, Icon, Text} from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import {FaArrowCircleDown, FaCheck, FaRegCheckCircle, FaStar} from "react-icons/fa";

export default function OrderTracker() {

  const content = (
    <Flex py={4}>
      <Text>Here is some content</Text>
    </Flex>
  );

  return (
    <Box minH="100vh" bg="gray.100" pb={12}>
      <NavBar/>
      <Box bgGradient='linear(to-l, #7928CA, #FF0080)' color="white" rounded="xl" p={4} m={4} mt={24} align="center">
        <Heading fontFamily="Merriweather" mr={2}>Thanks heaps!</Heading>
        <Icon as={FaRegCheckCircle} boxSize={10} my={4} color="green.300"/>
        <Text>Your order has been received and will be prepared shortly.</Text>
      </Box>

      <Box bg="white" rounded="xl" p={4} m={4} mt={8}>
        <Flex>
          <Icon as={FaStar} color="yellow.300" boxSize={8} mr={2}/>
          <Heading fontFamily="Merriweather" mr={2}>Status tracker</Heading>
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
            <Box borderRadius="md" border="2px solid" borderColor="green.200" h="25px" ml="18px"/>
          </Flex>

          <Flex my={1}>
            <Circle bg="green.300" size={10} mr={4} fontSize="xl" fontWeight={700} fontFamily="Poppins">
              <Icon as={FaCheck} color="white"/>
            </Circle>
            <Box mt={2}>
              <Text fontWeight={600} fontSize="lg">Preparing</Text>
            </Box>
          </Flex>

          <Flex>
            <Box borderRadius="md" border="2px solid" borderColor="green.200" h="25px" ml="18px"/>
          </Flex>

          <Flex my={1}>
            <Circle bg="green.300" size={10} mr={4} fontSize="xl" fontWeight={700} fontFamily="Poppins">
              <Icon as={FaCheck} color="white"/>
            </Circle>
            <Box mt={2}>
              <Text fontWeight={600} fontSize="lg">Ready for pick-up</Text>
              <Text>Go to the counter and show them your order number:</Text>
              <Text fontSize="5xl" fontWeight={800} mt={2} bg="black" w="fit-content" px={2} color="white" rounded="lg">84 56 84 2</Text>
            </Box>
          </Flex>

        </Flex>

      </Box>

      <Box mt={4} align="center" variant="ghost">
        <Button rightIcon={<FaArrowCircleDown/>} colorScheme="blue" variant="ghost">Download receipt</Button>
      </Box>
    </Box>
  )
}