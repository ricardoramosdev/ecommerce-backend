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

// async function getProduct(req, res) {
//     //Id que recibimos como query param desde el endpoint
//     const ProductId = req.query.id;
//     //Buscamos espeficamente ese id en nuestra coleccion Products
//     const Product = await Product.findById(ProductId);
//     console.log(Product)
//     if (!Product) return res.status(404).send('El usuario no se encuentra')
//     //const id = req.params.Product_id
//     return res.send({
//         Product
//     });
// }

// async function deleteProduct(req, res) {
//     const ProductId = req.query.id;
//     const Product = await Product.findByIdAndDelete(ProductId);
//     res.status(200).send(`Usuarios ${Product.fullName} borrado`)
// }

// async function updateProduct(req, res) {
//     const id = req.params.id;
//     const ProductChanges = req.body;
//     const updatedProduct = await Product.findByIdAndUpdate(id, ProductChanges, {
//         new: true
//     })
//     if (!updatedProduct) return res.status(404).send('No se encontro el ususario')
//     return res.status(200).send(updatedProduct)
// }

module.exports = {
    addProduct,
    listProducts
}