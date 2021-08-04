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
        }
    }
    async fetch(args) {
        try {
            
        } catch (error) {
        throw error;
        }
    }
}