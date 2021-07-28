const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema=  mongoose.Schema;

const transactionSchema = new schema({
    amount:{type : Number},
    groupId: {type :mongoose.Types.ObjectId,required:true,ref:'Group'},
    userId:{type :mongoose.Types.ObjectId,required:true,ref:'User'},
},{
    versionKey: false 
  });

  transactionSchema.plugin(uniqueValidator);

module.exports = mongoose.models['Transaction'] || mongoose.model("Transaction", transactionSchema)