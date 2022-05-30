import { Router } from '@angular/router';
import { FirebaseService } from './../../../firebase.service';
import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

/**
 * Home component is exposing cards from different pages
 *
 * @export
 * @class HomeComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  cols : number | undefined;

  gridByBreakpoint = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          {
            imageSrc: 'assets/Entreprise/foodtruck.jpg',
            title: 'Food-trucks',
            rlink: 'foodtrucks',
            cols: 1,
            rows: 1,
          },
          {
            imageSrc: 'assets/Entreprise/covoiturage.webp',
            title: 'Covoiturage',
            rlink: 'covoiturage',
            cols: 1,
            rows: 1,
          },
          {
            imageSrc: 'assets/Entreprise/conferences.jpeg',
            title: 'Conférences',
            rlink: 'conferences',
            cols: 1,
            rows: 1,
          },
          {
            imageSrc: 'assets/Entreprise/sport.webp',
            title: 'Sport',
            rlink: 'sport',
            cols: 1,
            rows: 1,
          },
        ];
      }

      return [
        {
          imageSrc: 'assets/Entreprise/foodtruck.jpg',
          title: 'Food-trucks',
          rlink: 'foodtrucks',
          cols: 1,
          rows: 1,
        },
        {
          imageSrc: 'assets/Entreprise/covoiturage.webp',
          title: 'Covoiturage',
          rlink: 'covoiturage',
          cols: 1,
          rows: 1,
        },
        {
          imageSrc: 'assets/Entreprise/conferences.jpeg',
          title: 'Conférences',
          rlink: 'conferences',
          cols: 1,
          rows: 1,
        },
        {
          imageSrc: 'assets/Entreprise/sport.webp',
          title: 'Sport',
          rlink: 'sport',
          cols: 1,
          rows: 1,
        },
      ];
    })
  );

/**
 * Creates an instance of HomeComponent.
 * @param {FirebaseService} firebase
 * @param {Router} router
 * @param {BreakpointObserver} breakpointObserver
 * @memberof HomeComponent
 */
constructor(
    public firebase: FirebaseService,
    public router: Router,
    private breakpointObserver: BreakpointObserver) {
      this.breakpointObserver.observe([ // responsive part
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ]).subscribe(result => {
        if (result.matches) {
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

    ngOnInit() {
    }

  logout() {
    this.firebase.logout();
    this.router.navigate(['/']);
  }


}
