import { z } from "zod";
import { AvailableDays, AvailableTimeSlots } from "./tutor.constants";

// Helper schema for ObjectId validation
const objectIdSchema = z
  .string()
  .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
    message: "Invalid ObjectId format",
  });

// Fix for the enum validation - use string with refinement instead
const availabilitySchema = z.object({
  day: z.string().refine((val) => AvailableDays.includes(val), {
    message: `Day must be one of: ${AvailableDays.join(", ")}`,
  }),
  timeSlots: z
    .array(
      z.string().refine((val) => AvailableTimeSlots.includes(val), {
        message: `Time slot must be one of: ${AvailableTimeSlots.join(", ")}`,
      })
    )
    .nonempty({ message: "At least one time slot is required" }),
});

// Create Tutor Schema
export const createTutorSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(100),
  email: z.string().email({ message: "Invalid email format" }),
  phone: z.string().regex(/^(\+?88)?01[3-9]\d{8}$/, {
    message: "Phone number must be a valid Bangladeshi number",
  }),
  bio: z
    .string()
    .min(50, { message: "Bio must be at least 50 characters" })
    .max(1000),
  division: objectIdSchema,
  district: objectIdSchema,
  area: z.string().optional(),
  subjects: z
    .array(objectIdSchema)
    .nonempty({ message: "At least one subject is required" }),
  monthlyRate: z
    .number()
    .positive({ message: "Monthly rate must be positive" }),
  experience: z
    .number()
    .int()
    .nonnegative({ message: "Experience must be a non-negative integer" }),
  education: z
    .string()
    .min(5, { message: "Education details must be at least 5 characters" }),
  availability: z.array(availabilitySchema).nonempty({
    message: "At least one availability slot is required",
  }),
  // Fields that are typically set by the system, not by user input
  rating: z.number().optional(),
  totalReviews: z.number().optional(),
  logo: z.string().optional(),
  user: objectIdSchema.optional(), // This will be set from the auth token
  isVerified: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

// Update Tutor Schema - all fields are optional
export const updateTutorSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(100)
    .optional(),
  email: z.string().email({ message: "Invalid email format" }).optional(),
  phone: z
    .string()
    .regex(/^(\+?88)?01[3-9]\d{8}$/, {
      message: "Phone number must be a valid Bangladeshi number",
    })
    .optional(),
  bio: z
    .string()
    .min(50, { message: "Bio must be at least 50 characters" })
    .max(1000)
    .optional(),
  division: objectIdSchema.optional(),
  district: objectIdSchema.optional(),
  area: z.string().optional(),
  subjects: z
    .array(objectIdSchema)
    .nonempty({ message: "At least one subject is required" })
    .optional(),
  monthlyRate: z
    .number()
    .positive({ message: "Monthly rate must be positive" })
    .optional(),
  experience: z
    .number()
    .int()
    .nonnegative({ message: "Experience must be a non-negative integer" })
    .optional(),
  education: z
    .string()
    .min(5, { message: "Education details must be at least 5 characters" })
    .optional(),
  availability: z
    .array(availabilitySchema)
    .nonempty({
      message: "At least one availability slot is required",
    })
    .optional(),
  // Fields that are typically set by the system, not by user input
  rating: z.number().optional(),
  totalReviews: z.number().optional(),
  logo: z.string().optional(),
  isVerified: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

// Type inference
export type CreateTutorInput = z.infer<typeof createTutorSchema>;
export type UpdateTutorInput = z.infer<typeof updateTutorSchema>;
