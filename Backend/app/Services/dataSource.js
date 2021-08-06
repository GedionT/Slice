import DataRepository from '../Repositories/dataRepository';
import csv from 'csvtojson';
import {DAY_TYPE,MONDAY,Language_SET} from '../Constants/constants';
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
                        

                        ///adding the language hours
                        if(typeof(userInfo.language[Language_SET[langage]])!='undefined'){ 
                            userInfo.language[Language_SET[langage]-1]['long'] += (Number(data_recieved[item]['long'])/1000)/3600;
                        }// }else{
                        //     userInfo.language = {[langage] : (Number(data_recieved[item]['long'])/1000)/3600};
                        // }
                        userInfo.current_week[DAY_TYPE[day]].word_typed+=(Number(data_recieved[item]['char']));
                        userInfo.current_week[DAY_TYPE[day]].coding_hours+=(Number(data_recieved[item]['long'])/1000)/3600;///adding data to the specified date coding hours
                    }
            
            // const result = await this.repository.saveUserInfo(userInfo);
                     await this.repository.saveUserInfo(userInfo);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    async fetch(type,uid,context) {
        try {
            const userDetail = await this.repository.findUserDetail(uid);
            const daily=[];
            const goals=[];
            const past=[];
            const daily_read=[];
            const past_read=[];


            for(var day in userDetail.current_week){
                daily.push(userDetail.current_week[day]['coding_hours'])
            }
            if(context=="code"){
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
            }
           else if(context=="read"){
                for(var day in userDetail.current_week){
                    daily_read.push(userDetail.current_week[day]['reading_hours'])
                }
                for(var day in userDetail.last_week){
                    past_read.push(userDetail.last_week[day]['reading_hours'])
                }
                console.log(daily_read,past_read)
                return {daily_read:daily_read,past_read:past_read};
            } 
    }catch (error) {
        throw error;
        }
    }


    async fetchData(type,uid) {
        try {
            const userDetail = await this.repository.findUserDetail(uid);
            const language_arr=[];
            const effeciency=[];
            if(type=="language"){
                for(var index in userDetail.language){
                    if(userDetail.language[index]['long']){
                        var language_ = userDetail.language[index]['language'];
                        var hours = userDetail.language[index]['long'];
                        language_arr.push({[language_]:hours})
                    }
                }
                return {"language":language_arr};
            }
           else if(type=="efficiency"){
                for(var day in userDetail.current_week){
                    var hours = userDetail.current_week[day]['coding_hours'];
                    var codes = userDetail.current_week[day]['word_typed'];
                    if(hours==0){
                        effeciency.push(0);
                    }else{
                        effeciency.push(codes/hours);
                    }
                }
                return {"effeciency":effeciency};
            } 
    }catch (error) {
        throw error;
        }
    }



    async send(uid) {           ///this is the prgress report of the user sent via sms
        try {
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;
            const client = require('twilio')(accountSid, authToken);
            const userInfo = await this.repository.findUserDetail(uid)
            if(userInfo['number']){
                let total_code_hours_current=0;
                let total_read_hours_past=0;
                let total_read_hours_current=0;
                let total_code_hours_last=0;
                let total_code_hours_goal=0;


                for(var day in userInfo['current_week']){
                    total_code_hours_current += userInfo.current_week[day]['coding_hours'] 
                }

                for(var day in userInfo['last_week']){
                    total_code_hours_last += userInfo.last_week[day]['coding_hours'] 
                }
                for(var day in userInfo['goals']){
                    total_code_hours_goal += userInfo.goals[day]['hours'] 
                }
                for(var day in userInfo['last_week']){
                    total_read_hours_past += userInfo.current_week[day]['word_typed'] 
                }
                for(var day in userInfo['current_week']){
                    total_read_hours_current += userInfo.current_week[day]['word_typed'] 
                }


                let message_goal ="";


                if(total_code_hours_goal>total_code_hours_current){
                    message_goal += `Unfortunately you lagged behind your weekly goal by ${total_code_hours_goal-total_code_hours_current} hours. `
                }else{
                    message_goal += `Wow! you crossed your goals by ${total_code_hours_current-total_code_hours_goal} hours. `
                }
                
                if(total_code_hours_last>total_code_hours_current){
                    message_goal += `Unfortunately you lagged behind your previous performance ${total_code_hours_last-total_code_hours_current} hours. `
                }else{
                    message_goal += `Wow! you crossed your last week performance by ${total_code_hours_current-total_code_hours_last} hours. `
                }

                if(total_read_hours_past>total_read_hours_current){
                    message_goal += `Unfortunately you lagged behind your previous goal ${total_read_hours_past-total_read_hours_current} hours. `
                }else{
                    message_goal += `Wow! you crossed your last week performance by ${total_read_hours_current-total_read_hours_past} hours. `
                }
            client.messages
              .create({
                 body: `${message_goal}`,
                 from: `+${process.env.phone}`,
                 to: `${userInfo['number']}`
               })
              .then(message => console.log(message.sid)).catch(err =>
                  console.log(err)
              );
            }
            else{
                return {"Message":"Please add your phone number"}
            }
            return "success"
        } catch (error) {
            console.log(error)
        }
    }
}