import { z } from "zod";

export const siteSchema = z.object({
  name: z.string().min(3, "Site name must be at least 3 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  manager: z.string().optional(), // Optional field
});
