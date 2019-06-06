import { Router } from "express"
import { helpFile, helps } from "./help/helps"
import parseIcal from "./parser/ical_parser"
import { welcome } from "./welcome"

const router: Router = Router()

router.get("/parseical", parseIcal)
router.get("/helps/:filename", helpFile)
router.get("/helps", helps)
router.get("/", welcome)

export default router
