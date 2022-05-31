import Mapper from "../../pkg/mapper/mapper";
import {ContentBlade} from "../../db/model";
import {Service} from "../../pkg/dicorator/service";

@Service
export class ContentBladeService extends Mapper<ContentBlade> {
    protected table = ContentBlade
}