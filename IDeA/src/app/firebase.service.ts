import { User } from './User';
import { NotifierService } from './notifier.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public user = new User();

  isLoggedIn = false;
  status = "";
  constructor(public firebaseAuth: AngularFireAuth, public router: Router, public notifier: NotifierService) { }

  async googleSignin(){
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: firebase.auth.AuthProvider){
    return this.firebaseAuth.signInWithPopup(provider)
            .then((result)=>{
              this.isLoggedIn = true;
              this.user._id = result.user?.uid;
              console.log(this.user);
              localStorage.setItem('user',JSON.stringify(result.user))
              this.router.navigate([this.status])
            })
            .catch((error)=>{
              console.log(error);
              this.notifier.showNotification('Error when login', 'OK','error');
            });
  }

  async signin(email: string, password:string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
      .then(res=>{
        this.isLoggedIn = true;
        localStorage.setItem('user',JSON.stringify(res.user))
        this.user._id = res.user?.uid;
        this.user._name = res.user?.email?.split('.')[0]!;
        console.log(this.user._name);
        localStorage.setItem('user',JSON.stringify(res.user))
        this.notifier.showNotification('You are logged in','OK', 'success');
      });
  }
  async signup(email: string, password:string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
      .then(res=>{
        this.isLoggedIn = true;
        localStorage.setItem('user',JSON.stringify(res.user));
        this.notifier.showNotification('Votre compte a bien été créé','OK','success');
      });
  }

  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.notifier.showNotification('Vous avez été déconnecté','OK','success');
  }
}
