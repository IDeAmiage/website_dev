import { NavComponent } from './../nav/nav.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirestorageService } from 'src/app/firestorage.service';
import { MatDialogRef } from '@angular/material/dialog';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  currentUser : any;
  editable : any = ["_name","_phone","_car", "_strava_account","_entreprise"]

  public onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    return -1;
  }

  constructor(public firestore: FirestorageService, public router: Router,
    public dialogRef: MatDialogRef<NavComponent>) { }

  ngOnInit() {
    this.firestore.getUser(localStorage.getItem('user_id')!).subscribe(res=>{
     this.currentUser = res[0];
    });
  }

  save(){
    console.log(this.currentUser);

    this.firestore.updateUser(this.currentUser, this.currentUser._id);
    this.dialogRef.close();
    // this.router.navigate(['/entreprise/']);
  }

}
