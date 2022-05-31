import {Blade} from "./blade";
import {Column, OneToOne, PrimaryKey, Table} from "../../../pkg/dicorator/model";
import {DataTypes, Model} from "sequelize";

@Table('banner')
export class BannerBlade extends Model {
    @PrimaryKey
    @Column(DataTypes.NUMBER)
    public id: number

    @Column(DataTypes.STRING, true)
    public title: string

    @Column(DataTypes.STRING, true)
    public subtitle: string

    @Column(DataTypes.STRING, true)
    public link: string

    @Column(DataTypes.STRING)
    public imageSrc: string

    @OneToOne(Blade)
    @Column(DataTypes.NUMBER)
    public bladeId: number
}