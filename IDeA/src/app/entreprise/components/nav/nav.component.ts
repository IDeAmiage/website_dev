import { NotifierService } from './../../../notifier.service';
import { Router } from '@angular/router';
import { FirebaseService } from './../../../firebase.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public firebase: FirebaseService,
     public router: Router, public notifier: NotifierService) {}

  public logout(){
    this.firebase.logout();
    this.router.navigate(['/']);
  }

}
