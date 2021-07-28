const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema=  mongoose.Schema;

const groupSchema = new schema({
    groupName: {type :String },
    description: {type :String },
    genre: {type :String},
    duration: {type :String },
    amount: {type :Number},
    profit: [{type: Number,required: false}],
    members: [{type :mongoose.Types.ObjectId,required:false,ref:'User'}],
    groupOwner: {type :mongoose.Types.ObjectId,required:false,ref:'User'},
    groupPayment: [{type :mongoose.Types.ObjectId,required:false,ref:'User'}],
    sources: [{type :mongoose.Types.ObjectId,required:false,ref:'Source'}],
},{
    versionKey: false 
  });

groupSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Group',groupSchema);