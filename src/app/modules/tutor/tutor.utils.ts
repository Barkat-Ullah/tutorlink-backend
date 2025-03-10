import { Types } from "mongoose";
import { TutorModel } from "./tutor.model";

export const checkAvailabilityConflict = async (
  availability: { day: string; timeSlots: string[] }[] | undefined,
  tutorId?: Types.ObjectId | string
) => {
  // Ensure availability is an array
  if (!Array.isArray(availability)) {
    console.error("Availability is not an array:", availability);
    return { hasConflict: false };
  }

  const excludeTutorFilter = tutorId ? { _id: { $ne: tutorId } } : {};

  for (const slot of availability) {
    // Ensure it's iterable
    const existingTutors = await TutorModel.find({
      ...excludeTutorFilter,
      "availability.day": slot.day,
      "availability.timeSlots": { $in: slot.timeSlots },
    });

    if (existingTutors.length > 0) {
      return {
        hasConflict: true,
        conflictingSlots: {
          day: slot.day,
          timeSlots: slot.timeSlots,
        },
      };
    }
  }

  return { hasConflict: false };
};
