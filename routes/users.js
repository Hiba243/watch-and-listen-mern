// for registering user

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config=require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User')

const router = express.Router();

router.post('/', [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters',
    ).isLength({min: 6}),
  ], async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password}=req.body;
    try{
      let user=await User.findOne({email:email});
      if(user){
        res.status(400).json({msg:'user already exists'});

      }
      user=new User({
        name,email,password
      });
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password,salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, "secret",{
        expiresIn: 360000

      }, (err,token) => {
        if(err){
          throw err;
        }
        else{
          res.json({token});
        }
      })
    }
    catch(err){
      res.status(500).json({msg:'server error'});
    }
});

module.exports = router;