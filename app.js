import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import projectSitesRoutes from "./routes/projectSites.js";

dotenv.config();

const app = express();
const port = process.env.PORT 

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
console.log(" MongoDB URI:", process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));
  
// Routes
app.use("/api/project_sites", (req, res, next) => {
  console.log("🔹 API /api/project_sites called");
  next();
}, projectSitesRoutes);


app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
