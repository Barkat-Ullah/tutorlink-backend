import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
  },
  category: {
    type: String,
    required: true,
    enum: ["General", "Madrasha"],
  },
  gradeLevel: {
    type: [String], 
    required: true,
  },
  description: {
    type: String,
  },
});

export const Subject = mongoose.model("Subject", subjectSchema);
