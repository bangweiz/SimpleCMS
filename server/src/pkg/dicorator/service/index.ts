import provider from "../../helperClass/provider";

export const Service = <T extends new (...args: any[]) => any> (constructor: T) => {
    const key = constructor.name[0].toLowerCase() + constructor.name.slice(1);
    provider.add(key, new constructor())
    return constructor
}