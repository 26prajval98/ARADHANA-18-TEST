var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://aradhana18:aradhana18@ds046027.mlab.com:46027/registration_team';
var teamReg = function(app){
    app.get('/teamReg',function(req,res){
        console.log(req.body);
        res.render('teamReg',{qs:req.query});
    });
    app.post('/teamReg',function(req,res){
        var myObj = req.body;
        var names1 = myObj.name1;
        var names2 = myObj.name2;
        var names3 = myObj.name3;
        var classes1=myObj.class1;
        var classes2=myObj.class2;
        var classes3=myObj.class3;
        if(!Array.isArray(names1)){
            names1 = [];
            names1.push(myObj.name1);
            names2 = [];
            names2.push(myObj.name2);
            names3 = [];
            names3.push(myObj.name3);
            classes1 = [];
            classes1.push(myObj.class1);
            classes2 = [];
            classes2.push(myObj.class2);
            classes3 = [];
            classes3.push(myObj.class3);
        }       
        
        var Arr = [];
        
        for(var i=0; i<names1.length; i++){
            var obj = {};
            obj.name1 = names1[i];
            obj.class1 = classes1[i];
            obj.name2 = names2[i];
            obj.class2 = classes2[i];
            obj.name3 = names3[i];
            obj.class3 = classes3[i];
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
                res.render('successful',{count : count, str : "team(s)"});
                //RES.send('done');
            });
        });
    });
}
module.exports = teamReg;