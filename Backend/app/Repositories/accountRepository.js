import UserModel from "../Models/userModel";
import jwt from 'jsonwebtoken';
import {Language} from '../Constants/constants';
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
        obj['goals'] = [{'day':'Mo','hours':0},{'day':'Tu','hours':0},
        {'day':'We','hours':0},{'day':'Th','hours':0},{'day':'Fr','hours':0},
        {'day':'Sa','hours':0},{'day':'Su','hours':0}] 
        obj['current_week'] = [
        {'day':'Mo','coding_hours':0,'reading_hours':0,'lines':0,'word_typed':0},
        {'day':'Tu','coding_hours':0,'reading_hours':0,'lines':0,'word_typed':0},
        {'day':'We','coding_hours':0,'reading_hours':0,'lines':0,'word_typed':0},
        {'day':'Th','coding_hours':0,'reading_hours':0,'lines':0,'word_typed':0},
        {'day':'Fr','coding_hours':0,'reading_hours':0,'lines':0,'word_typed':0},
        {'day':'Sa','coding_hours':0,'reading_hours':0,'lines':0,'word_typed':0},
        {'day':'Su','coding_hours':0,'reading_hours':0,'lines':0,'word_typed':0}
    ]        
        obj['last_week'] = [
            {'day':'Mo','coding_hours':0,'reading_hours':0,'lines':0,'word_typed':0},
            {'day':'Tu','coding_hours':0,'reading_hours':0,'lines':0,'word_typed':0},
            {'day':'We','coding_hours':0,'reading_hours':0,'lines':0,'word_typed':0},
            {'day':'Th','coding_hours':0,'reading_hours':0,'lines':0,'word_typed':0},
            {'day':'Fr','coding_hours':0,'reading_hours':0,'lines':0,'word_typed':0},
            {'day':'Sa','coding_hours':0,'reading_hours':0,'lines':0,'word_typed':0},
            {'day':'Su','coding_hours':0,'reading_hours':0,'lines':0,'word_typed':0}
        ]
        obj['language'] = Language;
        const userModel = new UserModel(obj)
        let userDetails;
        let token;
        try{
            userDetails =  await userModel.save();
            token = jwt.sign({userid:userDetails.id,email:userDetails.email},process.env.secretcode,{expiresIn:'7d'});
        } catch (error) {
            return "error at adding"
        }
        return {"success":true,"token":token,userId:userDetails._id};
    }

}