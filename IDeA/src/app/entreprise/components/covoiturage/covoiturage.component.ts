import { Router } from '@angular/router';
import { FirebaseService } from './../../../firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-covoiturage',
  templateUrl: './covoiturage.component.html',
  styleUrls: ['./covoiturage.component.css']
})
export class CovoiturageComponent implements OnInit {

  constructor(public firebase: FirebaseService, public router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.firebase.logout();
    this.router.navigate(['/']);
  }

}
