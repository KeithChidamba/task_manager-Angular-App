import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth:AuthService,private router:Router){}
  Logout(){
    this.auth.Logout();
    this.router.navigate(['']);
    this.auth.isLoggedIn = false;
  }
}
