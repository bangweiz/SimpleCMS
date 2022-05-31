import "reflect-metadata"
import express, {RequestHandler} from "express";
import provider from "../../helperClass/provider";
import App from '../../../app'

enum Method {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}

export const Controller = (path: string, middlewares: RequestHandler[] = []) => <T extends new (...args: any[]) => any> (target: T) => {
    const router = express.Router()
    const clazz = new target()
    provider.add(target.name, clazz)
    Object.getOwnPropertyNames(target.prototype).forEach(key => {
        const path = Reflect.getMetadata('path', target.prototype, key)
        const method: Method = Reflect.getMetadata('method', target.prototype, key)
        const handler = target.prototype[key]
        const middleware = Reflect.getMetadata('middleware', target, key)
        if (path && method && handler) {
            if (middleware) {
                router[method](path, [...middlewares, middleware], handler.bind(clazz))
            } else {
                router[method](path, middlewares, handler.bind(clazz))
            }
        }
    })
    const app = provider.get<App>('application')
    app.setRouter(path, router)
}


export const Use = (middleware: RequestHandler) => {
    return function (target: any, key: string) {
        Reflect.defineMetadata('middleware', middleware, target, key)
    }
}

const getRequestDecorator = (method: Method): Function => (path: string) => (target: any, key: string) => {
    Reflect.defineMetadata('path', path, target, key)
    Reflect.defineMetadata('method', method, target, key)
}

export const Get = getRequestDecorator(Method.GET)
export const Post = getRequestDecorator(Method.POST)
export const Put = getRequestDecorator(Method.PUT)
export const Del = getRequestDecorator(Method.DELETE)


export const Wired = (target: any, key: string) => {
    Reflect.defineProperty(target, key, {
        value: provider.get(key)
    })
}