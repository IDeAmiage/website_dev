import { Router } from '@angular/router';
import { FirestorageService } from './../../../firestorage.service';
import { Adress, Trajet } from './../../../Trajet';
import { ApiService } from './../../../api.service';
import { FirebaseService } from './../../../firebase.service';
import { FormControl, FormGroup, Validators,FormBuilder} from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/Car';
import * as geolib from 'geolib';
import { MatDialogRef } from '@angular/material/dialog';
import { CovoiturageComponent } from '../covoiturage/covoiturage.component';

/**
 * Component to post a covoiturage
 *
 * @export
 * @class PostCovoiturageComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-post-covoiturage',
  templateUrl: './post-covoiturage.component.html',
  styleUrls: ['./post-covoiturage.component.scss']
})
export class PostCovoiturageComponent implements OnInit {
  userCar = new Car();

  depart = new Adress();
  arrivee = new Adress();

  trajet = new Trajet();

  departure_date = new Date();
  departure_time:any;

  currentUser:any;
  freq: string="";

  panelOpenState = false;
  size = new FormControl();
  fuel = new FormControl();
  people = new FormControl();
  sizeList: string[] = ['Little', 'Medium', 'Big'];
  capacity: number[] = [1,2,3,4,5,6,7];

  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  step = 0;

/**
 * Step to naviagte betweens tabs
 *
 * @param {number} index
 * @memberof PostCovoiturageComponent
 */
setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }



  fuelList: string[] = ["Diesel","Essence","GPL","CNG"]

/**
 * Creates an instance of PostCovoiturageComponent.
 * @param {FirebaseService} firebase
 * @param {ApiService} api
 * @param {FirestorageService} firestore
 * @param {MatDialogRef<CovoiturageComponent>} dialogRef
 * @param {Router} router
 * @memberof PostCovoiturageComponent
 */
constructor(public firebase:FirebaseService, public api: ApiService,
    public firestore: FirestorageService,
    public dialogRef: MatDialogRef<CovoiturageComponent>,
    public router: Router,
    private _formBuilder: FormBuilder
    ) {
  }

/**
 * load the user
 *
 * @memberof PostCovoiturageComponent
 */
ngOnInit() {
    this.firestore.getUser(localStorage.getItem('user_id')!).subscribe(res=>{
      this.currentUser = res;
    })

  }
/**
 * Save the car corresponding to the user
 *
 * @memberof PostCovoiturageComponent
 */
saveCar(){
    this.userCar._carburant = this.fuel.value;
    this.userCar._type = this.size.value;
    this.userCar._capacite = this.people.value;
    this.trajet._user = this.currentUser[0];
    this.trajet._user._car = this.userCar;
    this.nextStep();
  }

/**
 * Save the time for the departure
 *
 * @memberof PostCovoiturageComponent
 */
saveDateTime(){
    this.trajet._departure_time = new Date(
     this.departure_date.getFullYear(),
     this.departure_date.getMonth(),
     this.departure_date.getDate(),
     parseInt(this.departure_time.split(':')[0]),
     parseInt(this.departure_time.split(':')[1])
    );
    this.nextStep();
  }

  saveRecurrent(){
    this.nextStep();
  }

/**
 * Get lat and long from the adress
 *
 * @param {Adress} adresse
 * @memberof PostCovoiturageComponent
 */
async getLatLong(adresse: Adress){
    await this.api.getPositionFromAdress(adresse._num, adresse._addresse, adresse._city).toPromise().then(response=>{
      const obj = JSON.parse(JSON.stringify(response));
      adresse._lat = obj["0"].lat;
      adresse._lon = obj["0"].lon;
    })
  }

/**
 * Calculate the distance between the departure and the arrival
 *
 * @param {Adress} ad1
 * @param {Adress} ad2
 * @memberof PostCovoiturageComponent
 */
async calculateDistance(ad1: Adress, ad2: Adress){
    await this.getLatLong(ad1);
    await this.getLatLong(ad2);
    var dist = geolib.getDistance(
      { latitude: ad1._lat, longitude: ad1._lon },
      { latitude: ad2._lat, longitude: ad2._lon })
    this.trajet._start_latitude = ad1._lat;
    this.trajet._start_longitude = ad1._lon;
    this.trajet._depart = ad1._city;
    this.trajet._destination = ad2._city;
    this.trajet._nbKms = dist;
  }


/**
 * Save the traject to the db
 * Includes the reccurrence if specified
 *
 * @memberof PostCovoiturageComponent
 */
async saveTraject(){
    await this.calculateDistance(this.depart, this.arrivee);
    this.trajet._user._car = Object.assign({}, this.trajet._user._car)
    this.trajet._user = Object.assign({}, this.trajet._user)
    this.trajet._user._nbTrajects++;
    this.trajet._user._co2 = this.trajet._user._co2 + this.trajet._co2Emission;
    this.trajet = Object.assign({}, this.trajet)
    await this.api.getCo2Calculation(this.trajet).toPromise().then((res)=>{
      this.trajet._co2Emission = parseFloat(res.toString());
    })
    switch (this.freq) {
      case "day":
        this.firestore.insertObject(this.trajet,"trajet");
        for (let i = 1; i < 7; i++) {
          this.trajet._departure_time = new Date(this.trajet._departure_time.setDate(this.trajet._departure_time.getDate() +1));
          this.firestore.insertObject(this.trajet,"trajet");
        }
        this.firestore.updateUser(this.trajet._user, this.trajet._user._id).then((item:any)=>{
          location.reload();
          this.dialogRef.close();
        })
        break;
      case "week":
        this.firestore.insertObject(this.trajet,"trajet");
        for (let i = 1; i < 8; i++) {
          this.trajet._departure_time = new Date(this.trajet._departure_time.setDate(this.trajet._departure_time.getDate() +7*1));
          this.firestore.insertObject(this.trajet,"trajet");
        }
        this.firestore.updateUser(this.trajet._user, this.trajet._user._id).then((item:any)=>{
          location.reload();
          this.dialogRef.close();
        })
        break;
      case "month":
        this.firestore.insertObject(this.trajet,"trajet");
        for (let i = 1; i < 12; i++) {
          this.trajet._departure_time = new Date(this.trajet._departure_time.setDate(this.trajet._departure_time.getMonth() +1));
          this.firestore.insertObject(this.trajet,"trajet");
        }
        this.firestore.updateUser(this.trajet._user, this.trajet._user._id).then((item:any)=>{
          location.reload();
          this.dialogRef.close();
        })
        break;
      case "aucun":
        this.firestore.insertObject(this.trajet,"trajet");
        this.firestore.updateUser(this.trajet._user, this.trajet._user._id).then((item:any)=>{
          location.reload();
          this.dialogRef.close();
        })
        break;
      default:
        break;
    }
  }
}

/**
 * Func to set a timeout
 *
 * @param {number} ms
 * @return {*}
 */
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms));
}
