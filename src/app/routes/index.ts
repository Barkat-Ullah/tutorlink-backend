import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { DivisionRoutes } from "../modules/division/division.routes";
import { DistrictRoutes } from "../modules/zilla/zilla.routes";
import { TutorRoutes } from "../modules/tutor/tutor.routes";
import { SubjectRoutes } from "../modules/subject/subject.routes";
import { orderRouter } from "../modules/order/order.routes";


const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/division",
    route: DivisionRoutes,
  },
  {
    path: "/district",
    route: DistrictRoutes,
  },
  {
    path: "/tutor",
    route: TutorRoutes,
  },
  {
    path: "/subject",
    route: SubjectRoutes,
  },
  {
    path: "/orders",
    route: orderRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
