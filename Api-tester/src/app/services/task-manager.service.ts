import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpEvent} from "@angular/common/http";
import { User } from '../interfaces/userInt';
import { catchError,throwError} from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { DatePipe } from '@angular/common';
import { task } from '../interfaces/task';
import { task_operation } from '../interfaces/task_operation';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  constructor(private auth:AuthService,private http:HttpClient) { }
  Complete_Task(task_:task_operation){
    return this.http.post<task_operation>(this.auth.domain+ '/task-manager/Complete_task',task_,this.auth.options).pipe(  
      catchError(this.handleError)
      );
  }
  GetTasks(user:User){
      return this.http.post<User>(this.auth.domain+ '/task-manager/tasks',user,this.auth.options);
  }
  Add_Task(task_:task_operation){
    return this.http.post<task_operation>(this.auth.domain+ '/task-manager/add_task',task_,this.auth.options).pipe(  
      catchError(this.handleError)
    )
  }
  Delete_task(task_:task_operation){
    return this.http.post<task_operation>(this.auth.domain+ '/task-manager/remove_task',task_,this.auth.options).pipe(  
      catchError(this.handleError)
    )
  }
private handleError(error: HttpErrorResponse) {
  if (error.status==400){
    console.error('Backend',error.error);
  }
  if (error.status==426){
    console.error('token header error',error.error);
  }
  if (error.status==422){
    console.error('task alreasdy exists',error.error);
  }
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  return throwError(() => new Error(error.error));
}
  }

