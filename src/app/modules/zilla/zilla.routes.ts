// division.routes.js
import { Router } from "express";
import { districtController } from "./zilla.controller";


const router = Router();

router.get("/", districtController.getAllDistrict);

export const DistrictRoutes = router;
