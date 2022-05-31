import modelProvider from "../helperClass/modelProvider";
import sequelize from "../../db";
import {ModelDefinition, RelationType} from "../type/model";
import {Association} from "sequelize";

export const initModels = () => {
    const modelIt = modelProvider.getModelIt()

    while (true) {
        const value: [string, ModelDefinition] = modelIt.next().value
        if (!value) {
            break
        }
        const [name, clazz] = value
        const {name: tableName, constructor: model, timestamp} = clazz
        if (!tableName || !model) {
            continue
        }
        const cols = modelProvider.getColumns(name)
        const attributes: {[key: string]: any} = {}
        cols?.forEach(col => {
            attributes[col.name] = col.attribute
        });
        (model as any).init(attributes, {sequelize, modelName: tableName, timestamps: timestamp !== false})
    }
}

export const initRelations = () => {
    modelProvider.getRelations().forEach(relation => {
        const target = modelProvider.getModel(relation.target)
        const reference = modelProvider.getModel(relation.reference)
        if (target && reference) {
            const targetModel: any = target.constructor
            const referModel: any = reference.constructor

            switch (relation.relation) {
                case RelationType.ONE_TO_ONE:
                    const association: Association = referModel.hasOne(targetModel, {
                        onUpdate: 'CASCADE'
                    })
                    targetModel.belongsTo(referModel, {
                        foreignKey: relation.foreignKey
                    })

                    modelProvider.addAssociation(relation.reference + relation.target, association)
                    break
                case RelationType.ONE_TO_MANY:
                    referModel.hasMany(targetModel, {
                        onUpdate: 'CASCADE'
                    })
                    targetModel.belongsTo(referModel, {
                        foreignKey: relation.foreignKey
                    })
                    break
                case RelationType.MANY_TO_MANY:
                    break
                default:
                    break
            }
        }
    })
}