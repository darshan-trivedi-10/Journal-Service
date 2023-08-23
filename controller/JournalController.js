import { StatusCodes } from "http-status-codes";

import { Journal } from "../model/index.js";

class JournalController{

    constructor(){
        this.journal = new Journal();
    }

    async print(){
        console.log(this.journal);
    }

    async create(req, res){
    }

    async update(req, res){

    }

    async delete(req, res){
        
    }
}


export default JournalController;