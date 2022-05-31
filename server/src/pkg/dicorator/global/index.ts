import express from "express";
import cors from "cors"
import provider from "../../helperClass/provider";

export const Application = <T extends new (...args: any[]) => any> (constructor: T) => {
    const exp = express();
    exp.use(express.json())
    exp.use(cors())

    class App extends constructor {
        private _starter = exp
    }
    const app = new App()
    provider.add('application', app)
    return App
}