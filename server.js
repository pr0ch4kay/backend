require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const reviewRoutes = require("./routes/review.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);

const start = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

start();
