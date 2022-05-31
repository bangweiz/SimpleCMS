import {FindAttributeOptions, FindOptions, Includeable, Model, Transaction, where, WhereOptions} from "sequelize";
import {ModelStatic} from "sequelize/types/model";
import {sanitizeObject} from "../../util/utils";
import sequelize from "../../db";
import {currentDateTime} from "../../util/date";

interface Argument<T> {
    attributes?: FindAttributeOptions,
    where?: WhereOptions,
    include?: Includeable | Includeable[],
    order?: any[]
}

interface UpdateArg<T> {
    data: Partial<T>,
    where: WhereOptions,
    include?: Includeable | Includeable[]
}

class Mapper<T extends Model> {
    protected table: ModelStatic<T>

    public async findOne(args: Argument<T>): Promise<Partial<T>|null> {
        const findOption: FindOptions = {
            attributes: args.attributes,
            where: args.where,
            order: args.order,
            include: args.include
        }
        try {
            return await this.table.findOne(findOption)
        } catch (e) {
            console.error(e)
            return null
        }
    }

    public async findAll(args?: Argument<T>): Promise<Partial<T>[]> {
        const findOption: FindOptions = {}
        if (args) {
            findOption.attributes = args.attributes
            findOption.where = args.where
            findOption.include = args.include || []
            findOption.order = args.order || []
        }
        try {
            return await this.table.findAll(findOption)
        } catch (e) {
            console.error(e)
            return []
        }
    }

    public async createOne(args: Partial<T>, include?: Includeable | Includeable[]): Promise<T|null> {
        try {
            return await this.table.create(
                {...sanitizeObject(args) as any},
                {include}
            )
        } catch (e) {
            console.error(e)
            return null
        }
    }

    public async updateOne(args: UpdateArg<T>, t?: Transaction) {
        try {
            return await this.table.update({
                ...sanitizeObject(args.data),
                updateAt: currentDateTime()
            }, {
                where: args.where,
                transaction: t
            })
        } catch (e) {
            console.error(e)
            return [0] as [affectedCount: number]
        }
    }

    public async updateTwo(arg1: UpdateArg<T>, arg2: UpdateArg<T>) {
        try {
            return await sequelize.transaction(async t => {
                const [affectedCount1] = await this.updateOne(arg1, t)
                const [affectedCount2] = await this.updateOne(arg2, t)
                return affectedCount1 + affectedCount2
            })
        } catch (e) {
            console.error(e)
            return 0
        }
    }

    public async deleteById(id: number, t?: Transaction) {
        try {
            return await this.table.destroy({
                where: ({ id } as any),
                transaction: t
            })
        } catch (e) {
            console.error(e)
            return 0
        }
    }
}

export default Mapper