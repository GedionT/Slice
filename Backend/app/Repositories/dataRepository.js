import UserModel from "../Models/userModel";
                                                                                          
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
    async saveUserInfo(obj){
        try{
            return await obj.save();
        } catch (error) {
            return "error at adding"
        }
        
    }

}