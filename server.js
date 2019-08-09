const express = require ('express')

const bodyParser = require ('body-parser')

const {Product,Store} = require ('./models/store.js')

const PORT = 3030

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/', (req,res)=>{
    res.send({message:'server on'})
});

app.post('/create/store', (req,res)=>{
    const {store_name, direction, products}= req.body;
    const newStore = Store({
        store_name,
        direction,
        products
    })

    newStore.save((err,store)=>{
        err
        ? res.status (409).send(err)
        : res.status (201).send(store)
    })

})

app.post("/create/product", (req,res)=>{
    const {name, price, stock}= req.body;
    console.log(req.body)
    const newProduct = Product({
        name, 
        price, 
        stock
    })

    newProduct.save((err,product)=>{
        err
        ? res.status(409).send(err)
        :  res.status(201).send(product)

    })
})

app.get('/store:idStore', (req,res)=>{
    const {idStore} = req.params;
    Store.findById(idStore)
    .populate('products')
    .excec()
    .then(store=>res.send(store))
    .catch(err=>res.status(409).send(err))
});

app.get('/product/:idProducto', (req,res)=>{
    const {idProduct} = req.params;
    Product.findById(idProduct).exec()
    .then(product => 
        product
        ? res.send(product)
        : res.status(404).send({message:'product not found'})
        )

        .cath(err=> res.status(409).send(err))
})

app.get('/all/products', (req,res)=>{
    Product.find().exec()
    .then(products => res.send(products))
    .catch(err => res.status(409).send(err))
})

// app.get('/tickets')


app.listen(PORT, ()=>{
    console.log(`server on port ${PORT}`)
})