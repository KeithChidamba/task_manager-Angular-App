import { Component,Injectable } from '@angular/core';
import { Validators,FormBuilder } from "@angular/forms";
import { User } from "../userInt";
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { response } from 'express';
import { ProfileComponent } from '../profile/profile.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private fb: FormBuilder,public auth:AuthService,private router:Router) { } 
  err = false;
  checkingValidity =false;
  errorAlert='';
  user:User={
    email: ' ',
    password:'',
    username: ''
  };
    Loginform = this.fb.group({
      username : ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/)
      ])],
      password : ['', Validators.compose([
        Validators.minLength(8),
        Validators.pattern(/^[a-zA-Z0-9]+$/),
        Validators.maxLength(30),
        Validators.required
      ])]
    });
    checkValidity(){
      this.checkingValidity = true;
      if(this.Loginform.valid){
          this.user = {
          email: '',
          password:this.Loginform.get('password')?.value,
          username: this.Loginform.get('username')?.value
        }
        this.auth.login(this.user).subscribe(
          (data)=>{
            this.auth.NotRegistered =false;
            this.auth.StoreToken(data);
            this.auth.LoadToken();
            this.auth.loggedIn();
            setTimeout(()=>{
                this.router.navigate(['Profile'])
            },1000)
            this.router 
          },
          (error)=>{
              this.err = true;
              this.errorAlert = error;

          }
        )
      }
    }
  }