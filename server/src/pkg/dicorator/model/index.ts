import modelProvider from "../../helperClass/modelProvider";
import {RelationType} from "../../type/model";

export const Table = (table = '') => <T extends new (...args: any[]) => any> (constructor: T) => {
    modelProvider.addModel(constructor.name, {constructor, name: table})
    return constructor
}

export const NoTimeStamp = <T extends new (...args: any[]) => any> (constructor: T) => {
    modelProvider.addModel(constructor.name, {timestamp: false})
    return constructor
}

export const Column = (type: any, allowNull = false) => (target: object, key: string) => {
    modelProvider.addColumn(target.constructor.name, {
        name: key,
        attribute: {
            type,
            allowNull
        }
    })
}

export const PrimaryKey = (target: object, key: string) => {
    modelProvider.addColumn(target.constructor.name, {
        name: key,
        attribute: {
            primaryKey: true,
            autoIncrement: true
        }
    })
}

export const ManyToOne = (reference: Function, as = '') => (target: object, key: string) => {
    modelProvider.addRelation({
        target: target.constructor.name,
        reference: reference.name,
        relation: RelationType.ONE_TO_MANY,
        foreignKey: key,
        as
    })
}

export const OneToOne = (reference: Function, as = '') => (target: object, key: string) => {
    modelProvider.addRelation({
        target: target.constructor.name,
        reference: reference.name,
        relation: RelationType.ONE_TO_ONE,
        foreignKey: key,
        as
    })
}
