var Product = require ('../schemas/product.schema');


async function addProduct(req, res) {
    try {
        let newProduct = new Product(req.body);
       
        await newProduct.save();
        res.send({
            productNEW: newProduct
        })
    } catch (error) {
        res.status(400).send(error)
    }
}
async function listProducts(req, res) {
    const productsDB = await Product.find();
    res.send({
        Products: productsDB
    })
}

async function getProduct(req, res) {
    try{
        
        //Id que recibimos como query param desde el endpoint
        const ProductId = req.query.id;
        //Buscamos espeficamente ese id en nuestra coleccion Products
        const product = await Product.findById(ProductId);
        if (!product) return res.status(404).send('El Producto no se encuentra')
        //const id = req.params.Product_id
        return res.status(200).send({
            product
        });
    }
    catch(error){
        res.status(400).send(error)
    }
}


async function deleteProduct(req, res) {
    const ProductId = req.query.id;
    const product = await Product.findByIdAndDelete(ProductId);
    res.status(200).send(`Producto ${product.name} borrado`)
}

async function updateProduct(req, res) {
    const ProductId = req.query.id;
    const ProductChanges = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(ProductId, ProductChanges, {
        new: true
    })
    if (!updatedProduct) return res.status(404).send('No se encontro el producto a editar')
    return res.status(200).send(updatedProduct)
}

module.exports = {
    addProduct,  //Create
    listProducts,//Read
    getProduct, //Read
    deleteProduct,//Delete
    updateProduct//Update
}