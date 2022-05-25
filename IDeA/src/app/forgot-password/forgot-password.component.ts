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
/**
 * This component is call when a user want to reset the password, after he click on the mail link
 *
 * @export
 * @class ForgotPasswordComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  ngUnsubscribe: Subject<any> = new Subject<any>();
  actions = UserManagementActions;
  mode: string = "";
  actionCode: string = "";

  newPassword: string = "";
  confirmPassword: string = "";

  actionCodeChecked!: boolean;

  /**
   * Creates an instance of ForgotPasswordComponent.
   * @param {AngularFireAuth} firebaseAuth
   * @param {Router} router
   * @param {ActivatedRoute} activatedRoute
   * @param {NotifierService} notifier Component to create popups
   * @memberof ForgotPasswordComponent
   */
  constructor(private firebaseAuth: AngularFireAuth,
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
          case UserManagementActions.recoverEmail: { // ready but not implemented

          } break
          case UserManagementActions.verifyEmail: { // ready but not implemented

          } break
          default: {
            this.router.navigate(['/']);
          }
        }
      })

  }

  /**
   * Executed when the component is closed
   *
   * @memberof ForgotPasswordComponent
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
  * Attempt to confirm the password reset with firebase and
  * navigate user back to home.
  */
  handleResetPassword() {
    if (this.newPassword != this.confirmPassword) {
      this.notifier.showNotification("Les deux mots de passes ne sont pas identiques", "OK", "error")
      return;
    }
    // Save the new password.
    this.firebaseAuth.confirmPasswordReset(
      this.actionCode,
      this.newPassword
    )
      .then(resp => {
        // Password reset has been confirmed and new password updated.
        this.notifier.showNotification("Votre nouveau mot de passe a bien été sauvegardé", "OK", "success")
        this.router.navigate(['/']);
      }).catch(e => {
        // Error occurred during confirmation. The code might have
        // expired or the password is too weak.
        alert(e);
      });
  }
}
