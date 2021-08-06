import UserModel from "../Models/userModel";
                                                                                          
export default class DataRepository {
    async findUserDetail(obj){
        try {
            return await UserModel.findById(obj);
        } catch (error) {
            return ""
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
            const saved =  await obj.save();
            return saved;
        } catch (error) {
            console.log(error)
            return "error at adding"
        }
        
    }

}