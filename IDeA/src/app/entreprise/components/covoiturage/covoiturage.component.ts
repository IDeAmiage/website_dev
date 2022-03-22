import { LoaderService } from './../../../loader.service';
import { Trajet } from './../../../Trajet';
import { PostCovoiturageComponent } from './../post-covoiturage/post-covoiturage.component';
import { FirestorageService } from './../../../firestorage.service';
import { Router } from '@angular/router';
import { FirebaseService } from './../../../firebase.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-covoiturage',
  templateUrl: './covoiturage.component.html',
  styleUrls: ['./covoiturage.component.css']
})
export class CovoiturageComponent implements OnInit {

  public TrajetListe : any = new Array();

  constructor(public firebase: FirebaseService, public router: Router,
     public firestore: FirestorageService, public dialog: MatDialog,
     public loader: LoaderService) { }

  data = {name:'test'};

  ngOnInit(): void {
    this.loadTrajects();

  }

  logout(){
    this.firebase.logout();
    this.router.navigate(['/']);
  }

  // testfirestore(){
  //   this.firestore.insertObject(this.data,"test");
  // }

  loadTrajects(){
    const obj = this.firestore.getObject("trajet");
    obj.subscribe(res=>{
      this.TrajetListe = res;
      console.log(this.TrajetListe);
    })
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(PostCovoiturageComponent, dialogConfig);
  }



}
