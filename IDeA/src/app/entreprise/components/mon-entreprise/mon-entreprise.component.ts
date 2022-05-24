import { OpendatasoftV1Service } from './../../../opendatasoftV1.service';
import { FirestorageService } from 'src/app/firestorage.service';
import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./mon-entreprise.component.css'],
})
export class MonEntrepriseComponent implements OnInit {
  currentUser: any;
  userEntreprise: any;
  consoEntreprise: number = 0;

  classement = new Map<string, number>();
  classementnbTrajets = new Map<string, number>();
  classementUser = new Map<string, number>();
  /**
   * Creates an instance of MonEntrepriseComponent.
   * @param {FirestorageService} firestore
   * @param {OpendatasoftV1Service} opendatasoft
   * @memberof MonEntrepriseComponent
   */
  constructor(
    public firestore: FirestorageService,
    public opendatasoft: OpendatasoftV1Service
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
        this.getEntrepriseCO2conso();
        this.getClassementEntreprise();
        this.getClassementUser();
      });
  }

  /**
   * Infos from opendatasoft sirene V3
   *
   * @param {string} entreprise
   * @memberof MonEntrepriseComponent
   */
  loadEntrepriseInfos(entreprise: string) {
    this.opendatasoft.getEntreprise(entreprise).subscribe((response) => {
      response.records.forEach((element: any) => {
        this.userEntreprise = element.fields;
      });
    });
  }

  /**
   * Get the entire entreprise consommation of CO2
   *
   * @memberof MonEntrepriseComponent
   */
  getEntrepriseCO2conso() {
    this.firestore.getObject('trajet').subscribe((res) => {
      res.forEach((element: any) => {
        if (element._user._entreprise === this.currentUser._entreprise) {
          this.consoEntreprise += element._co2Emission;
        }
      });
    });
  }

  /**
   * Create different classement for the entreprise like the CO2 classement and the number of trajects
   *
   * @memberof MonEntrepriseComponent
   */
  getClassementEntreprise() {
    this.firestore.getObject('trajet').subscribe((res: any) => {
      res.forEach((element: any) => {
        if (this.classement.get(element._user._entreprise) == undefined) {
          this.classement.set(element._user._entreprise, element._co2Emission);
          this.classementnbTrajets.set(element._user._entreprise, 1);
        } else {
          let temp = this.classement.get(element._user._entreprise);
          let temptraj = this.classementnbTrajets.get(
            element._user._entreprise
          );
          this.classement.set(
            element._user._entreprise,
            element._co2Emission + temp
          );
          this.classementnbTrajets.set(
            element._user._entreprise,
            1 + temptraj!
          );
        }
      });
      this.classement = new Map(
        [...this.classement].sort((a, b) => b[1] - a[1])
      );
      this.classementnbTrajets = new Map(
        [...this.classementnbTrajets].sort((a, b) => b[1] - a[1])
      );
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
        if (this.classementUser.get(element._user._name) == undefined) {
          this.classementUser.set(element._user._name, element._co2Emission);
        } else {
          let temp = this.classementUser.get(element._user._name);
          this.classementUser.set(
            element._user._name,
            element._co2Emission + temp
          );
        }
      });
      this.classementUser = new Map(
        [...this.classementUser].sort((a, b) => b[1] - a[1])
      );
    });
  }
  originalOrder(a: any, b: any) {
    return 1;
  }
}
