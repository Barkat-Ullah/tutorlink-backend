import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import User from "../user/user.model";
import { ITutor } from "./tutor.interface";
import { TutorModel } from "./tutor.model";
import mongoose from "mongoose";
import { IJwtPayload } from "../auth/auth.interface";
import { IImageFile } from "../../interface/IImageFile";
import { checkAvailabilityConflict } from "./tutor.utils";
import QueryBuilder from "../../builder/QueryBuilder";
import { TutorSearchableFields } from "./tutor.constants";
import jwt from 'jsonwebtoken';

export const TutorService = {
  async createTutor(data: ITutor, authUser: IJwtPayload) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Verify if the user exists
      const existingUser = await User.findById(authUser.userId).session(
        session
      );
      if (!existingUser) {
        throw new AppError(StatusCodes.NOT_ACCEPTABLE, "User does not exist!");
      }

      if (!existingUser.isActive) {
        throw new AppError(StatusCodes.NOT_ACCEPTABLE, "User is not active!");
      }

      // Check if the user is already a tutor
      if (existingUser.role === "tutor") {
        throw new AppError(StatusCodes.BAD_REQUEST, "User is already a tutor!");
      }
      const conflictCheck = await checkAvailabilityConflict(data.availability);

      if (conflictCheck.hasConflict) {
        throw new AppError(
          StatusCodes.CONFLICT,
          `Time conflict detected for ${
            conflictCheck.conflictingSlots?.day
          } at ${conflictCheck.conflictingSlots?.timeSlots.join(
            ", "
          )}. Another tutor is already scheduled for this time.`
        );
      }
      const tutorData = { ...data };
      const tutor = new TutorModel({
        ...tutorData,
        user: existingUser._id,
      });

      const createdTutor = await tutor.save({ session });

      await User.findByIdAndUpdate(
        existingUser._id,
        { role: "tutor" },
        { new: true, session }
      );
     const payload = {
       userId: existingUser._id,
       email: existingUser.email,
       role: "tutor",
     };

    

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      return createdTutor;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  async getAllTutors(query: Record<string, unknown>) {
    const TutorQuery = new QueryBuilder(
      TutorModel.find()
        .populate("subjects")
        .populate("division")
        .populate("district")
        .populate("user", "name email"),
      query
    )
      .search(TutorSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await TutorQuery.modelQuery;
    const meta = await TutorQuery.countTotal();

    return {
      result,
      meta,
    };
  },

  async getTutorById(id: string) {
    const tutor = await TutorModel.findById(id)
      .populate("subjects")
      .populate("division")
      .populate("district")
      .populate("user", "name email");

    if (!tutor) {
      throw new AppError(StatusCodes.NOT_FOUND, "Tutor not found!");
    }

    return tutor;
  },

  async updateTutor(id: string, updates: Partial<ITutor>) {
    // If availability is being updated, check for conflicts
    if (updates.availability) {
      const conflictCheck = await checkAvailabilityConflict(
        updates.availability,
        id
      );

      if (conflictCheck.hasConflict) {
        throw new AppError(
          StatusCodes.CONFLICT,
          `Time conflict detected for ${
            conflictCheck.conflictingSlots?.day
          } at ${conflictCheck.conflictingSlots?.timeSlots.join(
            ", "
          )}. Another tutor is already scheduled for this time.`
        );
      }
    }

    return await TutorModel.findByIdAndUpdate(id, updates, { new: true });
  },
async myTutorProfile(authUser: IJwtPayload) {
  const user = await User.findById(authUser.userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
  }

  if (!user.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User is not active!");
  }

  // Check if the user is a tutor
  if (user.role !== "tutor") {
    throw new AppError(StatusCodes.FORBIDDEN, "Access denied! Not a tutor.");
  }

  // Find tutor profile with populated fields
  const profile = await TutorModel.findOne({ user: user._id })
    .populate("subjects") 
    .populate("division") 
    .populate("district") 
    .populate("user", "name email");

  if (!profile) {
    throw new AppError(StatusCodes.NOT_FOUND, "Tutor profile not found!");
  }

  return profile;
},

  async deleteTutor(id: string) {
    return await TutorModel.findByIdAndDelete(id);
  },
};
