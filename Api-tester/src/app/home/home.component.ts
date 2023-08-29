import { Component,Injectable } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { User } from '../userInt';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class HomeComponent {
  userloaded = false;
  user:User;
     constructor(public auth:AuthService){
      this.user={
      email: '',
      password:'',
      username: ''
    };
  }
}

