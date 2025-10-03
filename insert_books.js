const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://MERNStack:Mandela2200@cluster0.yz33t1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas!");

    const database = client.db("plp_bookstore");
    const books = database.collection("books");

    const sampleBooks = [
  { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", published_year: 1988, price: 15, in_stock: true, pages: 208, publisher: "HarperCollins" },
  { title: "Atomic Habits", author: "James Clear", genre: "Self-help", published_year: 2018, price: 20, in_stock: true, pages: 320, publisher: "Penguin" },
  { title: "Becoming Supernatural", author: "Joe Dispenza", genre: "Spirituality", published_year: 2017, price: 19, in_stock: true, pages: 384, publisher: "Hay House" },
  { title: "Failing Forward", author: "John C. Maxwell", genre: "Motivation", published_year: 2000, price: 18, in_stock: true, pages: 240, publisher: "Thomas Nelson" },
  { title: "The First 90 Days", author: "Michael D. Watkins", genre: "Business", published_year: 2013, price: 22, in_stock: true, pages: 304, publisher: "Harvard Business Review Press" },
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", genre: "Finance", published_year: 1997, price: 12, in_stock: true, pages: 336, publisher: "Warner Books" },
  { title: "The Lean Startup", author: "Eric Ries", genre: "Business", published_year: 2011, price: 19, in_stock: true, pages: 336, publisher: "Crown" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", genre: "Psychology", published_year: 2011, price: 21, in_stock: true, pages: 499, publisher: "Farrar, Straus and Giroux" },
  { title: "The Power of Now", author: "Eckhart Tolle", genre: "Spirituality", published_year: 1997, price: 14, in_stock: true, pages: 236, publisher: "New World Library" },
  { title: "Becoming", author: "Michelle Obama", genre: "Biography", published_year: 2018, price: 25, in_stock: false, pages: 448, publisher: "Crown" }
 ];

    const result = await books.insertMany(sampleBooks);
    console.log(`${result.insertedCount} books inserted!`);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

run();
