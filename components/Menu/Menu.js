import MenuItem from "@/components/Menu/MenuItem";
import {Box, Heading} from "@chakra-ui/react";

export default function Menu() {
  return (
    <Box p={4}>
      <Heading fontFamily="Merriweather" fontWeight={900}>What&apos;s cookin&apos;?</Heading>
      <MenuItem name="Neapolitan Pizza"
                img="/pizza.png"
                pic="/pizza_pic.jpg"
                selectTitle="Choose your pizza"
                selectOptions={["Margherita", "Pepperoni", "Caprese"]}
                price={11.99}
                bottomOffset={4}
                descr="Neapolitan-style pizzas, freshly baked in our stone ovens by our Italian chefs. Customize to your liking!"
      />
      <MenuItem name="Farmer's Fries"
                img="/fries.png"
                pic="/fries_pic.jpg"
                radioTitle="Pick a sauce"
                radioOptions={["Mayonnaise", "Satay sauce", "Curry"]}
                price={3.99}
                bottomOffset={-3}
                descr="Chunky potato fries with skin. Hand-cut with love and sprinkled with a pinch of Baltic sea salt."
      />
      <MenuItem name="Granny's Pancakes"
                img="/pancakes.png"
                pic="/pancakes_pic.jpg"
                price={8.99}
                bottomOffset={-2}
                descr="Fluffy American pancakes, made from a recipe that's rumoured to be older than mankind. Topped with maple syrup and fresh blueberries."/>
    </Box>
  )
}