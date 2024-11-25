import { z } from "zod";

export const certificationSchema = z.object({
  name: z.string().min(1, "Certification name is required"),
  issuedBy: z.string().min(1, "Issuing organization is required"),
  issueDate: z.string().min(1, "Issue date is required")
});

export const coachRequestSchema = z.object({
  experience: z.string().min(1, "Experience is required"),
  availability: z.string().min(1, "Availability is required"),
  specialization: z.string().min(1, "Specialization is required"),
  certifications: z.array(certificationSchema).min(1, "At least one certification is required")
});

export type CoachRequest = z.infer<typeof coachRequestSchema>;
export type Certification = z.infer<typeof certificationSchema>;
