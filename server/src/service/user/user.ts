import {User} from "../../db/model/";
import {Service} from "../../pkg/dicorator/service";
import Mapper from "../../pkg/mapper/mapper";

@Service
export class UserService extends Mapper<User> {
    protected table = User
}
