const express = require("express");
const cors = require("cors");
require("dotenv").config();

const todoRoutes = require("./routes/todo");

const connectDB = require("./config/db");

const app = express();

connectDB();


const authRoutes = require("./routes/auth");


const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:5500",
    "https://todo-appf.netlify.app"
  ],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
    res.send("Server Running ");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});