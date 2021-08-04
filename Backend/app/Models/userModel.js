const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema=  mongoose.Schema;

const userschema = new schema({
    name: {type :String },
    githubUsername: {type :String },
    email: {type :String,},
    password: {type :String },
    number:{type :String,required:false},
    goals:[{day:String,hours:Number}],
    current_week:[{day:String,hours:Number}],
    last_week:[{day:String,hours:Number}],
},{
    versionKey: false 
  });

userschema.plugin(uniqueValidator);

module.exports = mongoose.models['User'] || mongoose.model("User", userschema)