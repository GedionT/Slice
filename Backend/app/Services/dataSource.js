import DataRepository from '../Repositories/dataRepository';
import csv from 'csvtojson';
import {DAY_TYPE} from '../Constants/constants';
const fs=require('fs');
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

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
            for(var item in data_recieved){
                var day = Date(data_recieved[item]['time']).substr(0,2);
                if(data_recieved[item]['type']=="'open'"){
                    userInfo.current_week[DAY_TYPE[day]].reading_hours+=(Number(data_recieved[item]['long'])/1000)/3600;///adding data to the specified date reading hours
                }else{

                    userInfo.current_week[DAY_TYPE[day]].coding_hours+=(Number(data_recieved[item]['long'])/1000)/3600;///adding data to the specified date coding hours
                }
            }
            // const result = await this.repository.saveUserInfo(userInfo);
            console.log(userInfo)
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async fetch(type,uid) {
        try {
            const userDetail = await this.repository.findUserDetail(uid);
            const daily=[];
            const goals=[];
            const past=[];
            for(var day in userDetail.current_week){
                daily.push(userDetail.current_week[day]['hours'])
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
                    past.push(userDetail.last_week[day]['hours'])
                }
                return {daily_hours:daily,last_week:past};
            }
        } catch (error) {
        throw error;
        }
    }
}