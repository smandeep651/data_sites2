import { MongoClient } from 'mongodb';
import fs from 'fs';

async function importData() {
  const uri = "mongodb+srv://smandeep0209:newpass@cluster0.hqdkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const database = client.db("construction_projects");
    const collection = database.collection("project_sites");

    // Read JSON file
    const data = JSON.parse(fs.readFileSync("data_sites.json", "utf8"));

    // Insert data into MongoDB
    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents were inserted`);
  } catch (err) {
    console.error("Error during import:", err);
  } finally {
    await client.close();
  }
}

importData();
