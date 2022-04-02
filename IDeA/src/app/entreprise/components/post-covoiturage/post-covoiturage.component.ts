import { Router } from '@angular/router';
import { FirestorageService } from './../../../firestorage.service';
import { Adress, Trajet } from './../../../Trajet';
import { ApiService } from './../../../api.service';
import { FirebaseService } from './../../../firebase.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/Car';
import * as geolib from 'geolib';
import { MatDialogRef } from '@angular/material/dialog';
import { CovoiturageComponent } from '../covoiturage/covoiturage.component';

@Component({
  selector: 'app-post-covoiturage',
  templateUrl: './post-covoiturage.component.html',
  styleUrls: ['./post-covoiturage.component.css']
})
export class PostCovoiturageComponent implements OnInit {
  userCar = new Car();

  depart = new Adress();
  arrivee = new Adress();

  trajet = new Trajet();

  panelOpenState = false;
  size = new FormControl();
  fuel = new FormControl();
  sizeList: string[] = ['Little', 'Medium', 'Big'];

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  fuelList: string[] = ["diesel","essence","gpl","cng"]

  constructor(public firebase:FirebaseService, public api: ApiService, public firestore: FirestorageService,
    public dialogRef: MatDialogRef<CovoiturageComponent>, public router: Router
    ) {
  }

  ngOnInit() {
    console.log(this.firestore.user._id);

  }

  saveCar(){
    this.userCar._carburant = this.fuel.value;
    this.userCar._type = this.size.value;
    this.firestore.user._car = this.userCar;
    this.nextStep();
  }

  async getLatLong(adresse: Adress){

    await this.api.getPositionFromAdress(adresse._num, adresse._addresse, adresse._city).toPromise().then(response=>{
      const obj = JSON.parse(JSON.stringify(response));
      adresse._lat = obj["0"].lat;
      adresse._lon = obj["0"].lon;
    })
  }

  async calculateDistance(ad1: Adress, ad2: Adress){
    await this.getLatLong(ad1);
    await this.getLatLong(ad2);
    var dist = geolib.getDistance(
      { latitude: ad1._lat, longitude: ad1._lon },
      { latitude: ad2._lat, longitude: ad2._lon })
    this.trajet._user = this.firestore.user;
    this.trajet._depart = ad1._city;
    this.trajet._destination = ad2._city;
    this.trajet._nbKms = dist;
  }



  async saveTraject(){
    await this.calculateDistance(this.depart, this.arrivee);
    console.log(JSON.stringify(this.trajet));
    this.trajet._user._car = Object.assign({}, this.trajet._user._car)
    this.trajet._user = Object.assign({}, this.trajet._user)
    // this.trajet._user._nbTrajects++;
    this.trajet = Object.assign({}, this.trajet)
    await this.api.getCo2Calculation(this.trajet).toPromise().then((res)=>{
      this.trajet._co2Emission = parseFloat(res.toString());
    })
    // this.trajet._user._score = this.trajet._user._score + this.trajet._co2Emission;
    this.firestore.insertObject(this.trajet,"trajet");

    // this.router.navigate(['/entreprise/covoiturage']);
    this.dialogRef.close();
  }



}
