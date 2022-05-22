import { OpendatasoftV1Service } from './../../../opendatasoftV1.service';
import { FirestorageService } from 'src/app/firestorage.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-mon-entreprise',
  templateUrl: './mon-entreprise.component.html',
  styleUrls: ['./mon-entreprise.component.css']
})
export class MonEntrepriseComponent implements OnInit {

  currentUser: any;
  userEntreprise:any;
  consoEntreprise:number=0;

  classement = new Map<string, number>();
  classementnbTrajets = new Map<string, number>();
  classementUser = new Map<string, number>();

  constructor(public firestore: FirestorageService, public opendatasoft:OpendatasoftV1Service) { }

  ngOnInit() {

    this.firestore.getUser(localStorage.getItem('user_id')!).subscribe(res=>{
      this.currentUser = res[0];
      console.log(this.currentUser._entreprise.toUpperCase());

      this.loadEntrepriseInfos(this.currentUser._entreprise.toUpperCase());

      this.getEntrepriseCO2conso();

      this.getClassementEntreprise();

      this.getClassementUser();
     });
  }

  loadEntrepriseInfos(entreprise:string){
    this.opendatasoft.getEntreprise(entreprise).subscribe(
      response=>{
        console.log(response);

        response.records.forEach((element:any) => {
          this.userEntreprise = element.fields;
        });
      }
    )
  }

  getEntrepriseCO2conso(){
    this.firestore.getObject("trajet").subscribe(res=>{
      res.forEach((element:any)=>{
        if (element._user._entreprise === this.currentUser._entreprise){
          this.consoEntreprise += element._co2Emission;
        }
      })
    })
  }

  getClassementEntreprise(){
    this.firestore.getObject("trajet").subscribe((res:any)=>{
      res.forEach((element:any) => {
        if(this.classement.get(element._user._entreprise) == undefined){
          this.classement.set(element._user._entreprise, element._co2Emission)
          this.classementnbTrajets.set(element._user._entreprise, 1)
        }else {
          let temp = this.classement.get(element._user._entreprise);
          let temptraj = this.classementnbTrajets.get(element._user._entreprise);
          this.classement.set(element._user._entreprise, element._co2Emission + temp)
          this.classementnbTrajets.set(element._user._entreprise, 1 + temptraj!)
        }
      });
      this.classement = new Map([...this.classement].sort((a, b) => b[1] - a[1]));
      this.classementnbTrajets = new Map([...this.classementnbTrajets].sort((a, b) => b[1] - a[1]));
    })
  }

  getClassementUser(){
    this.firestore.getObject("trajet").subscribe((res:any)=>{
      res.forEach((element:any) => {
        if (this.classementUser.get(element._user._name)==undefined){
          this.classementUser.set(element._user._name, element._co2Emission)
        }else {
          let temp = this.classementUser.get(element._user._name);
          this.classementUser.set(element._user._name, element._co2Emission + temp)
        }
      });
      this.classementUser = new Map([...this.classementUser].sort((a,b)=>b[1]-a[1]))
    })
  }
  originalOrder(a:any, b:any) {
    return 1;
 }

}
