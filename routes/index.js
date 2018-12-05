var express = require('express');
var router = express.Router();
var individualReg = require('../models/individualReg');
var teamReg = require('../models/teamReg');

router.get('/', async function(req, res, next) {

  var individualPromise = individualReg.aggregate(
    [
      { 
          "$unwind" : "$event"
      }, 
      { 
          "$group" : {
              "_id" : {
                  "event" : "$event", 
                  "category" : "$Category"
              }, 
              "count" : {
                  "$sum" : 1.0
              }
          }
      }, 
      { 
          "$project" : {
              "event" : "$_id.event", 
              "category" : "$_id.category", 
              "count" : 1.0,
              "_id" : 0
          }
      },
      {
        "$group" : {
          "_id" : "$category",
          "eventlist" : {
            "$push" : {
              "count" : "$count",
              "event" : "$event"
            }
          }
        }
      },
      { 
          "$sort" : {
              "_id" : 1.0
          }
      }
  ])

  var teamPromise = teamReg.aggregate(
    [
      { 
          "$unwind" : "$event"
      }, 
      { 
          "$group" : {
              "_id" : {
                  "event" : "$event", 
                  "category" : "$Category"
              }, 
              "count" : {
                  "$sum" : 1.0
              }
          }
      }, 
      { 
          "$project" : {
              "event" : "$_id.event", 
              "category" : "$_id.category", 
              "count" : 1.0,
              "_id" : 0
          }
      },
      {
        "$group" : {
          "_id" : "$category",
          "eventlist" : {
            "$push" : {
              "count" : "$count",
              "event" : "$event"
            }
          }
        }
      },
      { 
          "$sort" : {
              "_id" : 1.0
          }
      }
  ])

  try {
      var resolved = await Promise.all([individualPromise, teamPromise])
  }
  catch(err){
    console.log(err)
  }

  var individualStats = resolved[0];
  var teamStats = resolved[1];

  res.render('index', {individualStats, teamStats})
});

module.exports = router;
