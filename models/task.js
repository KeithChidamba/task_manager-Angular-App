const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
mongoose.Promise = global.Promise;
const User = require('../models/user');

let valid_due_date = (Task_due_date)=>{
    if(!Task_due_date){
        return false;
    }else{
        const regExp = new RegExp(/[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/);
        return regExp.test(Task_due_date);
    }
}

let task_user_validate = async(task_belongs_to) =>{
    if(!task_belongs_to){
        return false;
    }else{
        const user = await User.findOne({username:task_belongs_to.toLowerCase()}).clone();
        if(user){
            return true;
        }else{
            return false;
        }
    }
}

let task_description_length = (task_description) =>{
    if(!task_description){
       return false;
    }else{
        if (task_description.length < 5 || task_description.length>80)
        {
            return false;
        }else{
            return true;
        }
    }
}

let task_name_length = (task_name) =>{
    if(!task_name){
       return false;
    }else{
        if (task_name.length < 5 || task_name.length>20)
        {
            return false;
        }else{
            return true;
        }
    }
}
let task_bt_validator = [
    {validator: task_user_validate, message:'that user does not exist'}
]
let task_due_validator = [
    {validator: valid_due_date, message:'invalid date'}
]
let task_descrip_validator = [
    {validator: task_description_length, message:'task description must be between 5 and 80 characterss'}
]
let task_name_validator = [
    {validator: task_name_length, message:'task name must be between 5 and 15 characterss'}
]
const task_Schema = new Schema({
    task_name:{type: String,required:true,unique:true,lowercase:true, validate: task_name_validator},
    task_description:{type: String,required:true,unique:true,lowercase:true, validate: task_descrip_validator},
    Task_due_date:{type: String,required:true,lowercase:true, validate:task_due_validator},
    task_belongs_to:{type: String,required:true,lowercase:true, validate:task_bt_validator}
  });
  module.exports= mongoose.model('task',task_Schema);