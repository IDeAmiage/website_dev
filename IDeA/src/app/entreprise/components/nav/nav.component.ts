import { OpendatasoftV1Service } from './../../../opendatasoftV1.service';
import { ProfileComponent } from './../profile/profile.component';
import { FirestorageService } from './../../../firestorage.service';
import { NotifierService } from './../../../notifier.service';
import { Router } from '@angular/router';
import { FirebaseService } from './../../../firebase.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as _ from 'lodash';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  public EntrepriseUser : any = new Array();
  public AirQuality: number = 0;
  public publicListcity : any = new Array();
  public test: string="";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public firebase: FirebaseService,
     public router: Router, public notifier: NotifierService,
     public firestore: FirestorageService,
     public dialog: MatDialog,
     public opendatasoft: OpendatasoftV1Service) {}

  ngOnInit(): void {
    this.firestore.getUser(localStorage.getItem('user_id')!).subscribe(res=>{
      this.EntrepriseUser = res;
    });
    this.opendatasoft.getAirquality().subscribe(res=>{
      res.records.reverse().forEach((element:any) => {
        if (element.fields.measurements_parameter === "PM10"){
          this.AirQuality = element.fields.measurements_value
        }
      });
    });
    this.opendatasoft.getOtherAirQuality().subscribe(response=>{
      response.records.forEach((element:any) => {
        if (element.fields.measurements_parameter === "PM10"){
          if (element.fields.city != element.fields.city.toUpperCase()){
            if (["Hautes-Pyrénées", "Haute-Garonne", "Pyrénées-Atlantiques","Gironde"].includes(element.fields.city)){
              this.publicListcity.push(element)
            }
          }
        }
      });
      this.publicListcity = _.uniqBy(this.publicListcity, function (e:any) {
        return e.fields.city
      });
      this.publicListcity.forEach((element:any) => {
        this.test += element.fields.city +": "+element.fields.measurements_value + "\n"
      });
      console.log(this.test);


    })
  }

  public logout(){
    this.firebase.logout();
    this.router.navigate(['/']);
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    //dialogConfig.height = "60%";
    this.dialog.open(ProfileComponent, dialogConfig);
  }
}
