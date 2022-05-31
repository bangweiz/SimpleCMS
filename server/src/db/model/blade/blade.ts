import {DataTypes, Model} from "sequelize";
import {Column, ManyToOne, PrimaryKey, Table} from "../../../pkg/dicorator/model";
import {Page} from "../page/page";
import {ContentBlade} from "./contentBlade";
import {BannerBlade} from "./bannerBlade";

@Table()
export class Blade extends Model {
    @PrimaryKey
    @Column(DataTypes.NUMBER)
    public id: number

    @Column(DataTypes.STRING)
    public name: string

    @ManyToOne(Page)
    @Column(DataTypes.NUMBER)
    public pageId: number

    @Column(DataTypes.NUMBER)
    public order: number

    @Column(DataTypes.DATE)
    public createdAt: string

    @Column(DataTypes.DATE)
    public updatedAt: string

    public content: Partial<ContentBlade>

    public banner: Partial<BannerBlade>

    public page: Page
}