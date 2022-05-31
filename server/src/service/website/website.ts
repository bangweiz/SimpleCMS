import Mapper from "../../pkg/mapper/mapper";
import {Website} from "../../db/model";
import {Service} from "../../pkg/dicorator/service";

@Service
export class WebsiteService extends Mapper<Website> {
    protected table = Website
}