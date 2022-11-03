import React from "react";
import NavBar from "@/components/NavBar";
import Promotion from "@/components/Promotion";
import {Box, Divider} from "@chakra-ui/react";
import Menu from "@/components/Menu/Menu";

export default function Home() {
  return (
    <Box bg="gray.50" minH="100vh">
      <NavBar/>
      <Promotion/>
      <Divider zIndex={0}/>
      <Menu/>
    </Box>
  )
}