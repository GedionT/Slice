import DataRepository from '../Repositories/dataRepository';
import csv from 'csvtojson';
import {DAY_TYPE,MONDAY} from '../Constants/constants';
const fs=require('fs');
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
require("dotenv").config();

export default class DataService{
    constructor() {
        this.repository = new DataRepository();
    }
    async create (args,uid) {
        try {
            const data_recieved = await csv()
                .fromFile(args.path)
                .then(function(jsonArrayObj){ //when parse finished, result will be emitted here.
                    return jsonArrayObj;
                })
            await unlinkAsync(args.path)
            const userInfo = await this.repository.findUserDetail(uid);
            console.log(userInfo)
            if(userInfo){
                for(var item in data_recieved){
                    var day = Date(data_recieved[item]['time']).substr(0,2);
                    if(day=='Mo'){
                        userInfo['last_week']=userInfo['current_week'];
                        userInfo['current_week'] = MONDAY;
                    }
                    if(data_recieved[item]['type']=="'open'"){
                        const langage = data_recieved[item]['lang'].substr(1,data_recieved[item]['lang'].length-2);
                        if(userInfo.language[langage]){
                            userInfo.language[langage] += (Number(data_recieved[item]['long'])/1000)/3600;
                        }else{
                            userInfo.language[langage] = (Number(data_recieved[item]['long'])/1000)/3600;
                        }
                        userInfo.current_week[DAY_TYPE[day]].reading_hours+=(Number(data_recieved[item]['long'])/1000)/3600;///adding data to the specified date reading hours
                    }else{
                        const langage = data_recieved[item]['lang'].substr(1,data_recieved[item]['lang'].length-2);
                        if(userInfo.language[langage]){
                            userInfo.language[langage] += (Number(data_recieved[item]['long'])/1000)/3600;
                        }else{
                            userInfo.language[langage] = (Number(data_recieved[item]['long'])/1000)/3600;
                        }
                        userInfo.current_week[DAY_TYPE[day]].word_typed+=(Number(data_recieved[item]['char']));
                        userInfo.current_week[DAY_TYPE[day]].coding_hours+=(Number(data_recieved[item]['long'])/1000)/3600;///adding data to the specified date coding hours
                    }
            }
            const result = await this.repository.saveUserInfo(userInfo);
        }
        } catch (error) {
            console.log(error);
        }
    }
    async fetch(type,uid) {
        try {
            const userDetail = await this.repository.findUserDetail(uid);
            const daily=[];
            const goals=[];
            const past=[];
            for(var day in userDetail.current_week){
                daily.push(userDetail.current_week[day]['coding_hours'])
            }
            if(type=="current"){
                return {daily_hours:daily};
            }else if(type=="goal"){
                for(var day in userDetail.goals){
                    goals.push(userDetail.goals[day]['hours'])
                }
                return {daily_hours:daily,goals:goals};
            }else if(type=="past"){
                for(var day in userDetail.last_week){
                    past.push(userDetail.last_week[day]['coding_hours'])
                }
                return {daily_hours:daily,last_week:past};
            }
        } catch (error) {
        throw error;
        }
    }
    send(uid) {
        try {
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;
            const client = require('twilio')(accountSid, authToken);
            
            client.messages
              .create({
                 body: 'Welcome to Slice community! we hope to help you become a better verison of yourself',
                 from: `+${process.env.phone}`,
                 to: '+917762827770'
               })
              .then(message => console.log(message.sid)).catch(err =>
                  console.log(err)
              );
            return {success:true}
        } catch (error) {
            console.log(error)
        }
    }
}