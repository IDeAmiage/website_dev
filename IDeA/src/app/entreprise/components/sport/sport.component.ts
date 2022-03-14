import { Router } from '@angular/router';
import { FirebaseService } from './../../../firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {

  constructor(public firebase: FirebaseService, public router: Router) { }

  ngOnInit() {
  }


  logout(){
    this.firebase.logout();
    this.router.navigate(['/']);
  }

}
