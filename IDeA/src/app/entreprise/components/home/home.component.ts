import { FirebaseService } from './../../../firebase.service';
import { Component, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { imageSrc: "assets/Entreprise/foodtruck.jpg",title: 'Food-trucks', cols: 1, rows: 1 },
          { imageSrc: "assets/Entreprise/covoiturage.jpg",title: 'Covoiturage', cols: 1, rows: 1 },
          { imageSrc: "assets/Entreprise/conferences.jpeg",title: 'Conférences', cols: 1, rows: 1 },
          { imageSrc: "assets/Entreprise/sport.jpg",title: 'Sport', cols: 1, rows: 1 }
        ];
      }

      return [
        { imageSrc: "assets/Entreprise/foodtruck.jpg",title: 'Food-trucks', cols: 1, rows: 1 },
        { imageSrc: "assets/Entreprise/covoiturage.jpg",title: 'Covoiturage', cols: 1, rows: 1 },
        { imageSrc: "assets/Entreprise/conferences.jpeg",title: 'Conférences', cols: 1, rows: 1 },
        { imageSrc: "assets/Entreprise/sport.jpg",title: 'Sport', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, public firebase:FirebaseService) {}

  logout(){
    this.firebase.logout();
  }



}
