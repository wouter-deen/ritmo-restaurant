import firebaseadmin from "../firebaseadmin";

export default async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const {idToken, orderID, status} = req.body;

    const db = firebaseadmin.firestore();
    try {
      firebaseadmin.auth()
        .verifyIdToken(idToken)
        .then(async (decodedToken) => {
          const uid = decodedToken.uid;
          const ordersRef = db.doc(`order/${orderID}`);
          await ordersRef.update({
            status: status
          })

          const chefRef = db.doc(`chefs/${uid}`);
          await chefRef.update({
            status: status === 1 ? 1 : 0,
            orderID: orderID
          })
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