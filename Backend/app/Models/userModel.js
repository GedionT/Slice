const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema=  mongoose.Schema;

const userschema = new schema({
    name: {type :String },
    githubUsername: {type :String },
    email: {type :String,},
    password: {type :String },
    number:{type :String,required:false},
},{
    versionKey: false 
  });

userschema.plugin(uniqueValidator);

module.exports = mongoose.models['User'] || mongoose.model("User", userschema)