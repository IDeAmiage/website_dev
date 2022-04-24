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

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  public EntrepriseUser : any = new Array();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public firebase: FirebaseService,
     public router: Router, public notifier: NotifierService,
     public firestore: FirestorageService,
     public dialog: MatDialog) {}

  ngOnInit(): void {
    this.firestore.getUser(localStorage.getItem('user_id')!).subscribe(res=>{
      this.EntrepriseUser = res;
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
