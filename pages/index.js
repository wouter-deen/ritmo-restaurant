import React from "react";
import NavBar from "@/components/NavBar";
import Promotion from "@/components/Promotion";
import {Box, Divider} from "@chakra-ui/react";
import Menu from "@/components/Menu/Menu";
import {Host} from "@/lib/host";

export default function Home({ssrItems}) {

  return (
    <Box bg="gray.50" minH="100vh">
      <NavBar/>
      <Promotion/>
      <Divider zIndex={0}/>
      <Menu ssrItems={ssrItems}/>
    </Box>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${Host()}/api/getProducts`);
  const ssrItems = await res.json();

  return {
    props: {
      ssrItems
    },
    revalidate: 60,
  }
}