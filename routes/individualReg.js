var express = require('express');
var router = express.Router();
var individualReg = require('../models/individualReg');

router.get('/', (req,res)=>{
  res.render('individualReg');
});
router.post('/', (req,res)=>{
  res.set({ 'content-type':'text/html;charset=utf-8'})
  console.log(req.body);
  var kid = req.body;
  if(kid.school[0] == 'Others'){
    kid.school = kid.school[1];
  }
  else{
    kid.school = kid.school[0];
  }
  if(!Array.isArray(kid.event)){
    var event = [];
    event.push(kid.event);
    kid.event = event;
  }
  console.log(kid);
  individualReg.create(kid)
  .then((regKid)=>{
    console.log(regKid);
    console.log('Successful');
  })
  .catch((err)=>{
    throw err;
  });
  res.render('individualSuccessful',{kid:kid});
  res.end();
});
module.exports = router;
