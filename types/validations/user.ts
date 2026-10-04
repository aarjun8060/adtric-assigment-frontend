import { z } from "zod";

export const userDetailsSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be at most 100 characters")
    .trim(),
  birthDate: z.date({
    required_error: "Birth date is required",
  }),
  birthTime: z.string().min(1, "Birth time is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
  }),
  birthPlace: z.object({
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    latitude: z.number(),
    longitude: z.number(),
  }),
});

export type UserDetailsSchema = z.infer<typeof userDetailsSchema>;
