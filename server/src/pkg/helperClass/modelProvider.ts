import {ColumnDefinition, ModelDefinition, Relation} from "../type/model";
import {Association} from "sequelize";

class ModelProvider {
    private static instance: ModelProvider
    private constructor() {}
    public static getInstance(): ModelProvider {
        if (!ModelProvider.instance) {
            ModelProvider.instance = new ModelProvider()
        }
        return ModelProvider.instance
    }

    private modelMap: Map<string, ModelDefinition> = new Map()
    private columnMap: Map<string, ColumnDefinition[]> = new Map()
    private relations: Relation[] = []
    private associationMap: Map<string, Association> = new Map()

    public addAssociation(key: string, a: Association) {
        this.associationMap.set(key, a)
    }

    public getAssociation(key: string) {
        return this.associationMap.get(key)
    }

    public addRelation(r: Relation) {
        this.relations.push(r)
    }

    public getRelations(): Relation[] {
        return this.relations.map(r => ({...r}))
    }

    public addModel(key: string, define: ModelDefinition) {
        const name = define.name || key.charAt(0).toLowerCase() + key.slice(1)
        if (this.modelMap.has(key)) {
            const oldDefine = this.modelMap.get(key)
            this.modelMap.set(key, {
                ...oldDefine,
                ...define
            })
        } else {
            this.modelMap.set(key, {
                ...define,
                name
            })
        }
    }

    public getModel(key: string) {
        return this.modelMap.get(key)
    }

    public getModelIt() {
        return this.modelMap.entries()
    }

    public addColumn(model: string, data: ColumnDefinition) {
        const cols = this.columnMap.get(model) || []
        const has = cols.some(col => col.name === data.name)
        if (has) {
            const newCols = cols.map(col => {
                if (col.name !== data.name) {
                    return col
                }
                const attribute = {...col.attribute, ...data.attribute}
                return {name: col.name, attribute}
            })
            this.columnMap.set(model, newCols)
        } else {
            cols.push(data)
            this.columnMap.set(model, cols)
        }
    }

    public getColumns(mode: string) {
        return this.columnMap.get(mode)
    }

    public getColumnIt() {
        return this.columnMap.entries()
    }
}

const modelProvider = ModelProvider.getInstance()

export default modelProvider