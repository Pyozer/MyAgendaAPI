import { Router } from "express"
import { helpFile, helps } from "./help/helps"
import parseIcal from "./parser/parse_ical"
import parseCustomIcal from "./parser/parse_custom_ical"
import { welcome } from "./welcome"
import { resources, universityResources } from "./resources/resources"

const router: Router = Router()

router.get("/parseIcal/:univId/:resId", parseIcal)
router.get("/parseCustomical", parseCustomIcal)
router.get("/resources", resources)
router.get("/resources/:univId", universityResources)
router.get("/helps/:filename", helpFile)
router.get("/helps", helps)
router.get("/", welcome)

export default router
