import { OpendatasoftV1Service } from './../../../opendatasoftV1.service';
import { FirestorageService } from 'src/app/firestorage.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as _ from 'lodash';

/**
 * This component show a dashoard of different kpis and also a map of services available next to the user entreprise
 *
 * @export
 * @class MonEntrepriseComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-mon-entreprise',
  templateUrl: './mon-entreprise.component.html',
  styleUrls: ['./mon-entreprise.component.scss'],
})
export class MonEntrepriseComponent implements OnInit {
  currentUser: any;
  userEntreprise: any;
  daysBetween = 0;
  view: any[] = [700, 400];

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };

  classementCo2 = new Map<string, number>();
  classementnbTrajets = new Map<string, number>();
  classementGlobalUser = new Map<string, number>();
  classementInterneUser = new Map<string, number>();

  classementGoodCo2: any[] = [];
  classementGoodnbTrajets: any[] = [];
  classementGoodGlobalUser: any[] = [];
  classementGoodInterneUser: any[] = [];

  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
        };
      }

     return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
      };
    })
  );

  /**
   * Creates an instance of MonEntrepriseComponent.
   * @param {FirestorageService} firestore
   * @param {OpendatasoftV1Service} opendatasoft
   * @param {BreakpointObserver} breakpointObserver
   * @memberof MonEntrepriseComponent
   */
  constructor(
    public firestore: FirestorageService,
    public opendatasoft: OpendatasoftV1Service,
    private breakpointObserver: BreakpointObserver
  ) {}

  /**
   * On init Entreprise infos are loaded from sirene v3 and also our firestore db
   *
   * @memberof MonEntrepriseComponent
   */
  ngOnInit() {
    this.firestore
      .getUser(localStorage.getItem('user_id')!)
      .subscribe((res) => {
        this.currentUser = res[0];
        this.loadEntrepriseInfos(this.currentUser._entreprise.toUpperCase());
        this.getClassementEntreprise();
        this.getClassementUser();
      });
  }

  loadEntrepriseInfos(entreprise: string) {
    this.opendatasoft.getEntreprise(entreprise).subscribe((response) => {
      response.records.forEach((element: any) => {
        this.userEntreprise = element.fields;
      });
      this.daysBetween = this.getDaysBetween();
    });
  }

  /**
   * Return classement of users and CO2 for the entreprise
   *
   * @memberof MonEntrepriseComponent
   */
  getClassementEntreprise() {
    this.firestore.getObject('trajet').subscribe((res: any) => {
      res.forEach((element: any) => {
        if (this.classementCo2.get(element._user._entreprise) == undefined) {
          this.classementCo2.set(
            element._user._entreprise,
            Math.round(element._co2Emission * element._passagers.length)
          );
          this.classementnbTrajets.set(element._user._entreprise, 1);
        } else {
          let temp = this.classementCo2.get(element._user._entreprise);
          let temptraj = this.classementnbTrajets.get(
            element._user._entreprise
          );
          this.classementCo2.set(
            element._user._entreprise,
            Math.round(element._co2Emission * element._passagers.length + temp!)
          );
          this.classementnbTrajets.set(
            element._user._entreprise,
            1 + temptraj!
          );
        }
      });
      this.classementCo2 = new Map(
        [...this.classementCo2].sort((a, b) => b[1] - a[1])
      );
      this.classementnbTrajets = new Map(
        [...this.classementnbTrajets].sort((a, b) => b[1] - a[1])
      );
      this.classementGoodCo2 = this.transformGoodFormat(this.classementCo2);
      this.classementGoodnbTrajets = this.transformGoodFormat(this.classementnbTrajets);
    });
  }

  /**
   * return the most eco-friendly user
   *
   * @memberof MonEntrepriseComponent
   */
  getClassementUser() {
    this.firestore.getObject('trajet').subscribe((res: any) => {
      res.forEach((element: any) => {
        if (this.classementGlobalUser.get(element._user._name) == undefined) {
          this.classementGlobalUser.set(element._user._name, Math.round(element._co2Emission));
        } else {
          let temp = this.classementGlobalUser.get(element._user._name);
          this.classementGlobalUser.set(
            element._user._name,
            Math.round(element._co2Emission + temp)
          );
        }

        if (this.classementInterneUser.get(element._user._name) == undefined && element._user._entreprise == this.currentUser._entreprise) {
          this.classementInterneUser.set(element._user._name, Math.round(element._co2Emission));
        } else if (element._user._entreprise == this.currentUser._entreprise) {
          let temp = this.classementInterneUser.get(element._user._name);
          this.classementInterneUser.set(
            element._user._name,
            Math.round(element._co2Emission + temp)
          );
        }
      });
      this.classementGlobalUser = new Map(
        [...this.classementGlobalUser].sort((a, b) => b[1] - a[1])
      );
      this.classementInterneUser = new Map(
        [...this.classementInterneUser].sort((a, b) => b[1] - a[1])
      );
      this.classementGoodGlobalUser = this.transformGoodFormat(this.classementGlobalUser);
      this.classementGoodInterneUser = this.transformGoodFormat(this.classementInterneUser);
    });
  }

  /**
   * Return the number of days between the current date and the date of creation of the entreprise
   *
   * @return {*}
   * @memberof MonEntrepriseComponent
   */
  getDaysBetween() {
    let date1 = new Date(this.userEntreprise["datecreationunitelegale"]);
    let date2 = new Date();
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  /**
   * Transform the map in a good format for the chart
   *
   * @param {Map<String, Number>} map
   * @return {*}
   * @memberof MonEntrepriseComponent
   */
  transformGoodFormat(map: Map<String, Number>) {
    let jsonObject = new Array();
    map.forEach((value, key) => {
      jsonObject.push({"name": key, "value": value})
    });
    return jsonObject;
  }

  originalOrder(a: any, b: any) {
    return 1;
  }
}
