const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: {
    type: Number,
    required: true,
    nullable: false,
    unique: true
  },
  name: {
    type: String,
    max: 100
  },
  price: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 0
  },
  idType: {
    type: Schema.Types.ObjectId,
    ref: 'ProductType'
  },
  createdAt: Date
});
const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel
