import { Component,OnInit } from '@angular/core';
import { TaskManagerService } from '../services/task-manager.service';
import {tasks } from '../interfaces/tasks';
import { task } from '../interfaces/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(public task_m:TaskManagerService){}
  tasks_ = tasks;
  ngOnInit(){
      this.task_m.GetTasks().subscribe(
        (tasks)=>{
          this.load(tasks)
        }
      )
  }
  load(info:any){
    let t = JSON.parse(JSON.stringify(info));
    for (let i=0;i<t.tasks.length;){
      let ta:task = {
        task_name:t.tasks[i].task_name,
        task_description:t.tasks[i].task_description,
        due_date:t.tasks[i].date,
        Task_belongs_to:t.tasks[i].task_belongs_to,
        task_completed:false
      }
      this.tasks_.push(ta);
      i=i+1;
    } 
    }
    
  
}
