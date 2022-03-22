import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import firebase from 'firebase/compat';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

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

}
