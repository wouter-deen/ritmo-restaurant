import {
  Box,
  CircularProgress,
  Flex, Heading,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure, useToast
} from "@chakra-ui/react";
import {useState} from "react";
import useSWR, {mutate} from "swr";
import {Host} from "@/lib/host";
import {FaPen, FaSyncAlt} from "react-icons/fa";
import EditModal from "@/components/Chef/EditModal";

export default function InventoryTable({idToken}) {
  const toast = useToast();
  const [selectedItem, setSelectedItem] = useState();
  const [selectedID, setSelectedID] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {data: items, isValidating} = useSWR(() => `${Host()}/api/getProducts`, fetcher, { refreshInterval: 5000 });

  const handleOpen = (item, id) => {
    setSelectedItem(item);
    setSelectedID(id);
    onOpen();
  }

  const handleRefresh = async () => {
    await mutate(`${Host()}/api/getProducts`)
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
        <Heading fontFamily="Merriweather" mb={2} fontWeight={800}>Inventory</Heading>
        <IconButton aria-label="refresh" icon={<FaSyncAlt/>} size="sm" onClick={handleRefresh} disabled={isValidating}/>
      </Flex>
      {!items &&
        <Box align="center">
          <CircularProgress isIndeterminate/>
        </Box>
      }
      <Table>
        <Thead>
          <Tr>
            <Th>Item ID</Th>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Inventory level</Th>
            <Th>Edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items?.map((item, key) => (
            <Tr key={key}>
              <Td>{key}</Td>
              <Td>{item.name}</Td>
              <Td>
                {item.unitPrice}
              </Td>
              <Td>
                {item.quantity}
              </Td>
              <Td>
                <IconButton aria-label="edit" icon={<FaPen/>} size="sm" onClick={() => handleOpen(item, key)}/>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <EditModal isOpen={isOpen} onClose={onClose} idToken={idToken} item={selectedItem} itemID={selectedID}/>
    </>
  )
}