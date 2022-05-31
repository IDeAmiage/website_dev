import { ApiService } from './../../../api.service';
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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

/**
 * This component is responsible of the management of covoiturage trajects
 *
 * @export
 * @class CovoiturageComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-covoiturage',
  templateUrl: './covoiturage.component.html',
  styleUrls: ['./covoiturage.component.scss']
})
export class CovoiturageComponent implements OnInit {

  title = 'af-notification';
  message:any = null;

  isChecked = false;

  public currentDate = new Date();

  public TrajetListe : any = new Array();
  public Userdistances : any = new Array();

  public searchFilter:any = '';
  public query:any;
  public filtered: any = new Array();

  cols : number | undefined;

  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 2,
    sm: 2,
    xs: 1
  }

/**
 * Creates an instance of CovoiturageComponent.
 * @param {FirebaseService} firebase
 * @param {Router} router
 * @param {FirestorageService} firestore
 * @param {MatDialog} dialog
 * @param {LoaderService} loader
 * @param {NotifierService} notifier
 * @param {OpendatasoftV1Service} opendatasoft
 * @param {BreakpointObserver} breakpointObserver
 * @param {ApiService} api
 * @memberof CovoiturageComponent
 */
constructor(public firebase: FirebaseService,
     public router: Router,
     public firestore: FirestorageService,
     public dialog: MatDialog,
     public loader: LoaderService,
     public notifier: NotifierService,
     public opendatasoft: OpendatasoftV1Service,
     private breakpointObserver: BreakpointObserver,
     public api: ApiService) {
      this.breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ]).subscribe(result => {
        if (result.matches) { // responsive part for the grid of cards
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.cols = this.gridByBreakpoint.xs;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.gridByBreakpoint.sm;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.gridByBreakpoint.md;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.cols = this.gridByBreakpoint.lg;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.cols = this.gridByBreakpoint.xl;
          }
        }
      });
    }
  /**
   * On init we load our available trajects and we requestPermission for sending notifications
   *
   * @memberof CovoiturageComponent
   */
  ngOnInit(): void {
    this.loadTrajects();
    this.requestPermission();
    this.listen();
  }

/**
 * Method to load the trajects and
 *
 * @memberof CovoiturageComponent
 */
loadTrajects(){
    const obj = this.firestore.getObject("trajet");
    this.TrajetListe = new Array()
    this.Userdistances = new Array()
    obj.subscribe(res=>{
      this.TrajetListe = res;
      this.TrajetListe = this.TrajetListe.filter((traj:any)=> traj._departure_time?.toDate() > this.currentDate);
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
      if(!this.isChecked){
        this.filtered = this.TrajetListe.filter((item: any) =>
          item._user._id != localStorage.getItem('user_id')!
        );
      }
    })
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(PostCovoiturageComponent, dialogConfig);
  }

  refreshByTime(){
    this.filtered =  _.orderBy(this.TrajetListe, [(obj) => obj._departure_time], ['asc'])
    this.Userdistances = new Array()
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
  }

  getMyTrajects(){
    if(this.isChecked){
      this.filtered = this.TrajetListe.filter((item:any)=>
        item._user._id === localStorage.getItem('user_id')!
      );
      this.refreshByTime()
    }else{
      this.Userdistances = new Array()
      this.loadTrajects();
    }
  }

  deleteTraject(i:number){
    this.firestore.deleteTraject(this.TrajetListe[i], localStorage.getItem('user_id')!).then((item:any)=> {
      this.isChecked = false;
      this.Userdistances = new Array()
    });
  }

  addPassenger(i:number){
    this.firestore.getUser(localStorage.getItem('user_id')!).subscribe(res=>{
      localStorage.setItem('user',JSON.stringify(res));
      const user = JSON.parse(localStorage.getItem("user")!);
      console.log(user);


      if (this.TrajetListe[i]._user._id == user[0]._id){
        this.notifier.showNotification("You can't register in your traject","OK","error")
      }else{
        if (this.TrajetListe[i]._passagers.length == this.TrajetListe[i]._user._car._capacite){
          this.notifier.showNotification("This traject is full","OK", "error");
        } else if (this.TrajetListe[i]._passagers.some((item:any) => item._id === user[0]._id)){
          this.notifier.showNotification("You are already register","OK","error");
        }
      }
      this.TrajetListe[i]._passagers.push(user[0]);
      this.firestore.updateTraject(this.TrajetListe[i], user[0])
      this.api.sendNotificationNewPassenger(this.TrajetListe[i]._user)
      // smtp need to be able on both side or use 2FA not implemented because of the price
      // this.api.sendNewPassengerEmail(this.TrajetListe[i]._user)
    })
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging,
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
           localStorage.setItem("notifToken", currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }
}
