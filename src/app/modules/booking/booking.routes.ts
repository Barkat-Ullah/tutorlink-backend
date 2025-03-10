import express from "express";
import { BookingController } from "./booking.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";

const router = express.Router();

router.get("/", BookingController.getAllBookings);
router.get("/:id", BookingController.getBookingByIds);
router.get(
  "/student/:studentId",
  auth(UserRole.STUDENT, UserRole.TUTOR),
  BookingController.getBookingsByStudentId
);
router.get(
  "/tutor/:tutorId",
  auth(UserRole.STUDENT, UserRole.TUTOR),
  BookingController.getBookingsByTutorId
);
router.post("/", auth(UserRole.STUDENT), BookingController.createBooking);
router.put(
  "/:id",
  auth(UserRole.STUDENT, UserRole.TUTOR),
  BookingController.updateBooking
);
router.delete(
  "/:id",
  auth(UserRole.STUDENT, UserRole.TUTOR),
  BookingController.deleteBooking
);
router.patch(
  "/:id/status",
  auth(UserRole.TUTOR),
  BookingController.updateBookingStatus
);
router.patch(
  "/:id/payment-status",
  auth(UserRole.STUDENT, UserRole.TUTOR),
  BookingController.updateBookingPaymentStatus
);

export default router;
