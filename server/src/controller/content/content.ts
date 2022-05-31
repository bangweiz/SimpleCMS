import {Controller, Wired} from "../../pkg/dicorator/controller";
import {authCheck} from "../../middleware/auth";
import {ContentBladeService} from "../../service";

@Controller('/contents', [authCheck])
export class ContentController {
    @Wired
    private contentService: ContentBladeService
}