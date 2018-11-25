var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var teamRegSchema = new Schema({
        name1:{
            type:String,
            required: true
        },
        name2:{
            type:String,
            required: true
        },
        name3:{
            type:String,
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

var teamReg = mongoose.model('teamReg',teamRegSchema);
module.exports = teamReg;