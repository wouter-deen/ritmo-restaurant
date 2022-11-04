import firebaseadmin from "../firebaseadmin";

export default async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const {idToken, itemID, data} = req.body;

    const db = firebaseadmin.firestore();
    try {
      firebaseadmin.auth()
        .verifyIdToken(idToken)
        .then(async () => {
          const ordersRef = db.doc(`products/${itemID}`);
          if(data.quantity) {
            await ordersRef.update({
              quantity: firebaseadmin.firestore.FieldValue.increment(parseInt(data.quantity))
            })
          } else if(data.unitPrice) {
            await ordersRef.update({unitPrice: parseFloat(data.unitPrice)})
          }

          res.status(200).json({status: 200});
          return resolve();
        })
    } catch (e) {
      res.status(403);
      console.log(e);
      return reject();
    }
  })
}