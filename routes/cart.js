const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart');
const { isLoggedIn } = require('../middlewares/auth');
const UserItem = require('../models/userItem');
const Item = require('../models/item');

router.get('/', isLoggedIn, (req,res)=>{
  UserItem.getNumberOfItemsInCartByUserId(req.user._id, (err, useritems)=>{
    var price = 0;
    var counter = 0;
    var itemArr = [];
    if(useritems.length == 0){
      res.render('cart')
    }else{
    for(i=0;i<useritems.length;i++){
      Item.getItemById(useritems[i].item_id,(err, item)=>{
        itemArr.push(item)
        if(counter == useritems.length - 1) {
          res.render('cart',{
            items: itemArr
          })
        }
        counter++;
      })
    }}
  })
})

router.get('/cart-add/:itemid', isLoggedIn, (req,res)=>{
  cartController.cartAdd(req.user._id,req.params.itemid);
  res.redirect('/shop');
})

router.get('/cart-update/:itemid', isLoggedIn, (req,res)=>{
  cartController.cartUpdate(req.user._id,req.params.itemid);
  res.redirect('/card');
})

router.get('/cart-remove/:itemid', isLoggedIn, (req,res)=>{
  cartController.cartRemove(req.user._id,req.params.itemid);
  res.redirect('/card');
})

module.exports = router;