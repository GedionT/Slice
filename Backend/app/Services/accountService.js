import AccountRepository from '../Repositories/accountRepository';
import * as Exceptions from '../Exceptions/exceptions';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class AccountService{
    constructor() {
        this.repository = new AccountRepository();
    }
    async addAccount(args) {
        try {
            const {email,githubUsername,number}=args;
            let verifyUsername =  await this.verifyUsername(githubUsername);
            let verifyNumber =  number?await this.verifyUserDetail({number:number}):number;
            let verifyEmail =  await this.verifyUserDetail({email:email});
            if(verifyUsername){
                throw (new Exceptions.ConflictException("This Github user with same username already exists"));
            }if(verifyNumber){
                throw (new Exceptions.ConflictException("This Github user with same number already exists"));
            }if(verifyEmail){
                throw (new Exceptions.ConflictException("This Github user with same email already exists"));
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
            const {githubUsername}=args
            let profile = await this.verifyUsername(githubUsername)
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
    async verifyUserDetail(args) {
        try {
            let accountInfo = await this.repository.findUserDetail(args);
            return accountInfo;
        } catch (error) {
        throw (new Exceptions.ValidationException("Error finding user details"));
        }
    }
}