import 'dotenv/config'
import "./app"
import './db/model'
import './service'
import './controller'
import provider from "./pkg/helperClass/provider"
import App from "./app"

const app = provider.get<App>('application')

export default app
