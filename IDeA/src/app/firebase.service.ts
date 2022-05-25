import { FirestorageService } from './firestorage.service';
import { NotifierService } from './notifier.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat';

/**
 * This service communicate with the firebase authentication service.
 * It implement some features like login, signup, logout ...
 *
 * @export
 * @class FirebaseService
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  isLoggedIn = false;
  status = "";

/**
 * Creates an instance of FirebaseService.
 * @param {AngularFireAuth} firebaseAuth
 * @param {Router} router
 * @param {NotifierService} notifier
 * @param {FirestorageService} firestore
 * @memberof FirebaseService
 */
constructor(public firebaseAuth: AngularFireAuth,
     public router: Router,
     public notifier: NotifierService,
     public firestore: FirestorageService) { }

/**
 * Connect with Google. Only available with particulier part
 *
 * @return {*}
 * @memberof FirebaseService
 */
async googleSignin(){
    return this.AuthLogin(new GoogleAuthProvider());
  }

/**
 * This function authorize or not the access to the app based on google account in this case
 *
 * @param {firebase.auth.AuthProvider} provider
 * @return {*}
 * @memberof FirebaseService
 */
AuthLogin(provider: firebase.auth.AuthProvider){
    return this.firebaseAuth.signInWithPopup(provider)
            .then((result)=>{
              this.isLoggedIn = true;
              this.firestore.user._id = result.user?.uid;
              this.router.navigate([this.status])
            })
            .catch((error)=>{
              this.notifier.showNotification('Error when login', 'OK','error');
            });
  }

/**
 * This function reset the password of a user and will send a mail to change it
 *
 * @param {*} email
 * @return {*}
 * @memberof FirebaseService
 */
resetPasswordInit(email: any) {
    return this.firebaseAuth.sendPasswordResetEmail(
      email.value,
      { url: 'http://localhost:4200/forgotpasswd' });
    }

/**
 * This method perform the signin for a particular account
 * When the login is done, the user data is loaded
 *
 * @param {string} email
 * @param {string} password
 * @memberof FirebaseService
 */
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

  /**
   * This method is used to create a user profile.
   * The entreprise loaded from sireneV3 data is required.
   * It also performs the login after register
   *
   * @param {string} email
   * @param {string} password
   * @param {string} entreprise
   * @memberof FirebaseService
   */
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
/**
 * Method to logout from the app
 *
 * @memberof FirebaseService
 */
logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    this.isLoggedIn = false;
    this.notifier.showNotification('Vous avez été déconnecté','OK','success');
  }

/**
 * This method send an email for verification
 * Not implemented for now but can be pretty easily
 *
 * @param {*} user
 * @memberof FirebaseService
 */
sendEmailForVerification(user:any){
    user.sendEmailForVerification().then((res:any)=>{
      this.router.navigate(['/verify-email']);
    }, (err:any)=>{
      alert('Something went wrong. Not able to send to your email.')
    })
  }
}
