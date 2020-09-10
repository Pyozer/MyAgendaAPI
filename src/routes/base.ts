import { Router } from "express"
import { helpFile, helps } from "./help/helps"
import { parseCustomIcal } from "./parser/parse_custom_ical"
import { parseIcal } from "./parser/parse_ical"
import { resources, universityResources } from "./resources/resources"
import { welcome } from "./welcome"

const apiRouter: Router = Router()

apiRouter.get("/parseIcal/:univId/:resId", parseIcal)
apiRouter.get("/parseCustomical", parseCustomIcal)
apiRouter.get("/resources", resources)
apiRouter.get("/resources/:univId", universityResources)
apiRouter.get("/helps/:filename", helpFile)
apiRouter.get("/helps", helps)
apiRouter.get("/", welcome)

export { apiRouter }
