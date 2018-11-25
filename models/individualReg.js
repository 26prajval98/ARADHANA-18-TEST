var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var individualRegSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    school:{
        type:String,
        required: true
    },
    class:{
        type:Number,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    event: {
        type: Array,
        required: true
    },    
    email:{
        type:String,
    }
},{
    timestamps:true
});

var individualReg = mongoose.model('individualReg',individualRegSchema);
module.exports = individualReg;