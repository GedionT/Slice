import UserModel from "../Models/userModel";
import jwt from 'jsonwebtoken';

export default class DataRepository {
    async findUserDetail(obj){
        try {
            return await UserModel.findById(obj);
        } catch (error) {
            return "error at finding"
        }
    }
    async findUsername(obj){
        try {
            
        } catch (error) {
            return "error at finding"
        }
    }
    async addUser(obj){
        try{
            
        } catch (error) {
            return "error at adding"
        }
        
    }

}