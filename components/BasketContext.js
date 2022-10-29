import { createContext, useState } from 'react';

/**
 * @description Context to access and modify the shopping basket contents.
 * @property {Array} items - Get all items in basket
 * @property {item} addItem - Add item to basket
 * @property {item} removeItem - Remove item from basket
 * @property {Array} prices - Get vat, subtotal and total (.vat, .subtotal, .total)
 * */
const BasketContext = createContext([], () => {});

/**
 * @description Each item object inside the items array can have the following properties:
 * @property {string} name
 * @property {double} price
 * @property {int} quantity
 * @property {Array} itemIDs - IDs of all the items that imply this menu item (e.g., fries and mayonnaise are two separate items in the database)
 * @property {Array} options - The options specified in the ItemModal. These are just for the sake of convenience to the user, the actual options are tied to seperate itemIDs but this is easier than fetching the name of the options from the database each time for UI’s sake.
 * */
export const BasketProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (item) => setItems((oldArray) => [...oldArray, item]);
  const removeItem = (item) => {
    let newContentArr = items;
    if (newContentArr.indexOf(item) > -1) {
      newContentArr.splice(index, 1);
    }
    setItems(newContentArr);
  }

  function CalculateTotal() {
    let total = 0;
    items.forEach((item) => total += (item.price * item.quantity));
    return Math.round(total * 100) / 100;
  }

  const CalculateSubtotal = () => Math.round(CalculateTotal() / 1.21 * 100) / 100;
  const CalculateVAT = () => Math.round((CalculateTotal() - CalculateSubtotal()) * 100) / 100;

  const prices = {subtotal: CalculateSubtotal(), total: CalculateTotal(), vat: CalculateVAT()}

  return (
    <BasketContext.Provider value={[items, addItem, removeItem, prices]}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContext;