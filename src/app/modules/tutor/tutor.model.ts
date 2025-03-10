
import mongoose, { Schema, type Document } from "mongoose";
import type { ITutor } from "./tutor.interface";

const TutorSchema = new Schema<ITutor & Document>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },

    division: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Division",
      required: true,
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
    area: {
      type: String,
    },

    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
      },
    ],
    monthlyRate: {
      type: Number,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    availability: [
      {
        day: { type: String, required: true },
        timeSlots: { type: [String], required: true },
      },
    ],

    rating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    logo: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const TutorModel = mongoose.model<ITutor & Document>(
  "Tutor",
  TutorSchema
);
