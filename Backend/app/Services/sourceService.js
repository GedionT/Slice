import GroupRepository from '../Repositories/groupRepository';
import * as Exceptions from '../Exceptions/exceptions';
import SourceRepository from '../Repositories/sourceRepositroy';
export default class AccountService{
    constructor() {
        this.repository = new SourceRepository();
    }


    async deleteSource(args) {
        try {
            const reply =  await this.repository.deleteSource(args);
            return reply;
        } catch (error) {
            throw error;
        }
    }



    async createSource(args) {
        try {
            await this.repository.createSource(args);
            return {message: 'Group Created!',success: true}
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding creating source"));
        }
    }


    async verifyUserDetail(args) {
        try {
            let accountInfo = await this.repository.findUser(args);
            return accountInfo;
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding user details"));
        }
    }


    async getSources(args){
        try {
            let sourceInfo = await this.repository.findGroup(args);
            return {'source':sourceInfo.sources};
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding sources"));
        }
    }

    async getSourceDetails(args){
        try {
            console.log(args)
            let sourceInfo = await this.repository.findSource(args);
            return {'source':sourceInfo};
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding sources"));
        }
    }
}