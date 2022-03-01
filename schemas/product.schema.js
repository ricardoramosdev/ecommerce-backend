var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = Schema({
    name: { type: String, required: true, maxlength: 40 },
    description: { type: String, maxlength: 200 },
    price: { type: Number, required: true, maxlength: 10 },
    stock: { type: Number, required: true, maxlength: 40 },
    category_id: { type: String, required: true, maxlength: 40 },
    cod:{ type:String , required:true},
    iva:{type:Boolean, required:true},
    currency:{ type: String, required: true, maxlength: 10},

})

module.exports = mongoose.model("Product", ProductSchema);
