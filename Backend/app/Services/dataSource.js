import DataRepository from '../Repositories/dataRepository';
import * as Exceptions from '../Exceptions/exceptions';
import csv from 'csvtojson';

const fs=require('fs');
var path = require('path');
import parse from 'csv-parse';
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

export default class DataService{
    constructor() {
        this.repository = new DataRepository();
    }
    async create (args) {
        try {
            console.log(args)
            await csv()
                .fromFile(args.path)
                .then(function(jsonArrayObj){ //when parse finished, result will be emitted here.
                    console.log(jsonArrayObj); 
                })
            await unlinkAsync(args.path)
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