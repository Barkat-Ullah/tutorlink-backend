import { Router } from "express";
import { subjectController } from "./subject.controller";

const router = Router();

router.get("/", subjectController.getAllSubject);

export const SubjectRoutes = router;
