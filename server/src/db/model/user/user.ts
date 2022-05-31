import { DataTypes, Model } from "sequelize";
import {Column, Table, PrimaryKey} from "../../../pkg/dicorator/model";
import {Page} from "../page/page";

@Table()
export class User extends Model {
    @PrimaryKey
    @Column(DataTypes.NUMBER)
    public id: number

    @Column(DataTypes.STRING)
    public username: string

    @Column(DataTypes.STRING)
    public email: string

    @Column(DataTypes.STRING)
    public password: string

    @Column(DataTypes.JSON)
    public createdAt: string

    @Column(DataTypes.JSON)
    public updatedAt: string

    @Column(DataTypes.STRING, true)
    public avatar: string

    public pages: Page[]
}
