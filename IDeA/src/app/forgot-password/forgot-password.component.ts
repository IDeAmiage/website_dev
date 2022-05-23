import { NotifierService } from './../notifier.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export class UserManagementActions {
  static resetPassword = 'resetPassword';
  static verifyEmail = 'verifyEmail';
  static recoverEmail = 'recoverEmail';
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  ngUnsubscribe: Subject<any> = new Subject<any>();
  actions = UserManagementActions;
  mode: string = "";
  actionCode: string="";

  newPassword: string="";
  confirmPassword: string="";

  actionCodeChecked!: boolean;

  constructor( private firebaseAuth: AngularFireAuth,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private notifier: NotifierService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(params => {
      if (!params) this.router.navigate(['/']);

      this.mode = params['mode'];
      this.actionCode = params['oobCode'];

      switch (params['mode']) {
        case UserManagementActions.resetPassword: {
          this.firebaseAuth.verifyPasswordResetCode(this.actionCode).then(email => {
            this.actionCodeChecked = true;
          }).catch(e => {
            alert(e);
            this.router.navigate(['/']);
          });
        } break
        case UserManagementActions.recoverEmail: {

        } break
        case UserManagementActions.verifyEmail: {

        } break
        default: {
          console.log('query parameters are missing');
          this.router.navigate(['/']);
        }
      }
    })

  }

  ngOnDestroy() {
    // End all subscriptions listening to ngUnsubscribe
    // to avoid memory leaks.
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

    /**
   * Attempt to confirm the password reset with firebase and
   * navigate user back to home.
   */
     handleResetPassword() {
      if (this.newPassword != this.confirmPassword) {
        this.notifier.showNotification("Les deux mots de passes ne sont pas identiques","OK","error")
        return;
      }
      // Save the new password.
      this.firebaseAuth.confirmPasswordReset(
          this.actionCode,
          this.newPassword
      )
      .then(resp => {
        // Password reset has been confirmed and new password updated.
        this.notifier.showNotification("Votre nouveau mot de passe a bien été sauvegardé","OK","success")
        this.router.navigate(['/']);
      }).catch(e => {
        // Error occurred during confirmation. The code might have
        // expired or the password is too weak.
        alert(e);
      });
    }
}
