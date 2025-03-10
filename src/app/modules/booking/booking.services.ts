import mongoose from "mongoose";
import { IBooking } from "./booking.interface";
import User from "../user/user.model";
import { Subject } from "../subject/subject.model";
import BookingModel from "./booking.model";

export const createBooking = async (
  bookingData: Omit<
    IBooking,
    "status" | "paymentStatus" | "createdAt" | "updatedAt"
  >
): Promise<IBooking> => {
  // Validate tutor and student exist and are of correct roles
  const tutor = await User.findById(bookingData.tutorId);
  if (!tutor || tutor.role !== "tutor") {
    throw new Error("Invalid Tutor ID or Tutor role");
  }
  const student = await User.findById(bookingData.studentId);
  if (!student || student.role !== "student") {
    throw new Error("Invalid Student ID or Student role");
  }
  // Validate subject exists
  const subject = await Subject.findById(bookingData.subjectId);
  if (!subject) {
    throw new Error("Invalid Subject ID");
  }

  const booking = new BookingModel(bookingData);
  return booking.save();
};

const getBookingById = async (bookingId: string): Promise<IBooking | null> => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error("Invalid Booking ID format");
  }
  return BookingModel.findById(bookingId).populate(
    "studentId tutorId subjectId"
  );
};

const updateBooking = async (
  bookingId: string,
  updateData: Partial<IBooking>
): Promise<IBooking | null> => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error("Invalid Booking ID format");
  }
  return BookingModel.findByIdAndUpdate(bookingId, updateData, {
    new: true,
  }).populate("studentId tutorId subjectId");
};

const deleteBooking = async (bookingId: string): Promise<IBooking | null> => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error("Invalid Booking ID format");
  }
  return BookingModel.findByIdAndDelete(bookingId).populate(
    "studentId tutorId subjectId"
  );
};

export const getAllBookings = async (): Promise<IBooking[]> => {
  return BookingModel.find().populate("studentId tutorId subjectId");
};

const getBookingsByStudentId = async (
  studentId: string
): Promise<IBooking[]> => {
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    throw new Error("Invalid Student ID format");
  }
  const student = await User.findById(studentId);
  if (!student || student.role !== "student") {
    throw new Error("Invalid Student ID or Student role");
  }
  return BookingModel.find({ studentId: studentId }).populate(
    "studentId tutorId subjectId"
  );
};

const getBookingsByTutorId = async (tutorId: string): Promise<IBooking[]> => {
  if (!mongoose.Types.ObjectId.isValid(tutorId)) {
    throw new Error("Invalid Tutor ID format");
  }
  const tutor = await User.findById(tutorId);
  if (!tutor || tutor.role !== "tutor") {
    throw new Error("Invalid Tutor ID or Tutor role");
  }
  return BookingModel.find({ tutorId: tutorId }).populate(
    "studentId tutorId subjectId"
  );
};
const updateBookingStatus = async (
  bookingId: string,
  status: IBooking["status"]
): Promise<IBooking | null> => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error("Invalid Booking ID format");
  }
  if (!["pending", "confirmed", "completed", "canceled"].includes(status)) {
    throw new Error("Invalid booking status value");
  }
  return BookingModel.findByIdAndUpdate(
    bookingId,
    { status },
    { new: true }
  ).populate("studentId tutorId subjectId");
};
const updateBookingPaymentStatus = async (
  bookingId: string,
  paymentStatus: IBooking["paymentStatus"]
): Promise<IBooking | null> => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error("Invalid Booking ID format");
  }
  if (!["pending", "paid", "failed", "refunded"].includes(paymentStatus)) {
    throw new Error("Invalid booking payment status value");
  }
  return BookingModel.findByIdAndUpdate(
    bookingId,
    { paymentStatus },
    { new: true }
  ).populate("studentId tutorId subjectId");
};

export const BookingService = {
  createBooking,
  updateBooking,
  deleteBooking,
  getAllBookings,
  getBookingsByStudentId,
  getBookingsByTutorId,
  updateBookingStatus,
  updateBookingPaymentStatus,
  getBookingById,
};
