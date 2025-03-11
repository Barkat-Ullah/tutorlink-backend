import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { UserRole } from "./user.interface";

const router = Router();

router.get("/", auth(UserRole.ADMIN), UserController.getAllUser);
router.get(
  "/me",
  auth(UserRole.ADMIN, UserRole.STUDENT),
  UserController.myProfile
);

router.post("/", UserController.registerUser);
router.patch(
  "/:id",
  auth(UserRole.STUDENT),
  
  UserController.updateProfile
);

router.patch(
  "/:id/status",
  auth(UserRole.ADMIN),
  UserController.updateUserStatus
);

export const UserRoutes = router;
