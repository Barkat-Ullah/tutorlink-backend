// division.controller.js
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { divisionService } from "./division.service";

const getAllDivision = catchAsync(async (req, res) => {
  const result = await divisionService.getAllDivisions();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Divisions retrieved successfully",
    data: result,
  });
});

export const divisionController = { getAllDivision };
