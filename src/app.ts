import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import { Division } from "./app/modules/division/division.model";
import { District } from "./app/modules/zilla/zilla.model";
import { Subject } from "./app/modules/subject/subject.model";
// import seedAdmin from "./app/DB/seed";


const app: Application = express();

// Middleware setup
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// seedAdmin();
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Tutor api is running successfully!" });
});
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app; 
