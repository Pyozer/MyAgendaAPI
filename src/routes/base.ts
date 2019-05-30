import { Router } from "express";
import parseIcal from "./parser/ical_parser";

const router: Router = Router();

router.get("/parseical", parseIcal);

export default router;
