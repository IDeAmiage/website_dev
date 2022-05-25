import { FirestorageService } from './../../../firestorage.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
/**
 * Component that show the user profile
 *
 * @export
 * @class ProfileComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser : any;
  editActive = false;
  fuelList: string[] = ["diesel", "essence", "gpl", "cng"];
  sizeList: string[] = ['Little', 'Medium', 'Big'];
  userForms: FormGroup;
  squareRate = 3;
  isPhonePortrait = false;

/**
 * Creates an instance of ProfileComponent.
 * @param {FirestorageService} firestore
 * @param {BreakpointObserver} responsive
 * @memberof ProfileComponent
 */
constructor(public firestore: FirestorageService, private responsive: BreakpointObserver) {

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

/**
 * On init get the current user
 *
 * @memberof ProfileComponent
 */
ngOnInit() {
    this.firestore.getUser(localStorage.getItem('user_id')!).subscribe(res=>{
      this.currentUser = res[0];
      this.userForms.patchValue(this.currentUser._car);
      this.userForms.patchValue(this.currentUser);
    });

    this.responsive.observe(Breakpoints.XSmall).subscribe(result => {
        this.isPhonePortrait = false;
        if (result.matches) {
          this.isPhonePortrait = true;
        }
    });
  }

/**
 * Change to the edit-profile component
 *
 * @memberof ProfileComponent
 */
changeToEdit(){
    this.editActive = true;
  }

}
