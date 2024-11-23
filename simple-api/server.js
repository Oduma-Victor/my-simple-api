const express = require("express"); // Import Express
const app = express(); // Create an Express application
const PORT = 3000; // Define the port number

// Middleware to parse JSON data
app.use(express.json());

// Initial list of users (in-memory data)
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// Route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Simple User API!");
});

// GET endpoint: Fetch the list of users
app.get("/users", (req, res) => {
  res.json(users); // Send users as JSON
});

// POST endpoint: Add a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  // Error handling for missing fields
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required!" });
  }

  // Create a new user and add to the list
  const newUser = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser); // Respond with the new user
});

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
