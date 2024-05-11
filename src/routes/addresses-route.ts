import { Request, Response, Router } from "express"
import { addresses } from "../db"

export const addressesRoute = Router({})

addressesRoute.get('/', (req: Request, res: Response) => {
    if (req.query.value) {
      let searchValue = req.query.value.toString()
      res.send(addresses.filter(a => a.value.indexOf(searchValue) > -1))
    } else {
      res.send(addresses)
    }
  }
)

addressesRoute.get('/:id', (req: Request, res: Response) => {
  let addr = addresses.find(a => a.id === +req.params.id)

  if (addr) {
    res.send(addr)
  } else {
    res.send(404)
  }
})



addressesRoute.delete('/:id', (req: Request, res: Response) => {
  for (let i = 0; i < addresses.length; i++) {
    if (addresses[i].id === +req.params.id) {
      addresses.splice(i, 1)
      res.send(204)
      return;
    }
  }
})

addressesRoute.post('/', (req: Request, res: Response) => {
  const newAddresses = {
    id: +(new Date()),
    value: req.body.value
  }
  addresses.push(newAddresses)

  res
      .status(201)
      .send(newAddresses)
})
