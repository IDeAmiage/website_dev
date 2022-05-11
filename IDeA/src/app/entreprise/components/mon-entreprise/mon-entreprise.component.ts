import { OpendatasoftV1Service } from './../../../opendatasoftV1.service';
import { FirestorageService } from 'src/app/firestorage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mon-entreprise',
  templateUrl: './mon-entreprise.component.html',
  styleUrls: ['./mon-entreprise.component.css']
})
export class MonEntrepriseComponent implements OnInit {

  currentUser: any;
  userEntreprise:any;
  consoEntreprise:number=0;

  constructor(public firestore: FirestorageService, public opendatasoft:OpendatasoftV1Service) { }

  ngOnInit() {

    this.firestore.getUser(localStorage.getItem('user_id')!).subscribe(res=>{
      this.currentUser = res[0];
      console.log(this.currentUser._entreprise.toUpperCase());

      this.loadEntrepriseInfos(this.currentUser._entreprise.toUpperCase());

      this.getEntrepriseCO2conso()
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

}
