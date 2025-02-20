// backend/server.js - Main entry point for the Node.js backend

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const assetRoutes = require("./routes/assetRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const businessRoutes = require("./routes/businessRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const authRoutes = require("./routes/authRoutes");
const { verifyToken } = require("./middlewares/authMiddleware");
const businessController = require("./controllers/businessController");
const transactionController = require("./controllers/transactionController");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
db.connect(err => {
    if (err) {
        console.error("Database connection failed: ", err);
        process.exit(1);
    }
    console.log("Connected to MySQL database");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", verifyToken, userRoutes);
app.use("/api/assets", verifyToken, assetRoutes);
app.use("/api/properties", verifyToken, propertyRoutes);
app.use("/api/businesses", verifyToken, businessRoutes);
app.use("/api/transactions", verifyToken, transactionRoutes);

// Business Routes
app.get("/api/businesses", verifyToken, businessController.getBusinesses);
app.post("/api/businesses", verifyToken, businessController.addBusiness);
app.put("/api/businesses/:id", verifyToken, businessController.updateBusiness);
app.delete("/api/businesses/:id", verifyToken, businessController.deleteBusiness);

// Transaction Routes
app.get("/api/transactions", verifyToken, transactionController.getTransactions);
app.post("/api/transactions", verifyToken, transactionController.addTransaction);
app.put("/api/transactions/:id", verifyToken, transactionController.updateTransaction);
app.delete("/api/transactions/:id", verifyToken, transactionController.deleteTransaction);

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to the Family Financial Management API");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
