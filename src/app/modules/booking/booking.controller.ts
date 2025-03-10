import { Request, Response } from "express";
import { IBooking } from "./booking.interface";
import { BookingService } from "./booking.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

export const createBooking = catchAsync(async (req: Request, res: Response) =>
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Booking created successfully",
    data: await BookingService.createBooking(req.body),
  })
);

export const getBookingByIds = catchAsync(async (req: Request, res: Response) =>
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking retrieved successfully",
    data: await BookingService.getBookingById(req.params.id),
  })
);

export const updateBooking = catchAsync(async (req: Request, res: Response) =>
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking updated successfully",
    data: await BookingService.updateBooking(req.params.id, req.body),
  })
);

export const deleteBooking = catchAsync(async (req: Request, res: Response) =>
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking deleted successfully",
    data: await BookingService.deleteBooking(req.params.id),
  })
);

export const getAllBookings = catchAsync(async (req: Request, res: Response) =>
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All bookings retrieved successfully",
    data: await BookingService.getAllBookings(),
  })
);

export const getBookingsByStudentId = catchAsync(
  async (req: Request, res: Response) =>
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Bookings retrieved for the student",
      data: await BookingService.getBookingsByStudentId(req.params.studentId),
    })
);

export const getBookingsByTutorId = catchAsync(
  async (req: Request, res: Response) =>
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Bookings retrieved for the tutor",
      data: await BookingService.getBookingsByTutorId(req.params.tutorId),
    })
);

export const updateBookingStatus = catchAsync(
  async (req: Request, res: Response) =>
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking status updated successfully",
      data: await BookingService.updateBookingStatus(
        req.params.id,
        req.body.status
      ),
    })
);

export const updateBookingPaymentStatus = catchAsync(
  async (req: Request, res: Response) =>
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking payment status updated successfully",
      data: await BookingService.updateBookingPaymentStatus(
        req.params.id,
        req.body.paymentStatus
      ),
    })
);

export const BookingController = {
  createBooking,
  getBookingByIds,
  updateBooking,
  deleteBooking,
  getAllBookings,
  getBookingsByStudentId,
  getBookingsByTutorId,
  updateBookingStatus,
  updateBookingPaymentStatus,
};
