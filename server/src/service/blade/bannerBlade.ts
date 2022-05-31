import Mapper from "../../pkg/mapper/mapper";
import {BannerBlade} from "../../db/model";
import {Service} from "../../pkg/dicorator/service";

@Service
export class BannerBladeService extends Mapper<BannerBlade> {
    protected table = BannerBlade
}