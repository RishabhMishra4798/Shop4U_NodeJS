var mongoose = require('mongoose');

var userItemSchema = mongoose.Schema({
  user_id: {
    type: String
  },
  item_id: {
    type: String
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Added to wish', 'Added to cart']
  }
});

var UserItem = module.exports = mongoose.model('UserItem',userItemSchema);

UserItem.getNumberOfItemsInWishlistByUserId = (user_id, callback) => {
  let query = { user_id: user_id , status: 'Added to wish' }
  UserItem.find(query, callback);
}

UserItem.getNumberOfItemsInCartByUserId = (user_id, callback) => {
  let query = { user_id: user_id , status: 'Added to cart' }
  UserItem.find(query, callback);
}

UserItem.getAllItemsByUserId = (userid,callback) => {
  let query = { user_id: userid }
  UserItem.find(query, callback)
}

UserItem.orderConfirm = (userid, callback) => {
  UserItem.updateMany(
    { user_id: userid, status: 'Added to cart' },
    {$push: { status: 'Confirmed' }},
    {safe:true, upsert: true},
    callback
  )
}