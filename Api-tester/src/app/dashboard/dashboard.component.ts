import { Component,OnInit } from '@angular/core';
import { TaskManagerService } from '../services/task-manager.service';
import {tasks } from '../interfaces/tasks';
import { task } from '../interfaces/task';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { task_operation } from '../interfaces/task_operation';
import { User } from '../interfaces/userInt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private dp:DatePipe ,public task_m:TaskManagerService,private auth:AuthService,private fb:FormBuilder){}

  task_operation_instance:task_operation={
    task_name:'',
    task_description:'',
    task_belongs_to:'',
    Task_due_date:''
  }
  task_instance:task={
    task_number:0,
    task_name:'',
    task_description:'',
    task_belongs_to:'',
    Task_due_date:''
  }
  retrieve_task:User={
    username:'',
    email:'',
    password:'',
  }
  err = false;
  checkingValidity =false;
  errorAlert='';
  loaded_user =false;  
  tasks_ = tasks;
  Adding_task=false;
  viewing_task=0;
  username='';

  Task_Form = this.fb.group({
    task_name : ['', Validators.compose([
      Validators.minLength(5),
      Validators.maxLength(15),
      Validators.required
    ])],
    task_description : ['', Validators.compose([
      Validators.minLength(5),
      Validators.maxLength(80),
      Validators.required
    ])],
    Task_due_date : ['', Validators.compose([
      Validators.required,
    ])],
  });

  ngOnInit(){
    this.tasks_ = [];
    if(!this.loaded_user){
      this.auth.getProfile().subscribe(
        (profile)=>{
          this.load_user(profile);
        },
        (error)=>{
          this.err = true;
          this.errorAlert = error;
        }
      );
    }
  }
  Reload_tasks(){
    this.tasks_ = [];
    this.Get_tasks();
  }
  load_user(info:any){
    this.username =JSON.stringify(info.name).slice(1, -1);
    this.retrieve_task.username =this.username;
    this.loaded_user = true;
    this.Get_tasks();
  } 

  load_task(info:any){
    let t = JSON.parse(JSON.stringify(info));
    for (let i=0;i<t.tasks.length;){
      this.task_instance = {
        task_number:i+1,
        task_name:t.tasks[i].task_name,
        task_description:t.tasks[i].task_description,
        Task_due_date:t.tasks[i].Task_due_date,
        task_belongs_to:t.tasks[i].task_belongs_to
      }
      this.tasks_.push(this.task_instance);
      i=i+1;
    } 
  }


  Get_tasks(){
    if(this.loaded_user){
      this.task_m.GetTasks(this.retrieve_task).subscribe(
        (tasks)=>{
          this.load_task(tasks);
        },
        (error)=>{
          this.err = true;
          this.errorAlert = error;
        }
      );
    }
  }
  Complete_task(task_name_:string){
      //play completion animation
      //dete task
      setTimeout(()=>{
        this.remove_task(task_name_);
      },500);
  }
  Add_task(){
    this.checkingValidity =true;
    if(this.Task_Form.valid){
      this.task_operation_instance={
        task_name:this.Task_Form.get('task_name')?.value,
        task_description:this.Task_Form.get('task_description')?.value,
        Task_due_date:this.Task_Form.get('Task_due_date')?.value, 
        task_belongs_to:this.username
      }
      this.task_m.Add_Task(this.task_operation_instance).subscribe(
        (data)=>{
          console.log(data)
          this.Add_task_View(false);
        },
        (error)=>{
          this.err = true;
          this.errorAlert = error;
        }
      );

    }

  }
  remove_task(task_name:string){
    this.task_operation_instance.task_name =task_name;
    this.task_m.Delete_task(this.task_operation_instance).subscribe();
    setTimeout(()=>{
      this.Reload_tasks();
    },500);
  }
  Show_task_description(task_num:number){
    if(this.viewing_task==task_num){
      this.viewing_task =0;
    }else{
      this.viewing_task = task_num;
    }
  }
  Add_task_View(set:boolean){
    this.Adding_task=set;
    if(!set){
      setTimeout(()=>{
        this.Reload_tasks();
      },500);
    }
  }



    
  
}
