import {Express, Router} from "express";

class Starter {
    private _starter: Express

    public setRouter(url: string, router: Router) {
        this._starter.use(url, router)
    }

    public run(port: number) {
        this._starter.listen(port, () => {
            console.log(`Server is running at ${port}`)
        })
    }
}

export default Starter