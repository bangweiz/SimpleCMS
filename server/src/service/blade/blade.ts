import Mapper from "../../pkg/mapper/mapper";
import {Blade} from "../../db/model";
import {Service} from "../../pkg/dicorator/service";
import sequelize from "../../db";
import ModelProvider from "../../pkg/helperClass/modelProvider";
import modelProvider from "../../pkg/helperClass/modelProvider";
import {firstLetterToUpper} from "../../util";

@Service
export class BladeService extends Mapper<Blade> {
    protected table = Blade

    public async updateByWithAssociation(blade: Partial<Blade>, bladeId: number, bladeType: keyof Blade) {
        const model = ModelProvider.getModel(`${firstLetterToUpper(bladeType)}Blade`)
        if (!model) {
            return 0
        }
        if (!blade[bladeType]) {
            return 0
        }

        try {
            return await sequelize.transaction(async t => {
                const [affectedCount1] = await this.updateOne({
                    data: blade,
                    where: {
                        id: bladeId
                    }
                }, t)

                const [affectedCount2] = await (model.constructor as typeof Blade).update(blade[bladeType], {
                    where: {
                        bladeId: bladeId,
                    },
                    transaction: t
                })

                return affectedCount1 + affectedCount2
            })
        } catch (e) {
            console.error(e)
            return 0
        }
    }

    public async deleteAll(bladeId: number, bladeType: string) {
        const model = modelProvider.getModel(`${firstLetterToUpper(bladeType)}Blade`)
        if (!model) {
            return 0
        }

        try {
            return await sequelize.transaction(async t => {
                const num1 = await (model.constructor as typeof Blade).destroy(
                    {
                        where: {
                            bladeId
                        },
                        transaction: t
                    }
                )

                const num2 = await this.deleteById(bladeId, t)

                return num1 + num2
            })
        } catch (e) {
            console.error(e)
            return 0
        }
    }
}

