import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const schoolAdminLoginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const phoneLoginSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits"),
});

export const otpVerificationSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits"),
  otp: z.string().length(4, "OTP must be exactly 4 digits"),
});

export type AuthSchema = z.infer<typeof authSchema>;
export type SchoolAdminLoginSchema = z.infer<typeof schoolAdminLoginSchema>;
export type PhoneLoginSchema = z.infer<typeof phoneLoginSchema>;
export type OtpVerificationSchema = z.infer<typeof otpVerificationSchema>;
