import { NavComponent } from './../nav/nav.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirestorageService } from 'src/app/firestorage.service';
import { MatDialogRef } from '@angular/material/dialog';
import { KeyValue } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  currentUser : any;
  editable : any = ["_name","_phone","_car", "_strava_account","_entreprise"]
  editActive = false;
  fuelList: string[] = ["diesel", "essence", "gpl", "cng"];
  sizeList: string[] = ['Little', 'Medium', 'Big'];
  userForms: FormGroup;

  public onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    return 0;
  }

  constructor(public firestore: FirestorageService, public router: Router,
    public dialogRef: MatDialogRef<NavComponent>) {
      let defaultInputText = {value: '', disabled: true};
    let defaultInputNumber = {value: 0, disabled: true};
    let followInput = {value: '', disabled: !this.editActive};

    this.userForms = new FormGroup({
      _carburant: new FormControl(followInput),
      _type: new FormControl(followInput),
      _id: new FormControl(defaultInputText),
      _score: new FormControl(defaultInputNumber),
      _avis: new FormControl(defaultInputText),
      _note: new FormControl(defaultInputNumber),
      _entreprise: new FormControl(defaultInputText),
      _name: new FormControl(followInput),
      _phone: new FormControl(followInput, [Validators.required, Validators.pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/gmi)]),
      _strava_account: new FormControl(defaultInputText),
      _level: new FormControl(defaultInputNumber),
      _nbTrajects: new FormControl(defaultInputNumber),
      _co2: new FormControl(defaultInputNumber),
    });
    }

  ngOnInit() {
    this.firestore.getUser(localStorage.getItem('user_id')!).subscribe(res=>{
     this.currentUser = res[0];
     this.userForms.patchValue(this.currentUser._car);
     this.userForms.patchValue(this.currentUser);
    });
  }

  save(){
    console.log(this.currentUser);

    this.firestore.updateUser(this.currentUser, this.currentUser._id);
    this.dialogRef.close();
  }

}
