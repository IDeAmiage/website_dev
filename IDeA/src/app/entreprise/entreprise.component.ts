import { FirestorageService } from './../firestorage.service';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import * as geolib from 'geolib';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss'],
})
export class EntrepriseComponent implements OnInit {
  public text: any;
  public currentUser: any;

  constructor(public api: ApiService, public firestore: FirestorageService) {}

  ngOnInit(): void {
    // this.loadUserData();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude);
        localStorage.setItem('latitude',  position.coords.latitude.toString())
        localStorage.setItem('longitude', position.coords.longitude.toString())
      },
      () => {
          alert('Position could not be determined.');
      }
    );
  }

  async loadUserData() {
    // await this.firestore.getUser(this.firestore.user._id).subscribe(res=>{
    await this.firestore.getUser(localStorage.getItem('user_id')!).subscribe(res=>{
      localStorage.setItem('user',JSON.stringify(res));
      this.currentUser = JSON.parse(localStorage.getItem("user")!);
    })
  }
}
