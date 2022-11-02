import {Box, Heading, ScaleFade} from "@chakra-ui/react";
import MenuItem from "@/components/Menu/MenuItem";
import useSWR from "swr";
import {Host} from "@/lib/host";

export default function Menu() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {data: items} = useSWR(() => `${Host()}/api/getProducts`, fetcher, { refreshInterval: 5000 });

  return (
    <Box p={4}>
      <Heading fontFamily="Merriweather" fontWeight={900}>What&apos;s cookin&apos;?</Heading>
      {items?.length > 0 && (items[2]?.quantity > 10 || items[3]?.quantity > 10 || items[4]?.quantity > 10) &&
        <ScaleFade in={true}>
          <MenuItem name="Neapolitan Pizza"
                    descr="Neapolitan-style pizzas, freshly baked in our stone ovens by our Italian chefs. Customize to your liking!"
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
                    items={items}
          />
        </ScaleFade>
      }

      {items?.length > 0 && items[0].quantity > 10 &&
        <ScaleFade in={true}>
          <MenuItem name="Farmer's Fries"
                    descr="Chunky potato fries with skin. Hand-cut with love and sprinkled with a pinch of Baltic sea salt."
                    img="/fries.png"
                    pic="/fries_pic.jpg"
                    radioTitle="Pick a sauce"
                    radioOptions={[
                      {name: "Mayonnaise sauce", itemIDs: [0,6]},
                      {name: "Satay sauce", itemIDs: [0,7]},
                      {name: "Curry ketchup sauce", itemIDs: [0,5]},
                      {name: "No sauce", itemIDs: [0]}
                    ]}
                    price={3.99}
                    bottomOffset={-3}
                    items={items}
          />
        </ScaleFade>
      }

      {items?.length > 0 && items[1].quantity > 10 &&
        <ScaleFade in={true}>
          <MenuItem name="Granny's Pancakes"
                    descr="Fluffy American pancakes, made from a recipe that's rumoured to be older than mankind. Topped with maple syrup and fresh blueberries."
                    img="/pancakes.png"
                    pic="/pancakes_pic.jpg"
                    price={8.99}
                    bottomOffset={-2}
                    items={items}
                    itemID={1}
          />
        </ScaleFade>
      }

    </Box>
  )
}