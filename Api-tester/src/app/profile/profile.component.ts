import { Component,OnInit,Injectable } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ProfileComponent {
username = '';
email = '';
constructor(public auth:AuthService){}
ngOnInit(){
    this.auth.getProfile().subscribe(
      (profile)=>{
        this.load(profile)
      }
    )
}
load(info:any){
    this.username =JSON.stringify(info.name).slice(1, -1);
    this.email=JSON.stringify(info.email).slice(1, -1);
}
}
