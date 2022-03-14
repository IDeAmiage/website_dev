import { Router } from '@angular/router';
import { FirebaseService } from './../../../firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-trucks',
  templateUrl: './food-trucks.component.html',
  styleUrls: ['./food-trucks.component.css']
})
export class FoodTrucksComponent implements OnInit {

  constructor(public firebase: FirebaseService, public router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.firebase.logout();
    this.router.navigate(['/']);
  }

}
