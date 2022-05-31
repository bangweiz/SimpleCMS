import {Column, PrimaryKey, Table} from "../../../pkg/dicorator/model";
import {DataTypes, Model} from "sequelize";

@Table()
export class Website extends Model {
    @PrimaryKey
    @Column(DataTypes.NUMBER)
    public id: number

    @Column(DataTypes.STRING)
    public title: string

    @Column(DataTypes.STRING)
    public favicon: string

    @Column(DataTypes.STRING)
    public footerText: string

    @Column(DataTypes.STRING)
    public headerLinks: string

    @Column(DataTypes.JSON)
    public updatedAt: string
}