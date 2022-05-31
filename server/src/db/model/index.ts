import {Website} from "./website/website";
import {User} from './user/user'
import {Page} from './page/page'
import {Blade} from "./blade/blade";
import {BannerBlade} from "./blade/bannerBlade";
import {ContentBlade} from "./blade/contentBlade";
import {initModels, initRelations} from "../../pkg/helperFunc/modelHelpers";

initModels()

initRelations()

export {
    Website,
    User,
    Page,
    Blade,
    BannerBlade,
    ContentBlade
}