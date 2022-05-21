import { OpendatasoftV1Service } from './../opendatasoftV1.service';
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
  public listEntreprises:any = new Array();

/**
 * Creates an instance of EntrepriseComponent.
 * @param {ApiService} api
 * @param {FirestorageService} firestore
 * @param {OpendatasoftV1Service} opendatasoft
 * @memberof EntrepriseComponent
 */
constructor(public api: ApiService,
        public firestore: FirestorageService,
        public opendatasoft: OpendatasoftV1Service
    ) { }

/**
 * On init this component load the geolocation of the user
 * It will be use in the covoiturage component to show how far is the traject
 * @memberof EntrepriseComponent
 */
ngOnInit(): void {
    this.loadEntreprises();
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
/**
 * Load user data, not used after some changes
 *
 * @memberof EntrepriseComponent
 */
async loadUserData() {
    await this.firestore.getUser(localStorage.getItem('user_id')!).subscribe(res=>{
      localStorage.setItem('user',JSON.stringify(res));
      this.currentUser = JSON.parse(localStorage.getItem("user")!);
    })
  }

/**
 * This function use our opendatasoft service to get the list of entreprises provided in
 * the current postcode we have defined.
 * @memberof EntrepriseComponent
 */
loadEntreprises(){
    this.opendatasoft.getListEntreprises().subscribe(
      response=>{
        response.records.forEach((element:any) => {
          if(element.fields.denominationunitelegale!= undefined){
            this.listEntreprises.push(element.fields.denominationunitelegale)
          }
        });
      }
    )
  }
}
