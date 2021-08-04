import UserModel from "../Models/userModel";
import jwt from 'jsonwebtoken';

export default class AccountRepository {
    async findUserDetail(obj){
        try {
            const found = await UserModel.findOne(obj,'-password')
            return found;
        } catch (error) {
            return "error at finding"
        }
    }
    async findUsername(obj){
        try {
            const found = await UserModel.findOne({githubUsername:obj})
            return found;
        } catch (error) {
            return "error at finding"
        }
    }
    async edit(obj){
        try {
            const found = await obj.save();
            return found;
        } catch (error) {
            console.log(error)
            return "error at finding"
        }
    }
    async addUser(obj){
        obj['goals'] = [{'day':'Monday','hours':0},{'day':'Tuesday','hours':0},
        {'day':'Wednesday','hours':0},{'day':'Thursday','hours':0},{'day':'Friday','hours':0},
        {'day':'Saturday','hours':0},{'day':'Sunday','hours':0}] 
        obj['current_week'] = [{'day':'Monday','hours':0},{'day':'Tuesday','hours':0},
        {'day':'Wednesday','hours':0},{'day':'Thursday','hours':0},{'day':'Friday','hours':0},
        {'day':'Saturday','hours':0},{'day':'Sunday','hours':0}]        
        obj['last_week'] = [{'day':'Monday','hours':0},{'day':'Tuesday','hours':0},
        {'day':'Wednesday','hours':0},{'day':'Thursday','hours':0},{'day':'Friday','hours':0},
        {'day':'Saturday','hours':0},{'day':'Sunday','hours':0}]
        const userModel = new UserModel(obj)
        let userDetails;
        let token;
        try{
            userDetails =  await userModel.save();
            token = jwt.sign({userid:userDetails.id,email:userDetails.email},process.env.secretcode,{expiresIn:'7d'});
        } catch (error) {
            return "error at adding"
        }
        return {"success":true,"token":"token"};
    }

}