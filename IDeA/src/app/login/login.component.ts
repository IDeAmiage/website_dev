import { NotifierService } from './../notifier.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public firebaseService: FirebaseService, public router: Router, private notifier: NotifierService){

  }
  ngOnInit(): void {
    console.log(this.firebaseService.status);

    if(localStorage.getItem('user')!==null)
      this.firebaseService.isLoggedIn = true;
    else
      this.firebaseService.isLoggedIn = false;
  }
  async submit(){
    if(!this.loginForm.valid){
      return;
    }
    const { email, password } = this.loginForm.value;
    await this.firebaseService.signin(email, password);
    if(this.firebaseService.isLoggedIn){
      this.firebaseService.isLoggedIn = true;
      this.router.navigate([this.firebaseService.status]);
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

}
