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
  accueil = [
    {
      status: "entreprise",
      title: "Entreprise"
    },
    {
      status: "collectivites",
      title: "Collectivité"
    },
    {
      status: "particuliers",
      title: "Particulier"
    }
  ];

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

  login(status: string): void{
    this.firebaseService.status = status;
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
