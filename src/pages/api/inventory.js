import connectToDatabase from "./mongodb";

async function handler(req, res) {
  if (req?.method === "POST") {
    const data = req.body;
    const db = await connectToDatabase();
    const inventoryCollection = db.collection("inventory");

    await inventoryCollection.insertOne(data);

    db.close();
    res.status(201).json({ message: "inserted" });
  }
  if (req.method === "GET") {
    const db = await connectToDatabase();
    const inventoryCollection = db.collection("inventory");

    const data = await inventoryCollection.find().toArray();

    res.status(200).json(data);
    db.close();
  }
}

export default handler;
