import { Router } from "express";
import helps from "./help/helps";
import parseIcal from "./parser/ical_parser";

const router: Router = Router();

router.get("/parseical", parseIcal);
router.get("/helps", helps);

export default router;
