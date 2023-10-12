const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
  name: {
    type: String,
    max: 100
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  createdAt: Date
});
const ProductTypeModel = mongoose.model('ProductType', TypeSchema);

module.exports = ProductTypeModel
