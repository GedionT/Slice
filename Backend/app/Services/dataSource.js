import DataRepository from '../Repositories/dataRepository';
import * as Exceptions from '../Exceptions/exceptions';
const fs=require('fs');
var path = require('path');
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

export default class DataService{
    constructor() {
        this.repository = new DataRepository();
    }
    async create (args) {
        try {
            console.log(args)
            await unlinkAsync(args.path)
        } catch (error) {
        throw error;
        }
    }
    async fetch(args) {
        try {
            
        } catch (error) {
        throw error;
        }
    }
}