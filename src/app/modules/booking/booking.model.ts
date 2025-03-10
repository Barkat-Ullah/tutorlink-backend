import mongoose, { Schema } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema: Schema<IBooking> = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tutorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    dateTime: { type: Date, required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model<IBooking>("Booking", bookingSchema);

export default BookingModel;
