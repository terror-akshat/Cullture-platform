const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());
app.use(express.static("public"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cultures", require("./routes/cultures"));
app.use("/api/quiz", require("./routes/quiz"));

// Home Route
app.get("/", (req, res) => {
  res.json({ message: "Cultural Platform API" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});