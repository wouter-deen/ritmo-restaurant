import NavBar from "@/components/NavBar";
import Promotion from "@/components/Promotion";
import {Box, Divider} from "@chakra-ui/react";
import Menu from "@/components/Menu/Menu";
import {Head} from "next/head";
import useSWR from "swr";

export default function Home() {
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const {data, error} = useSWR(() => `/api/hello`, fetcher);
  console.log(data);

  return (
    <Box bg="gray.50" minH="100vh">
      <NavBar/>
      <Promotion/>
      <Divider zIndex={0}/>
      <Menu/>
    </Box>
  )
}
