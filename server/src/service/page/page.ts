import Mapper from "../../pkg/mapper/mapper";
import {Page} from "../../db/model";
import {Service} from "../../pkg/dicorator/service";

@Service
export class PageService extends Mapper<Page> {
    protected table = Page
}