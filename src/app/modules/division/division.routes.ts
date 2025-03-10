// division.routes.js
import { Router } from "express";
import { divisionController } from "./division.controller";

const router = Router();

router.get("/", divisionController.getAllDivision);

export const DivisionRoutes = router;
