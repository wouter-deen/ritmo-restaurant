import firebaseadmin from "./firebaseadmin";

export default async (req, res) => {
  return new Promise(async (resolve, reject) => {

    const db = firebaseadmin.firestore();
    const allDocuments = [];
    try {
      const productsRef = db.collection("products");
      productsRef.get().then(async (documents) => {
        documents.forEach((doc) => {
          if (doc.data()) {
            allDocuments.push(doc.data());
          }
        })
        res.status(200).json(allDocuments);
        return resolve();
      })
    } catch (e) {
      res.status(404).json(e)
      console.log(e)
      return reject();
    }
  })
}