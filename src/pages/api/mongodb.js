import { MongoClient } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://zyamura:0uDaRYX9Jbhi6CLZ@zyamura.ewpn9zp.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  return client.db("zyamura");
}
export default connectToDatabase;
