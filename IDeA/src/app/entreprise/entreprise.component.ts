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

  ngOnInit(): void {
    // this.api.getUsers().subscribe(
    //   response => {
    //     this.text = response;
    //   }
    // );
  }



}
