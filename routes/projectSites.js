import express from "express";
import ProjectSite from "../models/ProjectSite.js";

const router = express.Router();

//  GET all project sites
router.get("/", async (req, res) => {
  try {
    const sites = await ProjectSite.find();
    console.log("Fetched Sites:", sites);
    res.json(sites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  GET a single site by ID
router.get("/:id", async (req, res) => {
  try {
    const site = await ProjectSite.findById(req.params.id);
    if (!site) return res.status(404).json({ message: "Project site not found" });
    res.json(site);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

//  POST: Create a new site
router.post("/", async (req, res) => {
  try {
    const site = new ProjectSite(req.body);
    const newSite = await site.save();
    res.status(201).json(newSite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//  PUT: Update a site by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedSite = await ProjectSite.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSite) return res.status(404).json({ message: "Project site not found" });
    res.json(updatedSite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


//  DELETE: Remove a site
router.delete("/:id", async (req, res) => {
  try {
    const result = await ProjectSite.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Project site not found" });
    res.json({ message: "Project site deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

export default router;
