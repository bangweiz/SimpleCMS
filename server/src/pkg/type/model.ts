export enum RelationType {
    ONE_TO_MANY,
    ONE_TO_ONE,
    MANY_TO_MANY
}

export interface ColumnDefinition {
    name: string
    attribute: {
        primaryKey?: boolean,
        type?: any,
        allowNull?: boolean,
        autoIncrement?: boolean
    }
}

export interface ModelDefinition {
    name?: string,
    constructor?: Function,
    timestamp?: boolean
}

export interface Relation {
    target: string,
    reference: string,
    relation: RelationType,
    foreignKey: string
    as?: string
}
