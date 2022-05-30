import { NotifierComponent } from './notifier/notifier.component';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
/**
 * This service is used to notify the user of an information
 * There is two type of message error and success and we can customize our message as we want
 *
 * @export
 * @class NotifierService
 */
@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackbar: MatSnackBar) { }

  showNotification(displayMessage:string, buttonText:string, messageType: 'error' | 'success'){
    this.snackbar.openFromComponent(NotifierComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
        type: messageType
      },
      duration:5000,
      horizontalPosition:'center',
      verticalPosition: 'bottom',
      panelClass: messageType
    });
  }

  showCGU(displayMessage:string, buttonText:string, messageType: 'info'){
    this.snackbar.openFromComponent(NotifierComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
        type: messageType
      },
      duration:10000,
      horizontalPosition:'right',
      verticalPosition: 'bottom',
      panelClass: messageType
    });
  }
}
