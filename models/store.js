const mongoose = require ("mongoose")
const URL_MONGO = 'mongodb+srv://Tatny:ponchita23@tatny-zvudk.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(URL_MONGO,{useNewUrlParser: true}, (err)=>{
    if (!err) console.log('conexion exitosa')
})

const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    store_name:String,
    direction: String,
    products:[
        
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            }
        ]
        
    
});

const ProductSchema = new Schema({
    name: String,
    price: String,
    stock: Number

}, {timestamps:true})

const Product = mongoose.model('Product', ProductSchema);

const Store = mongoose.model('Store', StoreSchema);

module.exports={
    Product,
    Store
}


