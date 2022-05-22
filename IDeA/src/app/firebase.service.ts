import { FirestorageService } from './firestorage.service';
import { User } from './User';
import { NotifierService } from './notifier.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat';
import * as geolib from 'geolib';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  isLoggedIn = false;
  status = "";
  constructor(public firebaseAuth: AngularFireAuth, public router: Router, public notifier: NotifierService, public firestore: FirestorageService) { }

  async googleSignin(){
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: firebase.auth.AuthProvider){
    return this.firebaseAuth.signInWithPopup(provider)
            .then((result)=>{
              this.isLoggedIn = true;
              this.firestore.user._id = result.user?.uid;
              console.log(localStorage.getItem('status'));
              this.router.navigate([this.status])
            })
            .catch((error)=>{
              console.log(error);
              this.notifier.showNotification('Error when login', 'OK','error');
            });
  }

  resetPasswordInit(email: any) {
    return this.firebaseAuth.sendPasswordResetEmail(
      email.value,
      { url: 'http://localhost:4200/forgotpasswd' });
    }

  async signin(email: string, password:string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
      .then(res=>{
        this.isLoggedIn = true;
        localStorage.setItem('user_id', res.user?.uid!);
        this.notifier.showNotification('You are logged in','OK', 'success');
      })
      .catch((error)=>{
        console.log(error);
        this.notifier.showNotification('Error when login', 'OK','error');
      });
  }
  async signup(email: string, password:string, entreprise:string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
      .then(res=>{
        this.isLoggedIn = true;
        localStorage.setItem('user',JSON.stringify(res.user));
        localStorage.setItem('user_id', res.user?.uid!)
        this.firestore.user._id = res.user?.uid;
        this.firestore.user._email = res.user?.email;
        this.firestore.user._entreprise = entreprise;
        this.firestore.user._name = res.user?.email?.split('@')[0]!;
        this.firestore.user._car = Object.assign({}, this.firestore.user._car)
        this.firestore.user = Object.assign({}, this.firestore.user)
        this.firestore.insertUser(this.firestore.user, "user", this.firestore.user._id);
        this.notifier.showNotification('Votre compte a bien été créé','OK','success');
      });
  }

  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    this.isLoggedIn = false;
    this.notifier.showNotification('Vous avez été déconnecté','OK','success');
  }

  sendEmailForVerification(user:any){
    user.sendEmailForVerification().then((res:any)=>{
      this.router.navigate(['/verify-email']);
    }, (err:any)=>{
      alert('Something went wrong. Not able to send to your email.')
    })
  }
}
