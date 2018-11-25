var express = require('express');
var router = express.Router();
var teamReg = require('../models/teamReg');

router.get('/', (req,res)=>{
  res.render('teamReg');
});
router.post('/', (req,res)=>{
  console.log(req.body);
  var team = req.body;
  if(team.school[0] == 'Others'){
    team.school = team.school[1];
  }
  else{
    team.school = team.school[0];
  }
  if(!Array.isArray(team.event)){
    var event = [];
    event.push(team.event);
    team.event = event;
  }
  console.log(team);
  teamReg.create(team)
  .then((team)=>{
    console.log(team);
    console.log('Successful');
  })
  .catch((err)=>{
    throw err;
  })
  res.render('teamSuccessful',{kid:team});
  res.end();
});
module.exports = router;
