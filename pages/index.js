import React from "react";
import NavBar from "@/components/NavBar";
import Promotion from "@/components/Promotion";
import {Box, Divider} from "@chakra-ui/react";
import Menu from "@/components/Menu/Menu";
import {Host} from "@/lib/host";
import firebaseadmin from "@/api/firebaseadmin";

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
  const db = firebaseadmin.firestore();

  const allProducts = [];
  try {
    const productsRef = db.collection("products");
    productsRef.get().then(async (documents) => {
      documents.forEach((doc) => {
        if (doc.data()) {
          allProducts.push(doc.data());
        }
      })
    })
  } catch (e) {
    throw e;
  }

  return {
    props: {
      ssrItems: allProducts
    },
    revalidate: 60,
  }
}