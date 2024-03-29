import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar:MatSnackBar) { }

  config:MatSnackBarConfig={
    duration:3000,
    horizontalPosition:'right',
    verticalPosition:'top',
    politeness:'polite'
  }
  Success(msg:string){
    this.config['panelClass']=['notification','Success'];
    this.snackBar.open(msg,'',this.config);
   }
   Error(msg:string) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }
}
