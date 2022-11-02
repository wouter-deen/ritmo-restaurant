import firebaseadmin from "./firebaseadmin";
import getProducts from "@/api/getProducts";

export default async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const db = firebaseadmin.firestore();
    const {items, prices, email} = req.body;

    try {

      // Here the payment provider can be implemented. For now, we just assume that the payment was successful.
      const paymentSuccessful = true;

      if(!paymentSuccessful) {
        res.status(402);
        return reject();
      }

      await db.runTransaction(async (t) => {
        // Fetching all items from the database with their corresponding quantity (= inventory level)
        const itemsInDB = [];
        const productsRef = db.collection("products");
        const products = await t.get(productsRef);
        products.forEach((doc) => {
          if (doc.data()) {
            itemsInDB.push(doc.data());
          }
        })

        // Checking whether every item is in inventory (inventory level > 0), otherwise throw error.
        for(const item of items) {
          delete item.img; // The img is only useful for the frontend, so it doesn't have to be stored to the DB, and we delete it from the map.
          for(const itemID of item.itemIDs) {
            if(itemsInDB[itemID].quantity < item.quantity) {
              res.status(409);
              return reject();
            }

            // Deducting the order amount of each item from the quantity in the database
            const itemRef = db.doc(`products/${itemID}`);
            t.update(itemRef, {
              quantity: itemsInDB[itemID].quantity - item.quantity
            })
          }
        }

        const date = new Date();

        const orderRef = db.collection("order").doc();
        await t.set(orderRef, {
          items: items,
          email: email,
          prices: prices,
          paymentMethod: "iDeal",
          timestamp: date
        })

        res.status(201).json({status: 201, orderID: orderRef.id});
        return resolve();
      })
    } catch (e) {
      res.status(400).json(e)
      console.log(e)
      return reject();
    }
  })
}