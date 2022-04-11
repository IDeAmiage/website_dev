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

  constructor(public firebaseService: FirebaseService, public router: Router, private _sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.urlDax = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/tZJlT948Qos');
    this.urlMarsan = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/y18S3lp6Ox8');
    this.urlMimizan = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/Fxvc2bKtzeE');
    this.urlBouceau = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/NO5jRlh_N1k');
    this.urlCapbreton = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/vCmu42nJD8M');
    this.urlHossegor = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/fFNZFThijT4');
    this.isExplorer = true;
    this.content = "content";
  }

  loginEntreprise(){
    this.firebaseService.status = "entreprise";
    localStorage.setItem("status","entreprise");
    this.router.navigate(['login']);
  }

  loginCollectivites(){
    this.firebaseService.status = "collectivites";
    localStorage.setItem("status","collectivites");
    this.router.navigate(['login']);
  }

  loginParticuliers(){
    this.firebaseService.status = "particuliers";
    localStorage.setItem("status","particuliers");
    this.router.navigate(['login']);
  }

  logout(): void{
    this.firebaseService.logout();
  }

  onClickExplorer(): void {
    this.isExplorer = !this.isExplorer;
    this.content = "content-blur";
  }
}
