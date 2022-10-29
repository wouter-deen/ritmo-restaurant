import {Box, Heading} from "@chakra-ui/react";
import useSWR from "swr";
import MenuItem from "@/components/Menu/MenuItem";
import {Host} from "@/lib/host";

export default function Menu() {
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const {data: items} = useSWR(() => `${Host()}/api/getProducts`, fetcher);

  return (
    <Box p={4}>
      <Heading fontFamily="Merriweather" fontWeight={900}>What&apos;s cookin&apos;?</Heading>
      {items && (items[2]?.quantity > 0 || items[3]?.quantity > 0 || items[4]?.quantity > 0) &&
        <MenuItem name="Neapolitan Pizza"
                  img="/pizza.png"
                  pic="/pizza_pic.jpg"
                  selectTitle="Choose your pizza"
                  selectOptions={[
                    {name: "Margherita", itemID: 2},
                    {name: "Pepperoni", itemID: 3},
                    {name: "Caprese", itemID: 4}
                  ]}
                  price={11.99}
                  bottomOffset={4}
                  descr="Neapolitan-style pizzas, freshly baked in our stone ovens by our Italian chefs. Customize to your liking!"
        />
      }

      {items && items[0].quantity > 0 &&
        <MenuItem name="Farmer's Fries"
                  img="/fries.png"
                  pic="/fries_pic.jpg"
                  radioTitle="Pick a sauce"
                  radioOptions={[
                    {name: "Mayonnaise", itemIDs: [0,6]},
                    {name: "Satay sauce", itemIDs: [0,7]},
                    {name: "Curry ketchup", itemIDs: [0,5]},
                    {name: "No sauce", itemIDs: [0]}
                  ]}
                  price={3.99}
                  bottomOffset={-3}
                  descr="Chunky potato fries with skin. Hand-cut with love and sprinkled with a pinch of Baltic sea salt."
        />
      }

      {items && items[1].quantity > 0 &&
        <MenuItem name="Granny's Pancakes"
                  img="/pancakes.png"
                  pic="/pancakes_pic.jpg"
                  price={8.99}
                  bottomOffset={-2}
                  descr="Fluffy American pancakes, made from a recipe that's rumoured to be older than mankind. Topped with maple syrup and fresh blueberries."
        />
      }

    </Box>
  )
}