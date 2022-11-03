import firebaseadmin from "../firebaseadmin";

export default async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const db = firebaseadmin.firestore();
    const orderID = req.query.orderID;
    try {
      const orderRef = db.doc(`order/${orderID}`);
      const order = (await orderRef.get()).data();
      if(order) {
        res.status(200).json({
          status: order.status,
          timestamp: order.timestamp
        });
      } else res.status(404).json({invalid: true});
      return resolve();
    } catch (e) {
      res.status(400).json(e)
      console.log(e)
      return reject();
    }
  })
}