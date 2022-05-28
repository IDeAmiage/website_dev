import { NotifierService } from './../notifier.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  urlDax!: SafeUrl;
  urlMarsan!: SafeUrl;
  urlMimizan!: SafeUrl;
  urlBouceau!: SafeUrl
  urlCapbreton!: SafeUrl;
  urlHossegor!: SafeUrl
  isExplorer!: boolean;
  content!: string;

/**
 * Creates an instance of AccueilComponent.
 * @param {FirebaseService} firebaseService
 * @param {Router} router
 * @param {DomSanitizer} _sanitizer
 * @memberof AccueilComponent
 */
constructor(public firebaseService: FirebaseService,
            public router: Router,
            private _sanitizer: DomSanitizer,
            public notifier: NotifierService){}
/**
 * On init this component load all the videos
 *
 * @memberof AccueilComponent
 */
ngOnInit(): void {
    this.urlDax = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/tZJlT948Qos');
    this.urlMarsan = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/y18S3lp6Ox8');
    this.urlMimizan = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/Fxvc2bKtzeE');
    this.urlBouceau = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/NO5jRlh_N1k');
    this.urlCapbreton = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/vCmu42nJD8M');
    this.urlHossegor = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/fFNZFThijT4');
    this.isExplorer = true;
    this.content = "content";
    this.notifier.showCGU("Veuillez accepter les conditions d'utilisation","Accepter",'info')
  }

/**
 * Method to login with and entreprise status
 *
 * @memberof AccueilComponent
 */
loginEntreprise(){
    this.firebaseService.status = "entreprise";
    localStorage.setItem("status","entreprise");
    this.router.navigate(['login']);
  }

/**
 * Method to login with collectivities status
 *
 * @memberof AccueilComponent
 */
loginCollectivites(){
    this.firebaseService.status = "collectivites";
    localStorage.setItem("status","collectivites");
    this.router.navigate(['login']);
  }

/**
 * Login with particuliers status
 *
 * @memberof AccueilComponent
 */
loginParticuliers(){
    this.firebaseService.status = "particuliers";
    localStorage.setItem("status","particuliers");
    this.router.navigate(['login']);
  }

/**
 * Method to Logout using firebaseService
 *
 * @memberof AccueilComponent
 */
logout(): void{
    this.firebaseService.logout();
  }

/**
 * On click on the button explorer, this show up the videos
 *
 * @memberof AccueilComponent
 */
onClickExplorer(): void {
    this.isExplorer = !this.isExplorer;
    this.content = "content-blur";
  }
}
