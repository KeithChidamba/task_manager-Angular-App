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

  created_task:task_operation={
    task_name:'',
    task_description:'',
    task_belongs_to:'',
    Task_due_date:'',
    task_completed:false
  }
  retrieve_task:User={
    username:'',
    email:'',
    password:'',
  }
  loaded_user =false;  
  tasks_ = tasks;
  Adding_task=false;
  viewing_task=0;
  username='';

  Task_Form = this.fb.group({
    task_name : ['', Validators.compose([
      Validators.minLength(5),
      Validators.maxLength(15),
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]+$/)
    ])],
    task_description : ['', Validators.compose([
      Validators.minLength(5),
      Validators.maxLength(80),
      Validators.required
    ])],
    Task_due_date : [Date, Validators.compose([
      Validators.minLength(8),
      Validators.pattern(/[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/),
      Validators.maxLength(8),
      Validators.required
    ])],
  });

  ngOnInit(){
    this.tasks_ = [];
    if(!this.loaded_user){
      this.auth.getProfile().subscribe(
        (profile)=>{
          this.load_user(profile);
        }
      );
    }
  }

  load_user(info:any){
    this.username =JSON.stringify(info.name).slice(1, -1);
    this.retrieve_task = {
      username:this.username,
      password:'',
      email:''
    }
    this.loaded_user = true;
    this.Get_tasks();
  } 

  load_task(info:any){
    let t = JSON.parse(JSON.stringify(info));
    for (let i=0;i<t.tasks.length;){
      let ta:task = {
        task_number:i+1,
        task_name:t.tasks[i].task_name,
        task_description:t.tasks[i].task_description,
        Task_due_date:t.tasks[i].Task_due_date,
        task_belongs_to:t.tasks[i].task_belongs_to,
        task_completed:false
      }
      this.tasks_.push(ta);
      i=i+1;
    } 
  }


  Get_tasks(){
    if(this.loaded_user){
      this.task_m.GetTasks(this.retrieve_task).subscribe(
        (tasks)=>{
          this.load_task(tasks);
          console.log(tasks);
        },
        (error)=>{
          console.log(error)
        }
      );
    }
  }

  Add_task(){
    //if form valid
    //if(this.Task_Form.valid){
      this.created_task={
        task_name:this.Task_Form.get('task_name')?.value,
        task_description:this.Task_Form.get('task_description')?.value,
        Task_due_date:this.Task_Form.get('Task_due_date')?.value, 
        task_belongs_to:this.username,
        task_completed:false
      }
      this.task_m.Add_Task(this.created_task).subscribe(
        (data)=>{
          console.log(data)
        }
      );

      this.Add_task_View(false);
    //}

  }
  remove_task(task_name:string){
    let t:task_operation={
      task_name:task_name,
      task_description:'',
      task_belongs_to:'',
      Task_due_date:'',
      task_completed:false
    }
    this.task_m.Delete_task(t).subscribe(
      (result)=>{
        console.log(result)
      },
      (error)=>{
        console.log(error)
      }
    );

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
  }



    
  
}
