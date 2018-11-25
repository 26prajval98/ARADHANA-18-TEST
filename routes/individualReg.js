var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://aradhana18:aradhana2018@ds033196.mlab.com:33196/registration_individual_category1';

var individualReg = function(app){
    app.get('/individualReg',function(req,res){        
        console.log(req.body);
        res.render('individualReg',{qs:req.query});
    });
    app.post('/individualReg',function(req,res){
        var myObj = req.body;
        var names = myObj.name;
        var classes=myObj.class;
        if(!Array.isArray(names)){
            names = [];
            names.push(myObj.name);
            classes = [];
            classes.push(myObj.class);
        }
        var Arr = [];
        for(var i=0; i<names.length; i++){
            var obj = {};
            obj.name = names[i];
            obj.class = classes[i];
            obj.school = myObj.school;
            obj.ph = myObj.ph;
            obj.event = myObj.event;
            obj.category = myObj.category;
            Arr.push(obj);
        }
        console.log(Arr);
        MongoClient.connect(url,(err,db)=>{
            if(err) throw err;
            console.log(Arr);
            db.collection(Arr[0].category).insertMany(Arr,(err,result)=>{
                if(err) throw err;
                count =  result.insertedCount;
                console.log("inserted: "+ result.insertedCount);
                db.close();
                console.log("count is "+ count);
                res.render('successful',{count : count, str:"student(s)"});
                //RES.send('done');
            });
        }); 
    });
}
module.exports = individualReg;