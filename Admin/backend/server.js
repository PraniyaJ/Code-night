require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const articleRoutes = require("./routes/articleRoutes");
const authRoutes = require('./routes/auth');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/articles", articleRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
