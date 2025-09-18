require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

// 🔗 MongoDB connection URI
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
app.use(cors({ origin: "*" }));


let todosCollection;

// ✅ Connect to MongoDB first
async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    // Database: todoDB, Collection: todos
    const db = client.db("todoDB");
    todosCollection = db.collection("todos");

    // Start Express server after DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

connectDB();

// ================= Routes =================

// ✅ Get all todos
app.get("/todos", async (req, res) => {
  const todos = await todosCollection.find().toArray();
  res.json(todos);
});

// ✅ Add new todo
app.post("/todos", async (req, res) => {
  const { task, status = "pending" } = req.body;
  const result = await todosCollection.insertOne({ task, status });
  res.status(201).json({ _id: result.insertedId, task, status });
});

// ✅ Update a todo (PUT)
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { task, status } = req.body;

  try {
    const result = await todosCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { task, status } },
      { returnDocument: "after" }
    );

    if (!result) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.value);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

// ✅ Delete a todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await todosCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.value);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});
