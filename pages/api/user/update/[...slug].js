import firebaseadmin from "../../firebaseadmin";

export default async (req,res) => {
  const {slug} = req.query;
  const uid = slug[0];
  const rawUserdata = slug[1];
  const userdata = JSON.parse(rawUserdata);

  const db = firebaseadmin.firestore();

  await db.collection("chefs").doc(uid).set({
    uid,
    status: 0,
    ...userdata
  }, {merge: true});

  return res.status(200)
}