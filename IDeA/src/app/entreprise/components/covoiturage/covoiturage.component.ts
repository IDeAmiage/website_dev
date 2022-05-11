import { OpendatasoftV1Service } from './../../../opendatasoftV1.service';
import { NotifierService } from './../../../notifier.service';
import { LoaderService } from './../../../loader.service';
import { Trajet } from './../../../Trajet';
import { PostCovoiturageComponent } from './../post-covoiturage/post-covoiturage.component';
import { FirestorageService } from './../../../firestorage.service';
import { Router } from '@angular/router';
import { FirebaseService } from './../../../firebase.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as geolib from 'geolib';


@Component({
  selector: 'app-covoiturage',
  templateUrl: './covoiturage.component.html',
  styleUrls: ['./covoiturage.component.css']
})
export class CovoiturageComponent implements OnInit {

  isChecked = false;

  public TrajetListe : any = new Array();
  public Userdistances : any = new Array();


  constructor(public firebase: FirebaseService, public router: Router,
     public firestore: FirestorageService, public dialog: MatDialog,
     public loader: LoaderService,
     public notifier: NotifierService,
     public opendatasoft: OpendatasoftV1Service) { }

  ngOnInit(): void {
    this.loadTrajects();
  }

  logout(){
    this.firebase.logout();
    this.router.navigate(['/']);
  }

  loadTrajects(){
    const obj = this.firestore.getObject("trajet");
    obj.subscribe(res=>{
      this.TrajetListe = res;
      console.log(this.TrajetListe);
      this.TrajetListe.forEach((element:any) => {
        this.Userdistances.push(
          geolib.getDistance(
            {
              latitude:parseFloat(localStorage.getItem('latitude')!),
              longitude:parseFloat(localStorage.getItem('longitude')!)
            },
            {
                latitude: parseFloat(element._start_latitude),
                longitude: parseFloat(element._start_longitude),
            })/1000
        )
      })
      this.TrajetListe.sort((a:any, b:any) =>
        this.Userdistances[this.TrajetListe.indexOf(a)] - this.Userdistances[this.TrajetListe.indexOf(b)]
      );
      this.Userdistances.sort((a:any, b:any) => a - b);
    })
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(PostCovoiturageComponent, dialogConfig);
  }

  getMyTrajects(){
    if(this.isChecked){
      this.TrajetListe = this.TrajetListe.filter((item:any)=>
        item._user._id === localStorage.getItem('user_id')!
      );
    }else{
      this.loadTrajects();
    }
  }

  deleteTraject(i:number){
    this.firestore.deleteTraject(this.TrajetListe[i], localStorage.getItem('user_id')!);
    this.isChecked = false;
  }

  addPassenger(i:number){
    this.firestore.getUser(localStorage.getItem('user_id')!).subscribe(res=>{
      localStorage.setItem('user',JSON.stringify(res));
      const user = JSON.parse(localStorage.getItem("user")!);
      if (this.TrajetListe[i]._passagers.length == this.TrajetListe[i]._user._car._capacite){
        this.notifier.showNotification("This traject is full","OK", "error");
      } else if (this.TrajetListe[i]._passagers.some((item:any) => item._id === user[0]._id)){
        this.notifier.showNotification("You are already register","OK","error");
      }
      this.TrajetListe[i]._passagers.push(user[0]);
      this.firestore.updateTraject(this.TrajetListe[i]);
    })
  }




}
