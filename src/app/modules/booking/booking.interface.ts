import { Document, Types } from "mongoose";

export interface IBooking extends Document {
  studentId: Types.ObjectId | string;
  tutorId: Types.ObjectId | string; 
  subjectId: Types.ObjectId | string;
  dateTime: Date;
  price: number;
  status: "pending" | "confirmed" | "completed" | "canceled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: Date;
  updatedAt: Date;
}
