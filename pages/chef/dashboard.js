import {Box, Button, Img, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useAuth} from "@/lib/auth";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useRouter} from "next/router";
import OrdersTable from "@/components/Chef/OrdersTable";
import {FaSignOutAlt} from "react-icons/fa";

export default function Dashboard() {
  const auth = useAuth();
  const router = useRouter();
  const [idToken, setIDToken] = useState();

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

  return (
    <Box p={4} bg="gray.100" minH="100vh">
      <Tabs variant='soft-rounded' colorScheme='blue'>
        <TabList bg="white" p={2} rounded="xl" boxShadow="xl" pos="fixed" w="calc(100% - 2rem)">
          <Img src="/ritmo-logo.svg" boxSize={10} mr={3} onClick={() => router.push("/")}/>
          <Tab>Active orders</Tab>
          <Tab>Finished orders</Tab>
          <Tab>Options</Tab>
        </TabList>
        <TabPanels pt={24}>
          <TabPanel bg="white" rounded="xl">
            <OrdersTable idToken={idToken} type="active"/>
          </TabPanel>
          <TabPanel bg="white" rounded="xl">
            <OrdersTable idToken={idToken} type="finished"/>
          </TabPanel>
          <TabPanel bg="white" rounded="xl">
            <Button onClick={() => auth.signout()} rightIcon={<FaSignOutAlt/>}>Log out</Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}