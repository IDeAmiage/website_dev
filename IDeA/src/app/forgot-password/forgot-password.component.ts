import { FirebaseService } from '../firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email : string ="";

  constructor( private firebase: FirebaseService) { }

  ngOnInit(): void {
  }

  forgotPassword(){
    // this.firebase.fo(this.email);
    // this.email=""
  }

}
