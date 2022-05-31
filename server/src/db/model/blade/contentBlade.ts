import {Blade} from "./blade";
import {Column, NoTimeStamp, OneToOne, Table} from "../../../pkg/dicorator/model";
import {DataTypes, Model} from "sequelize";

@NoTimeStamp
@Table('content')
export class ContentBlade extends Model {
    @Column(DataTypes.STRING)
    public title: string

    @Column(DataTypes.STRING, true)
    public subtitle: string

    @Column(DataTypes.STRING)
    public content: string

    @Column(DataTypes.STRING, true)
    public buttonText: string

    @Column(DataTypes.STRING, true)
    public buttonLink: string

    @OneToOne(Blade)
    @Column(DataTypes.NUMBER)
    public bladeId: number
}