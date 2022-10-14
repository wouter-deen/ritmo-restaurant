import firebaseadmin from "./firebaseadmin";

export default async (req, res) => {
  return new Promise(async (resolve, reject) => {

    const db = firebaseadmin.firestore();
    try {
      const docRef = db.doc("products/002");
      docRef.get().then(async (doc) => {
        if (doc.data()) {
          const data = doc.data();
          res.status(200).json(data);
          return resolve();
        }
      })
      return resolve();
    } catch (e) {
      res.status(404).json(e)
      console.log(e)
      return reject();
    }
  })
}