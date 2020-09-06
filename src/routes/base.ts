import { Router } from "express"
import { helpFile, helps } from "./help/helps"
import parseCustomIcal from "./parser/parse_custom_ical"
import { parseIcal } from "./parser/parse_ical"
import { resources, universityResources } from "./resources/resources"
import { welcome } from "./welcome"

const router: Router = Router()

router.get("/parseIcal/:univId/:resId", parseIcal)
router.get("/parseCustomical", parseCustomIcal)
router.get("/resources", resources)
router.get("/resources/:univId", universityResources)
router.get("/helps/:filename", helpFile)
router.get("/helps", helps)
router.get("/", welcome)

export default router
