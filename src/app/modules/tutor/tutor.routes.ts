import { Router } from "express";
import { UserRole } from "../user/user.interface";
import auth from "../../middleware/auth";
import { parseBody } from "../../middleware/bodyParser";
import { TutorController } from "./tutor.controller";
import validateRequest from "../../middleware/validateRequest";
import { updateTutorSchema } from "./tutor.validation";

const router = Router();

router.post(
  "/",
  auth(UserRole.STUDENT, UserRole.TUTOR),
  TutorController.createTutors
);
router.get("/me", auth(UserRole.TUTOR),TutorController.myTutorProfile );

router.get("/", TutorController.getAllTutor);

router.get("/:id", TutorController.getSingleTutor);

router.patch(
  "/:id",
  auth(UserRole.TUTOR),
  validateRequest(updateTutorSchema),
  TutorController.updateTutors
);

router.delete("/:id", auth(UserRole.ADMIN), TutorController.deleteTutors);

export const TutorRoutes = router;
