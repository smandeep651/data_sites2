import mongoose from "mongoose";

const projectSiteSchema = new mongoose.Schema({
  project_name: { type: String, required: true },
  city: { type: String, required: true },
  general_contractor: { type: String, required: true },
  completion_date: { type: Number, required: true },
  status: { type: String, required: true },
  employees_for_project: [{ type: String }],
  managed_by: { type: Map, of: String }, // Storing as a Map object
});

const ProjectSite = mongoose.model("ProjectSite", projectSiteSchema);
export default ProjectSite;
