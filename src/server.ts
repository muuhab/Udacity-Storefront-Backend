import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import {productRoutes} from './handlers/products'
import {userRoutes} from './handlers/users'
import {orderRoutes} from './handlers/orders'
import { extraRoutes } from './handlers/extra'
const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})
orderRoutes(app)
productRoutes(app)
userRoutes(app)
extraRoutes(app)
app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})


export default app;