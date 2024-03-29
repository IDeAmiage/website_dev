import { NotifierService } from './../notifier.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

/**
 * Component used for Login to the app
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/animation.json',
  };

  cols: number | undefined;

  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 2,
    sm: 2,
    xs: 1
  }

/**
 * Creates an instance of LoginComponent.
 * @param {FirebaseService} firebaseService
 * @param {Router} router
 * @param {NotifierService} notifier
 * @memberof LoginComponent
 */
constructor(public firebaseService: FirebaseService,
   public router: Router,
   private notifier: NotifierService,
   private breakpointObserver: BreakpointObserver){
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) { // responsive part for the grid of cards
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }
    });

  }

  /**
   * On init check if the user is logged in
   *
   * @memberof LoginComponent
   */
  ngOnInit(): void {

    if(localStorage.getItem('user')!==null)
      this.firebaseService.isLoggedIn = true;
    else
      this.firebaseService.isLoggedIn = false;
  }

  /**
   * On submit we call our firebase service function to validate the login
   *
   * @return {*}
   * @memberof LoginComponent
   */
  async submit(){
    if(!this.loginForm.valid){
      return;
    }
    const { email, password } = this.loginForm.value;
    await this.firebaseService.signin(email, password);
    if(this.firebaseService.isLoggedIn){
      this.firebaseService.isLoggedIn = true;
      this.router.navigate([localStorage.getItem('status')]);
    }
  }
/**
 * Form that contain our email and password values
 *
 * @memberof LoginComponent
 */
loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
/**
 * Get the email
 *
 * @readonly
 * @memberof LoginComponent
 */
get email(){
    return this.loginForm.get('email');
  }

/**
 * Get the password
 *
 * @readonly
 * @memberof LoginComponent
 */
get password(){
    return this.loginForm.get('password');
  }

/**
 * This method send an email to reset the password
 *
 * @memberof LoginComponent
 */
resetPassword() {
    if (!this.email) {
      alert('Type in your email first');
    }
    this.firebaseService.resetPasswordInit(this.email)
    .then(
      () => this.notifier.showNotification("Un email de verification a été envoyé à votre adresse mail","OK","success"),
      (rejectionReason) => alert(rejectionReason))
    .catch(e => this.notifier.showNotification("Une erreur s'est produite lors de la tentative de changement de mdp", "OK","error"));
  }
}
