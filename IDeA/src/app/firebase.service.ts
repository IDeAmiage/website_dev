import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;
  status = "";
  constructor(public firebaseAuth: AngularFireAuth, public router: Router) { }

  async googleSignin(){
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: firebase.auth.AuthProvider){
    return this.firebaseAuth.signInWithPopup(provider)
            .then((result)=>{
              this.isLoggedIn = true;
              localStorage.setItem('user',JSON.stringify(result.user))
              this.router.navigate([this.status])
            })
            .catch((error)=>{console.log(error);});
  }

  async signin(email: string, password:string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
      .then(res=>{
        this.isLoggedIn = true;
        localStorage.setItem('user',JSON.stringify(res.user))
      });
  }
  async signup(email: string, password:string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
      .then(res=>{
        this.isLoggedIn = true;
        localStorage.setItem('user',JSON.stringify(res.user))
      });
  }

  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.isLoggedIn = false;
  }
}
