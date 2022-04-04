import { NotifierService } from './../notifier.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public firebaseService: FirebaseService, public router: Router, public notifier: NotifierService){

  }
  ngOnInit(): void {
    console.log(this.firebaseService.status);

    if(localStorage.getItem('user')!==null)
      this.firebaseService.isLoggedIn = true;
    else
      this.firebaseService.isLoggedIn = false;
  }
  async submit(){
    if(!this.SignUpForm.valid){
      return;
    }
    const { email, password } = this.SignUpForm.value;
    await this.firebaseService.signup(email, password);
    if(this.firebaseService.isLoggedIn){
      this.firebaseService.isLoggedIn = true;
      this.router.navigate([localStorage.getItem('status')]);
    }
  }

  SignUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  get email(){
    return this.SignUpForm.get('email');
  }

  get password(){
    return this.SignUpForm.get('password');
  }

}
