
import type { Types } from "mongoose";

export interface ITutor {
  name: string;
  email: string;
  phone: string;
  bio: string;
  division: Types.ObjectId;
  district: Types.ObjectId;
  area?: string;
  subjects: Types.ObjectId[];
  monthlyRate: number;
  experience: number;
  education: string;
  availability: {
    day: string;
    timeSlots: string[];
  }[];
  rating: number;
  totalReviews: number;
  logo?: string;
  user: Types.ObjectId;
  isVerified: boolean;
  isActive: boolean;
}


