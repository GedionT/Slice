import AccountRepository from '../Repositories/accountRepository.js';
import * as Exceptions from '../Exceptions/exceptions';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class AccountService{
    constructor() {
        this.repository = new AccountRepository();
    }
    async addAccount(args) {
        try {
            const {number,username,email,githubUsername}=args
            let verifyUsername =  await this.verifyUsername(githubUsername)
            if(verifyUsername){
                throw (new Exceptions.ConflictException("Username already exists"));
            } 
            let hasedPassword = await bycrypt.hash(args.password,12)
            args.password = hasedPassword
            let accountInfo = await this.repository.addUser(args);
            return accountInfo
        } catch (error) {
        throw error;
        }
    }
    async loginAccount(args) {
        try {
            const {username}=args
            let profile = await this.verifyUsername({username})
            if (!profile) {
                throw (new Exceptions.ConflictException("Username doesn't exist"));
            }
            let isvalidpassword = await bycrypt.compare(args.password,profile.password);
            if(!isvalidpassword) {
                throw (new Exceptions.ConflictException("Password doesn't match"));
            }
            let token = jwt.sign({userid:profile.id,email:profile.email},process.env.secretcode,{expiresIn:'300d'});
            return {message: 'Logged in!',success: true,userid:profile.id,email:profile.email,token:token}
        } catch (error) {
        throw error;
        }
    }


    async verifyUsername(args) {
        try {
            let accountInfo = await this.repository.findUsername(args);
            return accountInfo;
        } catch (error) {
        throw error;
        }
    }

    async findUid (args) {
        try {
            console.log("fsdf")
            return await this.repository.findUid(args);
        } catch(error){
            throw error;
        }
    }

    async verifyUserDetail(args) {
        try {
            let accountInfo = await this.repository.findUserDetail(args);
            return accountInfo;
        } catch (error) {
        throw (new Exceptions.ValidationException("Error finding user details"));
        }
    }
}