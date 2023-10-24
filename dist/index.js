"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3020;
const products = [{ id: 1, title: 'tomato' }, { id: 2, title: 'orange' }];
const addresses = [{ id: 1, value: 'Mitinskaya 12' }, { id: 2, value: 'Selickaga 11' }];
app.use(express_1.default.json());
app.get('/products', (req, res) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(products.filter(p => p.title.indexOf(searchString) > -1));
    }
    else {
        res.send(products);
    }
});
app.get('/products/:productTitle', (req, res) => {
    let prod = products.find(p => p.title === req.params.productTitle);
    if (prod) {
        res.send(prod);
    }
    else {
        res.send(404);
    }
});
app.get('/addresses', (req, res) => {
    if (req.query.value) {
        let searchValue = req.query.value.toString();
        res.send(addresses.filter(a => a.value.indexOf(searchValue) > -1));
    }
    else {
        res.send(addresses);
    }
});
app.get('/addresses/:id', (req, res) => {
    let addr = addresses.find(a => a.id === +req.params.id);
    if (addr) {
        res.send(addr);
    }
    else {
        res.send(404);
    }
});
app.delete('/products/:id', (req, res) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1);
            res.send(204);
            return;
        }
    }
});
app.delete('/addresses/:id', (req, res) => {
    for (let i = 0; i < addresses.length; i++) {
        if (addresses[i].id === +req.params.id) {
            addresses.splice(i, 1);
            res.send(204);
            return;
        }
    }
});
app.post('/products/', (req, res) => {
    const newProduct = {
        id: +(new Date()),
        title: req.body.title
    };
    products.push(newProduct);
    res
        .status(201)
        .send(newProduct);
});
app.post('/addresses', (req, res) => {
    const newAddresses = {
        id: +(new Date()),
        value: req.body.value
    };
    addresses.push(newAddresses);
    res
        .status(201)
        .send(newAddresses);
});
app.put('/products/:id', (req, res) => {
    let product = products.find(p => p.id === +req.params.id);
    if (product) {
        product.title = req.body.title;
        res.send(product);
    }
    else {
        res.send(404);
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
