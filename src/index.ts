import express, { Request, Response} from 'express'
import { addressesRoute } from './routes/addresses-route'
import { productsRoute } from './routes/products-route'

const app = express()
const port = 3020

app.use(express.json())

app.use('/products', productsRoute)

app.use('/addresses', addressesRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})