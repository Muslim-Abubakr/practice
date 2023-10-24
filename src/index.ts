import express, { Request, Response} from 'express'

const app = express()
const port = 3020

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
const addresses = [{id: 1, value: 'Mitinskaya 12'}, {id: 2, value: 'Selickaga 11'}]

app.use(express.json())


app.get('/products', (req: Request, res: Response) => {
  if (req.query.title) {
    let searchString = req.query.title.toString()
    res.send(products.filter(p => p.title.indexOf(searchString) > -1))
  } else {
    res.send(products)
  }
  }
)

app.get('/products/:productTitle', (req: Request, res: Response) => {
  let prod = products.find(p => p.title === req.params.productTitle)

  if (prod) {
    res.send(prod)
  } else {
    res.send(404)
  }
})

app.get('/addresses', (req: Request, res: Response) => {
    if (req.query.value) {
      let searchValue = req.query.value.toString()
      res.send(addresses.filter(a => a.value.indexOf(searchValue) > -1))
    } else {
      res.send(addresses)
    }
  }
)

app.get('/addresses/:id', (req: Request, res: Response) => {
  let addr = addresses.find(a => a.id === +req.params.id)

  if (addr) {
    res.send(addr)
  } else {
    res.send(404)
  }
})

app.delete('/products/:id', (req: Request, res: Response) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === +req.params.id) {
      products.splice(i, 1)
      res.send(204)
      return; 
    }
  }
})

app.delete('/addresses/:id', (req: Request, res: Response) => {
  for (let i = 0; i < addresses.length; i++) {
    if (addresses[i].id === +req.params.id) {
      addresses.splice(i, 1)
      res.send(204)
      return;
    }
  }
})

app.post('/products/', (req: Request, res: Response) => {
  const newProduct = { 
    id: +(new Date()),
    title: req.body.title
  }
  products.push(newProduct)

  res
      .status(201)
      .send(newProduct)
})

app.post('/addresses', (req: Request, res: Response) => {
  const newAddresses = {
    id: +(new Date()),
    value: req.body.value
  }
  addresses.push(newAddresses)

  res
      .status(201)
      .send(newAddresses)
})

app.put('/products/:id', (req: Request, res: Response) => {
  let product = products.find(p => p.id === +req.params.id)

  if (product) {
    product.title = req.body.title
    res.send(product)
  } else {
    res.send(404)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})