import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpEvent} from "@angular/common/http";
import { User } from '../interfaces/userInt';
import { catchError,throwError} from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  constructor(private auth:AuthService,private http:HttpClient) { }
  GetTasks(){
      this.auth.createAuthenticationHeaders();
      return this.http.get(this.auth.domain+ '/task-manager/tasks',this.auth.options);
  }
}
