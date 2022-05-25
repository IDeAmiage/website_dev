import { NavComponent } from './../nav/nav.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirestorageService } from 'src/app/firestorage.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { KeyValue } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileComponent } from '../profile/profile.component';

/**
 * Component to manage and edit your profile data
 *
 * @export
 * @class EditProfileComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  currentUser : any;
  editable : any = ["_name","_phone","_car", "_strava_account","_entreprise"]
  fuelList: string[] = ["diesel", "essence", "gpl", "cng"];
  sizeList: string[] = ['Little', 'Medium', 'Big'];
  capacity: number[] = [1,2,3,4];
  userForms: FormGroup;

/**
 * Creates an instance of EditProfileComponent.
 * @param {FirestorageService} firestore
 * @param {Router} router
 * @param {MatDialogRef<NavComponent>} dialogRef
 * @param {MatDialog} dialog
 * @memberof EditProfileComponent
 */
constructor(public firestore: FirestorageService,
    public router: Router,
    public dialogRef: MatDialogRef<NavComponent>,
    public dialog: MatDialog) {
      let defaultInputText = {value: '', disabled: true};
      let defaultInputNumber = {value: 0, disabled: true};
      let followInputText = {value: '', disabled: false};
      let followInputNumber = {value: 0, disabled: false};

    this.userForms = new FormGroup({
      _carburant: new FormControl(followInputText, [Validators.required]),
      _type: new FormControl(followInputText, [Validators.required]),
      _id: new FormControl(defaultInputText),
      _score: new FormControl(defaultInputNumber),
      _avis: new FormControl(defaultInputText),
      _note: new FormControl(defaultInputNumber),
      _entreprise: new FormControl(defaultInputText),
      _name: new FormControl(followInputText, [Validators.required]),
      _phone: new FormControl(followInputText, [Validators.required, Validators.pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/gmi)]),
      _strava_account: new FormControl(defaultInputText),
      _level: new FormControl(defaultInputNumber),
      _nbTrajects: new FormControl(defaultInputNumber),
      _co2: new FormControl(defaultInputNumber),
      _capacite: new FormControl(followInputNumber, [Validators.required]),
    });
    }

/**
 * On init the user is loaded
 *
 * @memberof EditProfileComponent
 */
public ngOnInit() {
    this.firestore.getUser(localStorage.getItem('user_id')!).subscribe(res=>{
     this.currentUser = res[0];
     this.userForms.patchValue(this.currentUser._car);
     this.userForms.patchValue(this.currentUser);
    });
  }

/**
 * On submit the user modification is saved
 *
 * @memberof EditProfileComponent
 */
public onSubmit(){
    this.currentUser._name = this.userForms.controls['_name'].value;
    this.currentUser._phone = this.userForms.controls['_phone'].value;
    this.currentUser._car._capacite = this.userForms.controls['_capacite'].value;
    this.currentUser._car._type = this.userForms.controls['_type'].value;
    this.currentUser._car._carburant = this.userForms.controls['_carburant'].value;
    this.firestore.updateUser(this.currentUser, this.currentUser._id);
    this.openProfile();
  }

/**
 * On click the profile view is showed
 *
 * @memberof EditProfileComponent
 */
public openProfile(){
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(ProfileComponent, dialogConfig);
  }
}
