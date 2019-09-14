import { Router } from "express"
import { helpFile, helps } from "./help/helps"
import parseIcal from "./parser/ical_parser"
import { welcome } from "./welcome"
import { resources, universityResources } from "./resources/resources"

const router: Router = Router()

router.get("/parseical", parseIcal)
router.get("/resources", resources)
router.get("/resources/:univFile", universityResources)
router.get("/helps/:filename", helpFile)
router.get("/helps", helps)
router.get("/", welcome)

export default router
