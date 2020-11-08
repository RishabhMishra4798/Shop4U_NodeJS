const express = require('express');
const router = express.Router();

const wishController = require('../controllers/wish');
const { isLoggedIn } = require('../middlewares/auth');
const UserItem = require('../models/userItem');
const Item = require('../models/item');

router.get('/', isLoggedIn, (req,res)=>{
  UserItem.getNumberOfItemsInWishlistByUserId(req.user._id, (err, useritems)=>{
    var price = 0;
    var counter = 0;
    var itemArr = [];
    if(useritems.length == 0){
      res.render('wishlist')
    }else{
    for(i=0;i<useritems.length;i++){
      Item.getItemById(useritems[i].item_id,(err, item)=>{
        itemArr.push(item)
        if(counter == useritems.length - 1) {
          res.render('wishlist',{
            items: itemArr
          })
        }
        counter++;
      })
    }
  }
  })
})

router.get('/wish-add/:itemid', isLoggedIn, (req,res)=>{
  wishController.wishAdd(req.user._id,req.params.itemid);
  res.redirect('/shop');
})

router.get('/wish-update/:itemid', isLoggedIn, (req,res)=>{
  wishController.wishUpdate(req.user._id,req.params.itemid);
  res.redirect('/card');
})

router.get('/wish-remove/:itemid', isLoggedIn, (req,res)=>{
  wishController.wishRemove(req.user._id,req.params.itemid);
  res.redirect('/card');
})

module.exports = router;