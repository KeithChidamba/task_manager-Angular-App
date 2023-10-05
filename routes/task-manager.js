const jwt= require('jsonwebtoken');
const config = require('../config/database');
const Task =require('../models/task');

module.exports = (router) => {

    router.post('/tasks',async(req,res)=>{
        const task = await Task.find({task_belongs_to:req.body.username}).select('task_name task_description Task_due_date').exec((err,task)=>{
            if(err){
                res.json({success: false, message:err});  
            }else{
                if(!task){
                    res.json({success: false, message:"no tasks"});
                }else{
                    res.json({tasks:task});
                }
            }
        })
    });

    router.post('/add_task',(req,res)=>{
        if(!req.body.task_name){
            res.json({success: false, message:"task_name required"})
        }
        else if(!req.body.Task_due_date){
                res.json({success: false, message:"Task_due_date required"})
            }
        else if(!req.body.task_description){
                    res.json({success: false, message:"task_description required"})
                } 
        else if(!req.body.task_belongs_to){
            res.json({success: false, message:"task_belongs_to required"})
        } 
        else{
        let task = new Task({
            task_name:req.body.task_name.toLowerCase(),
            task_description:req.body.task_description.toLowerCase(),
            Task_due_date:req.body.Task_due_date,
            task_belongs_to:req.body.task_belongs_to.toLowerCase()
        });
        
        task.save((err)=>{
            if(err){
                if(err.code ===11000){
                    return res.status(422).send(["task already exists"]);
                }else{
                    res.json({success: false, message:"task not added",err});
                }
            }
            else{
                res.json({success: true, message:"task added"});
            }
        });
    }
    });
    router.post('/remove_task',async(req,res)=>{
        Task.deleteMany({task_name:req.body.task_name}, (err,del)=>{
            if(err){
                return res.status(400).send(["encountered Error",err]);
           }else{
                console.log('deleted: ',del);
           }
        });
    });
    
    return router;
}
