import { FirestorageService } from 'src/app/firestorage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mon-entreprise',
  templateUrl: './mon-entreprise.component.html',
  styleUrls: ['./mon-entreprise.component.css']
})
export class MonEntrepriseComponent implements OnInit {

  currentUser: any;

  constructor(public firestore: FirestorageService) { }

  ngOnInit() {

    this.firestore.getUser(localStorage.getItem('user_id')!).subscribe(res=>{
      this.currentUser = res[0];
     });
  }

}
