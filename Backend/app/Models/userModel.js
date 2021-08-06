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
    current_week:[{day:String,coding_hours:Number,reading_hours:Number,lines:Number,word_typed:Number}],
    last_week:[{day:String,coding_hours:Number,reading_hours:Number,lines:Number,word_typed:Number}],
    language: {type:Object}
},{
    versionKey: false 
  });

userschema.plugin(uniqueValidator);

module.exports = mongoose.models['User'] || mongoose.model("User", userschema)