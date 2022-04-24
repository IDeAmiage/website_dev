import { FirestorageService } from './../../../firestorage.service';
import { User } from './../../../User';
import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser : any;
  editactive = false;

  public onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    return 0;
  }

  constructor(public firestore: FirestorageService) { }

  ngOnInit() {
    this.firestore.getUser(localStorage.getItem('user_id')!).subscribe(res=>{
     this.currentUser = res[0];
    });
  }

  changeToEdit(){
    this.editactive = true;
  } 

}
