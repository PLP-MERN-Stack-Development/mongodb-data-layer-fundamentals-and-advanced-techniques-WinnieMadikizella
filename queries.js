// Import MongoDB
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://MERNStack:Mandela2200@cluster0.yz33t1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // 1. Find all books in a specific genre
    console.log("Fiction Books:");
    console.log(await books.find({ genre: "Fiction" }).toArray());

    // 2. Find books published after a certain year
    console.log("Books after 2010:");
    console.log(await books.find({ published_year: { $gt: 2010 } }).toArray());

    // 3. Find books by a specific author
    console.log("Books by Paulo Coelho:");
    console.log(await books.find({ author: "Paulo Coelho" }).toArray());

    // 4. Update price of a specific book
    await books.updateOne({ title: "The Alchemist" }, { $set: { price: 17 } });
    console.log("Updated The Alchemist price");

    // 5. Delete a book by title
    await books.deleteOne({ title: "Becoming" });
    console.log("Deleted Becoming");

  } finally {
    await client.close();
  }
}

run();

// In-stock and published after 2010:
await books.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray();

// Projection (only title, author, price):
await books.find({}, { projection: { title: 1, author: 1, price: 1 } }).toArray();

// Sorting:
await books.find().sort({ price: 1 }).toArray();  // Ascending
await books.find().sort({ price: -1 }).toArray(); // Descending

// Pagination (5 per page):
await books.find().skip(0).limit(5).toArray(); // Page 1
await books.find().skip(5).limit(5).toArray(); // Page 2

// Aggregations
// Average price by genre
await books.aggregate([{ $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }]).toArray();

// Author with most books
await books.aggregate([{ $group: { _id: "$author", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 1 }]).toArray();

// Group by decade
await books.aggregate([
  { $project: { decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]).toArray();

// Indexing
// Create index on title
await books.createIndex({ title: 1 });

// Compound index on author + published_year
await books.createIndex({ author: 1, published_year: -1 });

// Use explain()
console.log(await books.find({ title: "1984" }).explain("executionStats"));
