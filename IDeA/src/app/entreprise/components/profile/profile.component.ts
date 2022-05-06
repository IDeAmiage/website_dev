import { FirestorageService } from './../../../firestorage.service';
import { User } from './../../../User';
import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // ^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$
  currentUser : any;
  editActive = false;
  fuelList: string[] = ["diesel", "essence", "gpl", "cng"];
  sizeList: string[] = ['Little', 'Medium', 'Big'];
  userForms: FormGroup;
  squareRate = 3;

  constructor(public firestore: FirestorageService) {

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

  changeToEdit(){
    this.editActive = true;
  } 

}
