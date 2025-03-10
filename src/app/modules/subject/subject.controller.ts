// division.controller.js
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { subjectService } from "./sunject.services";

const getAllSubject = catchAsync(async (req, res) => {
  const result = await subjectService.getAllSubjects();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Subject retrieved successfully",
    data: result,
  });
});

export const subjectController = { getAllSubject };
