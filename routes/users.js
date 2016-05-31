const express = require('express');
const router = express.Router();
const low = require('lowdb');
const storage = require('lowdb/file-async');
const db = low('api/db.json', { storage })



router.route('/login')
  .post((req, res) => {
    const user = db('users').find({email:req.body.email});
    if(!user || user.password != req.body.password){
      return res.send({error:'Wrong Username or Password'});
    }
    if(user.password == req.body.password){
      return res.send(user);
    }
  });

router.route('/getUser')
  .post((req, res)=>{
    const user = db('users').find({email:req.body.email});
    console.log(user);
    if(!user){
      return res.send({error:'Wrong Username or Password'});
    }
    return res.send(user);
  });

router.route('/edit')
  .post((req, res)=>{
    var user = db('users')
    .chain()
    .find({_id:req.body._id})
    .assign({
      "age": req.body.age,
      "eyeColor": req.body.eyeColor,
      "name": {
        "first": req.body.name.first,
        "last": req.body.name.last
      },
      "company": req.body.company,
      "email": req.body.email,
      "phone": req.body.phone,
      "address": req.body.address
    })
    .value();

    return res.send(user);
  })

module.exports = router;
