class Provider {
    private static instance: Provider
    private constructor() {}
    public static getInstance(): Provider {
        if (!Provider.instance) {
            Provider.instance = new Provider()
        }
        return Provider.instance
    }

    private map: Map<string, any> = new Map()

    public add(key: string, value: any) {
        this.map.set(key, value)
    }

    public get<T>(key: string): T {
        return this.map.get(key)
    }
}

const provider = Provider.getInstance()

export default provider
