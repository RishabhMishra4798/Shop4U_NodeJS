var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Include User Model
var User = require('../models/user');

const { validationResult, check } = require('express-validator');

router.get('/login',(req,res)=>{
  res.render('user/login');
})

// User Register
router.get('/register', function(req, res, next) {
  res.render('user/sign');
});

// Register User
router.post('/register',async (req,res,next)=>{
  // Get Form Values
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var contact = req.body.contact;

  // Form Validation
  await check('name','Name field is required').notEmpty().run(req);
  await check('email','Email field is required').notEmpty().run(req);
  await check('email','Email must be a valid email address').isEmail().run(req);
  await check('password','Password field is required').notEmpty().run(req);
  await check('contact','Contact field is required').notEmpty().run(req);

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    res.render('user/sign',{
      errors: errors.array()
    })
  }else{
    var newUser = new User({
      email: email,
      password: password,
      name: name,
      contact: contact
    });

    User.saveUser(newUser,(err,user)=>{
      console.log('User created');
    });

    req.flash('success_msg','User Added');
    res.redirect('/');
  }
});

passport.serializeUser((user, done)=>{
  done(null, user._id);
});

passport.deserializeUser((id, done)=>{
  User.getUserById(id, (err, user)=>{
    done(err, user);
  });
});

router.post('/login',
(req,res,next)=>{
  console.log('enter to login post')
  next();
},
passport.authenticate('local',{failureRedirect:'/user/login',failureFlash:true}),
(req,res,next)=>{
  req.flash('success_msg','you are now logged in');
  res.redirect('/');
})

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  (username, password, done)=>{
    User.getUserByEmail(username, (err, user)=>{
      if(err) throw err;
      if(!user){
        return done(null, false, { message : 'Unknown username '+ username }); 
      }
      User.comparePassword(password,user.password, (err, isMatch)=>{
        if(err) return done(err);
        if(isMatch){
          return done(null, user);
        }else{
          console.log('Invalid Password');
          // Success Message
          return done(null,false,{message:'Invalid password'});
        }
      })
    })
  }
));

// Log User Out
router.get('/logout',(req,res,next)=>{
  req.logout();
  // Success Message
  req.flash('success_msg', 'you are logged out');
  res.redirect('/');
});

module.exports = router;