import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { task } from '../interfaces/task';
@Injectable({
  providedIn: 'root'
})
export class DateManagerService {

  constructor(private dp:DatePipe) {}
   _date = new Date();
   current_date ='';
   yesterday = '';
   tomorrow = '';
   Get_yesterday(){
        let yesterday_ = new Date();
        yesterday_.setDate(this._date.getDate()-1);
        let format_yesterday = this.dp.transform(yesterday_, 'yyyy-MM-dd');
        if(format_yesterday!=null){
          this.yesterday = format_yesterday;
        }
        return this.yesterday;
   }
   Get_today(){
    let format_today =this.dp.transform(this._date, 'yyyy-MM-dd');
    if(format_today!=null){
      this.current_date = format_today;
    }
    return this.current_date;
   }
   Get_tomorrow(){
    let tomorrow_ = new Date();
    tomorrow_.setDate(this._date.getDate()+1);
    let format_tomorrow = this.dp.transform(tomorrow_, 'yyyy-MM-dd');
    if(format_tomorrow!=null){
      this.tomorrow = format_tomorrow;
    }
    return this.tomorrow;
   }
   Get_task_Due_Day(task:task){
    let due_date = new Date(task.Task_due_date);
    let d = this.dp.transform(due_date, 'cccc');
    return d;
   }
}
