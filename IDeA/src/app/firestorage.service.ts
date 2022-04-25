import { Trajet } from './Trajet';
import { FirebaseService } from './firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from './User';
import { setDoc, arrayUnion } from "firebase/firestore";




@Injectable({
  providedIn: 'root'
})
export class FirestorageService {
  public user = new User();

  public traj_ref:any;

constructor(private firestore: AngularFirestore) { }

  insertObject(data:any, collectionName:string) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection(collectionName)
            .add(data)
            .then(res => {console.log(res);}, err => reject(err));
    });
  }

  insertUser(data:any, collectionName:string, id:string) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection(collectionName)
            .doc(id)
            .set(data)
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

  getCO2(entreprise:string){
    return this.firestore.collection('trajet', ref=>
      ref.where('_user._entreprise','==',entreprise)
    ).valueChanges();
  }

  updateUser(data:any, id:string){
    return this.firestore.collection('user', ref =>
      ref.where('_id', '==',id)
    ).doc(id).update(data);
  }

  async deleteTraject(traj:any, id:string){
    await this.firestore.collection('trajet').
      ref
      .where('_user._nbTrajects', '==', traj._user._nbTrajects)
      .where('_destination','==',traj._destination)
      .where('_depart','==',traj._depart)
      .where('_user._id', "==", id)
      .get().then(res=>{
        res.forEach(doc=> doc.ref.delete())
      });
  }

  async updateTraject(traj:Trajet){
    await this.firestore.collection('trajet').
      ref
      .where('_user._nbTrajects', '==', traj._user._nbTrajects)
      .where('_destination','==',traj._destination)
      .where('_depart','==',traj._depart)
      .where('_user._id', "==", traj._user._id)
      .get().then(res=>{
        res.forEach(doc=> doc.ref.update({_passagers: arrayUnion(traj._user)}))
      });
  }



}
