import { Router } from "express"
import { helpFile, helps } from "./help/helps"
import parseIcal from "./parser/ical_parser"

const router: Router = Router()

router.get("/parseical", parseIcal)
router.get("/helps", helps)
router.get("/helps/:filename", helpFile)

export default router
