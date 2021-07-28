import GroupModel from "../Models/groupModel";
import UserModel from "../Models/userModel";
import Transaction from "../Models/transaction";
import mongoose from 'mongoose';
mongoose.models = {GroupModel,UserModel}

export default class GroupRepository {
    async findUser (obj) {
        try {
            const found = await UserModel.findById(obj)
            return found;
        } catch (error) {
            throw error
        }
    }


    async findGroup (obj) {
        try {
            const found = await GroupModel.find(obj);
            return found;
        } catch (error) {
            throw error
        }
    }


    async addUserToGroup (args,verifyGroupId,verifyUserId) {
        try {
            const newTransaction = new Transaction(args);
            const sess = await mongoose.startSession();
            sess.startTransaction();      
            await newTransaction.save(); 
            console.log(verifyUserId,verifyGroupId,newTransaction)
            verifyGroupId.groupPayment.push(newTransaction._id); 
            verifyGroupId.members.push(verifyUserId._id);
            verifyUserId.groups.push(verifyGroupId._id); 
            verifyUserId.transaction.push(newTransaction._id); 
            console.log(verifyUserId,verifyGroupId,newTransaction)
            await verifyGroupId.save({ session: sess }); 
            await verifyUserId.save({ session: sess }); 
            await sess.commitTransaction(); 
            return "Joined";
        } catch (error) {
            throw error
        }
    }


    async createGroup (obj) {
        const {groupName,description,genre,duration,amount,userId}=obj
        const groupModel = new GroupModel({groupName,
            description,
            genre,
            duration,
            amount,
            profit:[],
            members:[userId],
            groupOwner: userId,
            groupPayment:[],
            sources: []
        })
        let ownerDetails;
        try{
            ownerDetails = await UserModel.findById(userId);
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await groupModel.save({ session: sess }); 
            ownerDetails.groups.push(groupModel._id); 
            await ownerDetails.save({ session: sess }); 
            await sess.commitTransaction(); 
        } catch (error) {
            throw error
        }
        return {"success":true};
    }

}
