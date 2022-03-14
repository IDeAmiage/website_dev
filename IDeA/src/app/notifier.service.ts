import { NotifierComponent } from './notifier/notifier.component';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
}
