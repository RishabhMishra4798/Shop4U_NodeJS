const express = require('express');
const router = express.Router();

const UserItem = require('../models/userItem');
const Item = require('../models/item');

const checkIfAdded = require('../controllers/check-if-added');
const callerInitial = require('../controllers/caller');

router.get('/',(req,res)=>{
  if(req.user){
    user = req.user;
    res.render('index',{
      user: user,
    });
  }else{
    res.render('index');
  }
})

router.get('/shop',(req,res)=>{
  if(req.user){
    Item.getAllItems((err, items)=>{
      UserItem.getAllItemsByUserId(req.user._id,(err, useritems)=>{
        res.render('shop',{
          owner: req.user.name,
          items: items,
          user: req.user,
          useritems: useritems,
          check: checkIfAdded,
          caller: callerInitial
        })
      })
    })
  }
  else{
    Item.getAllItems((err, items)=>{
      res.render('shop',{
        items: items
      })
    })
  }
})

router.get('/blog',(req,res)=>{
  res.render('blog')
})

router.get('/blogs/:name',(req,res)=>{
  res.render('blogs/'+req.params.name)
})

router.get('/contact',(req,res)=>{
  res.render('contact')
})

router.get('/success',(req,res)=>{
  if(!req.user){
    res.redirect('/');
  }
  UserItem.orderConfirm(req.user._id,(err, data)=>{
    console.log('order successfully confirmed')
  })
  res.render('success')
})

module.exports = router;