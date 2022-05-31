import {DataTypes, Model} from "sequelize";
import {Column, ManyToOne, PrimaryKey, Table} from "../../../pkg/dicorator/model";
import {User} from "../user/user";
import {PageStatus} from "../../../controller/page/type";
import {Blade} from "../blade/blade";

@Table()
export class Page extends Model {
    @PrimaryKey
    @Column(DataTypes.NUMBER)
    public id: number

    @Column(DataTypes.STRING)
    public title: string

    @ManyToOne(User)
    @Column(DataTypes.NUMBER)
    public userId: number

    @Column(DataTypes.STRING)
    public url: string

    @Column(DataTypes.NUMBER)
    public status: PageStatus

    @Column(DataTypes.DATE)
    public createdAt: string

    @Column(DataTypes.DATE)
    public updatedAt: string

    public user: User

    public blades: Blade[]
}
