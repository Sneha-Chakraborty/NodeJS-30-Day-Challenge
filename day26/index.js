const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://127.0.0.1/db26feb'; // MongoDB connection URI
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('db-26-feb');
    const collection = database.collection('Products');

    // Insert some sample products
    await collection.insertMany([
      { name: 'Product 1', price: 10, quantity: 100 },
      { name: 'Product 2', price: 20, quantity: 50 },
      { name: 'Product 3', price: 30, quantity: 200 },
    ]);

    // Execute aggregation pipeline
    const pipeline = [
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: "$price" },
          highestQuantity: { $max: "$quantity" }
        }
      }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    console.log(result);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
