import { Request, Response, Router } from "express"
import { products } from "../db"

export const productsRoute = Router({})

productsRoute.get('/', (req: Request, res: Response) => {
    if (req.query.title) {
      let searchString = req.query.title.toString()
      res.send(products.filter(p => p.title.indexOf(searchString) > -1))
    } else {
      res.send(products)
    }
    }
  )
  
productsRoute.get('/:productTitle', (req: Request, res: Response) => {
    let prod = products.find(p => p.title === req.params.productTitle)
  
    if (prod) {
      res.send(prod)
    } else {
      res.send(404)
    }
  })

productsRoute.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === +req.params.id) {
        products.splice(i, 1)
        res.send(204)
        return; 
      }
    }
  })

productsRoute.post('/', (req: Request, res: Response) => {
    const newProduct = { 
      id: +(new Date()),
      title: req.body.title
    }
    products.push(newProduct)
  
    res
        .status(201)
        .send(newProduct)
  })

productsRoute.put('/:id', (req: Request, res: Response) => {
    let product = products.find(p => p.id === +req.params.id)
  
    if (product) {
      product.title = req.body.title
      res.send(product)
    } else {
      res.send(404)
    }
  })