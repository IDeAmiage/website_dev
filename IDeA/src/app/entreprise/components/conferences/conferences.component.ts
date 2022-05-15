import { Router } from '@angular/router';
import { FirebaseService } from './../../../firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {

  constructor(public firebase: FirebaseService, public router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.firebase.logout();
    this.router.navigate(['/']);
  }

}
