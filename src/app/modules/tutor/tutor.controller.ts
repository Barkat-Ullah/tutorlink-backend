import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { TutorService } from "./tutor.service";
import { IJwtPayload } from "../auth/auth.interface";

const createTutors = catchAsync(async (req, res) => {
  const result = await TutorService.createTutor(
    req.body,
    req.user as IJwtPayload
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Tutors created successfully",
    data: result,
  });
});

const getAllTutor = catchAsync(async (req, res) => {
  const result = await TutorService.getAllTutors(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Tutors retrieved successfully",
    data: result,
  });
});
const getSingleTutor = catchAsync(async (req, res) => {
  const result = await TutorService.getTutorById(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Single Tutors retrieved successfully",
    data: result,
  });
});
const updateTutors = catchAsync(async (req, res) => {
  const result = await TutorService.updateTutor(req.params.id, req.body);
  console.log(result);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Tutors update successfully",
    data: result,
  });
});
const deleteTutors = catchAsync(async (req, res) => {
  const result = await TutorService.deleteTutor(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Tutors delete successfully",
    data: result,
  });
});

const myTutorProfile = catchAsync(async (req, res) => {
  const result = await TutorService.myTutorProfile(req.user as IJwtPayload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  });
});
export const TutorController = {
  createTutors,
  getAllTutor,
  getSingleTutor,
  updateTutors,
  deleteTutors,
  myTutorProfile,
};
