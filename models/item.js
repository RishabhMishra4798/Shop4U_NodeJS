var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  name: {
    type: String
  },
  price: {
    type: Number
  },
  category:{
    type: String,
    enum: ['accessories','smartphones','laptops','hardwares','car_electronics','cameras']
  },
  brand: {
    type: String,
    enum: ['philips','lenovo','huawei','sony','samsung','astro','transcend','mi','rapoo','gembird','apple','luna','canon','digitus','nokia']
  },
  color: {
    type: String,
    enum: ['black','white','silver','pink']
  },
  img_path: {
    type: String
  }
});

var Item = module.exports = mongoose.model('Item',itemSchema);

Item.getAllItems = (callback) => {
  Item.find(callback);
}

Item.getItemById = (id, callback) => {
  Item.findById(id,callback);
}

// db.items.insertOne({ name: 'Rapoo 7100p Gray', price: 1599, category: 'hardwares', brand:'rapoo', color: 'silver', img_path: 'new_7.jpg'})
