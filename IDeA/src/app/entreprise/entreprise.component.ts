import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {

  public text:any;

  constructor(public api: ApiService) { }

  ngOnInit() {
    // simple example to call the api and return the response in our variable to display
    console.log(this.api.getUsers().subscribe(
      response => {
        this.text = response;
      }
    ));

  }




}
