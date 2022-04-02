import { FirebaseService } from './firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from './User';



@Injectable({
  providedIn: 'root'
})
export class FirestorageService {
  public user = new User();

constructor(private firestore: AngularFirestore) { }

  insertObject(data:any, collectionName:string) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection(collectionName)
            .add(data)
            .then(res => {console.log(res);}, err => reject(err));
    });
  }

  getObject(collectionName:string){
    return this.firestore.collection(collectionName).valueChanges();
  }

  getUser(id:string){
    return this.firestore.collection('user', ref =>
      ref.where('_id', '==',id)
    ).valueChanges();
  }

}
