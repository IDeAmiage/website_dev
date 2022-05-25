import { Router } from '@angular/router';
import { FirestorageService } from './../../../firestorage.service';
import { Adress, Trajet } from './../../../Trajet';
import { ApiService } from './../../../api.service';
import { FirebaseService } from './../../../firebase.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/Car';
import * as geolib from 'geolib';
import { MatDialogRef } from '@angular/material/dialog';
import { CovoiturageComponent } from '../covoiturage/covoiturage.component';
import { NotifierService } from 'src/app/notifier.service';


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
  isCarFilled = false;
  isTrajetFilled = false;
  isDateTimeFilled = false;
  isRecurrenceFilled = false;

  departure_date = new Date();
  departure_time: any;

  currentUser: any;
  freq: string = "";

  panelOpenState = false;
  size = new FormControl();
  fuel = new FormControl();
  people = new FormControl();
  sizeList: string[] = ['Little', 'Medium', 'Big'];
  capacity: number[] = [1, 2, 3, 4];

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

  fuelList: string[] = ["diesel", "essence", "gpl", "cng"]

  constructor(public firebase: FirebaseService, public api: ApiService, public firestore: FirestorageService,
    public dialogRef: MatDialogRef<CovoiturageComponent>, public router: Router, private notifier: NotifierService
  ) {
  }

  ngOnInit() {
    this.firestore.getUser(localStorage.getItem('user_id')!).subscribe(res => {
      this.currentUser = res;
      console.log(this.currentUser[0]);
    })

  }

  saveCar() {
    if (this.fuel.value && this.size.value && this.people.value) {
      this.userCar._carburant = this.fuel.value;
      this.userCar._type = this.size.value;
      this.userCar._capacite = this.people.value;
      this.trajet._user = this.currentUser[0];
      this.trajet._user._car = this.userCar;
      this.isCarFilled = true;
      this.nextStep();
    } else {
      this.notifier.showNotification("Une erreur s'est produite, merci de remplir tous les champs", "OK", "error");
    }

  }

  saveDateTime() {
    if (this.departure_time) {
      this.trajet._departure_time = new Date(
        this.departure_date.getFullYear(),
        this.departure_date.getMonth(),
        this.departure_date.getDate(),
        parseInt(this.departure_time.split(':')[0]),
        parseInt(this.departure_time.split(':')[1])
      );
      this.isDateTimeFilled = true;
      this.nextStep();
    }
    else {
      this.notifier.showNotification("Une erreur s'est produite, merci de remplir tous les champs", "OK", "error");
    }


  }

  saveRecurrent() {
    if (this.freq) {
      console.log(this.freq);
      this.isRecurrenceFilled = true;
      this.nextStep();
    } else {
      this.notifier.showNotification("Une erreur s'est produite, merci de remplir tous les champs", "OK", "error");
    }


    // switch (this.freq) {
    //   case "day":
    //     for (let i = 0; i < 7; i++) {
    //       // this.trajet._departure_time = this.trajet._departure_time.setDate(this.trajet._departure_time.getDate() +i);
    //       console.log(new Date(this.trajet._departure_time.setDate(this.trajet._departure_time.getDate() +1)));

    //     }
    //     break;
    //   case "week":
    //     for (let i = 0; i < 8; i++) {
    //       this.trajet._departure_time = new Date(this.trajet._departure_time.setDate(this.trajet._departure_time.getDate() +i+7*i));
    //     }
    //     break;
    //   case "month":
    //     for (let i = 0; i < 12; i++) {
    //       this.trajet._departure_time = new Date(this.trajet._departure_time.setDate(this.trajet._departure_time.getMonth() +i));
    //     }
    //     break;
    //   case "aucun":
    //     console.log("Aucun");
    //     break;
    //   default:
    //     break;
    // }

  }

  async getLatLong(adresse: Adress) {

    if (adresse._num && adresse._addresse, adresse._city) {
      await this.api.getPositionFromAdress(adresse._num, adresse._addresse, adresse._city).toPromise().then(response => {
        const obj = JSON.parse(JSON.stringify(response));
        adresse._lat = obj["0"].lat;
        adresse._lon = obj["0"].lon;
      })
      this.isTrajetFilled = true;
    } else {
      this.notifier.showNotification("Une erreur s'est produite, merci de remplir tous les champs", "OK", "error");
    }

  }

  async calculateDistance(ad1: Adress, ad2: Adress) {
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



  async saveTraject() {
    await this.calculateDistance(this.depart, this.arrivee);
    console.log("1", this.isCarFilled, '2', this.isDateTimeFilled, "3", this.isRecurrenceFilled, "4" , this.isTrajetFilled);
    if (!this.isCarFilled || !this.isDateTimeFilled || !this.isRecurrenceFilled || !this.isTrajetFilled) {
      this.notifier.showNotification("Une erreur s'est produite, merci de remplir tous les champs", "OK", "error");
    } else {

      
      this.trajet._user._car = Object.assign({}, this.trajet._user._car)
      console.log(this.trajet._user._car);
      this.trajet._user = Object.assign({}, this.trajet._user)
      this.trajet._user._nbTrajects++;
      this.trajet._user._co2 = this.trajet._user._co2 + this.trajet._co2Emission;
      this.trajet = Object.assign({}, this.trajet)
      await this.api.getCo2Calculation(this.trajet).toPromise().then((res) => {
        this.trajet._co2Emission = parseFloat(res.toString());
      })
      console.log(this.freq);

      switch (this.freq) {
        case "day":
          this.firestore.insertObject(this.trajet, "trajet");
          for (let i = 1; i < 7; i++) {
            this.trajet._departure_time = new Date(this.trajet._departure_time.setDate(this.trajet._departure_time.getDate() + 1));
            this.firestore.insertObject(this.trajet, "trajet");
          }
          this.firestore.updateUser(this.trajet._user, this.trajet._user._id).then((item: any) => {
            location.reload();
            this.dialogRef.close();
          })
          break;
        case "week":
          this.firestore.insertObject(this.trajet, "trajet");
          for (let i = 1; i < 8; i++) {
            this.trajet._departure_time = new Date(this.trajet._departure_time.setDate(this.trajet._departure_time.getDate() + 7 * 1));
            this.firestore.insertObject(this.trajet, "trajet");
          }
          this.firestore.updateUser(this.trajet._user, this.trajet._user._id).then((item: any) => {
            location.reload();
            this.dialogRef.close();
          })
          break;
        case "month":
          this.firestore.insertObject(this.trajet, "trajet");
          for (let i = 1; i < 12; i++) {
            this.trajet._departure_time = new Date(this.trajet._departure_time.setDate(this.trajet._departure_time.getMonth() + 1));
            this.firestore.insertObject(this.trajet, "trajet");
          }
          this.firestore.updateUser(this.trajet._user, this.trajet._user._id).then((item: any) => {
            location.reload();
            this.dialogRef.close();
          })
          break;
        case "aucun":
          this.firestore.insertObject(this.trajet, "trajet");
          this.firestore.updateUser(this.trajet._user, this.trajet._user._id).then((item: any) => {
            location.reload();
            this.dialogRef.close();
          })
          break;
        default:
          break;
      }
    }

  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
