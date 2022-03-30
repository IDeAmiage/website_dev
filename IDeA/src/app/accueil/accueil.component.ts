import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  urlDax!: SafeUrl;
  explorerClic!: boolean;

  constructor(public firebaseService: FirebaseService, public router: Router, private _sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.urlDax = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/tZJlT948Qos');
    this.explorerClic = false;
  }

  loginEntreprise(){
    this.firebaseService.status = "entreprise";
    this.router.navigate(['login']);
  }

  loginCollectivites(){
    this.firebaseService.status = "collectivites";
    this.router.navigate(['login']);
  }

  loginParticuliers(){
    this.firebaseService.status = "particuliers";
    this.router.navigate(['login']);
  }

  logout(){
    this.firebaseService.logout();
  }

  onClickExplorer(): void {
    this.explorerClic = true;
  }
}
