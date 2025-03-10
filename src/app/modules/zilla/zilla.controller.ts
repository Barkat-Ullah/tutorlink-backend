// division.controller.js
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { districtService } from "./zilla.service";

const getAllDistrict = catchAsync(async (req, res) => {
  const result = await districtService.getAllDistricts();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "District retrieved successfully",
    data: result,
  });
});

export const districtController = { getAllDistrict };
