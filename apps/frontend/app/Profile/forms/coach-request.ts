import { z } from "zod";

export const certificationSchema = z.object({
  name: z.string().min(1, "Certification name is required"),
  issuedBy: z.string().min(1, "Issuing organization is required"),
  issueDate: z.string().min(1, "Issue date is required")
});

export const coachRequestSchema = z.object({
  experience: z.string().min(1, "Experience is required"),
  specialization: z
    .enum(["weightlifting", "resistance training", "cardio", "yoga", "pilates", "crossfit", "hiit", "functional training", "boxing", "martial arts"])
    .transform((val) => val.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
    ),
  certifications: z.array(certificationSchema).min(1, "At least one certification is required"),
});


export type CoachRequest = z.infer<typeof coachRequestSchema>;
export type Certification = z.infer<typeof certificationSchema>;

