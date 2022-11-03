import firebaseadmin from "../../firebaseadmin";

export default async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const {slug} = req.query;
    const type = slug[0];
    const idToken = slug[1];
    const allOrders = [];

    const db = firebaseadmin.firestore();
    try {
      firebaseadmin.auth()
        .verifyIdToken(idToken)
        .then(async () => {
          let ordersRef;
          if(type === "active") {
            ordersRef = db.collection("order")
              .where("status", "<", 2)
              .orderBy("status", "desc")
              .orderBy("timestamp", "asc");
          } else if(type === "finished") {
            ordersRef = db.collection("order")
              .where("status", ">=", 2)
              .orderBy("status", "desc")
              .orderBy("timestamp", "desc");
          }

          ordersRef.get().then(async (documents) => {
            documents.forEach((doc) => {
              if (doc.data()) {
                const data = doc.data();
                allOrders.push({
                  orderID: doc.id,
                  items: data.items,
                  timestamp: data.timestamp.toDate(),
                  status: data.status
                });
              }
            })
            res.status(200).json(allOrders);
            return resolve();
          })
        })
    } catch (e) {
      res.status(403);
      console.log(e);
      return reject();
    }
  })
}