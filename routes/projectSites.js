import express from "express";
import ProjectSite from "../models/ProjectSite.js";

const router = express.Router();

// GET all project sites
router.get("/", async (req, res) => {
  try {
    const sites = await ProjectSite.find();
    console.log("Fetched Sites:", sites);
    res.json(sites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single site by ID
router.get("/:id", async (req, res) => {
  try {
    const site = await ProjectSite.findById(req.params.id);
    if (!site) return res.status(404).json({ message: "Project site not found" });
    res.json(site);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

// POST: Create a new site
router.post("/", async (req, res) => {
  try {
    const { project_name, city, general_contractor, completion_date, status, employees_for_project, managed_by } = req.body;

    // Check for missing fields
    if (!project_name || !city || !general_contractor || !completion_date || !status) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Ensure completion_date is a valid date
    const validDate = new Date(completion_date);
    if (isNaN(validDate)) {
      return res.status(400).json({ message: 'Invalid completion date format' });
    }

    // Create a new site
    const site = new ProjectSite({
      project_name,
      city,
      general_contractor,
      completion_date: validDate,
      status,
      employees_for_project,
      managed_by,
    });

    const newSite = await site.save();
    res.status(201).json(newSite);
  } catch (err) {
    console.error("Error:", err);  // Log the error for debugging
    res.status(400).json({ message: err.message });
  }
});

// PUT: Update a site by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedSite = await ProjectSite.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSite) return res.status(404).json({ message: "Project site not found" });
    res.json(updatedSite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Remove a site
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
