import { FirestorageService } from './../firestorage.service';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {

  public text:any;
  public currentUser: any;

  constructor(public api: ApiService, public firestore: FirestorageService) { }

  ngOnInit(): void {
    // this.loadUserData();

  }

  async loadUserData(){
    // await this.firestore.getUser(this.firestore.user._id).subscribe(res=>{
    await this.firestore.getUser(localStorage.getItem('user_id')!).subscribe(res=>{
      localStorage.setItem('user',JSON.stringify(res));
      this.currentUser = JSON.parse(localStorage.getItem("user")!);
    })



  }



}
