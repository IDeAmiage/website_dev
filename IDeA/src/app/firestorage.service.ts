import { Trajet } from './Trajet';
import { FirebaseService } from './firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from './User';
import { setDoc, arrayUnion } from "firebase/firestore";



/**
 * This Service is used to communicate with the firestorage db where our object are stored
 * Some CRUD functions are implemented in this service.
 * The data is stored as collection of objects
 *
 * @export
 * @class FirestorageService
 */
@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  public user = new User();
  public traj_ref: any;

  /**
   * Creates an instance of FirestorageService.
   * @param {AngularFirestore} firestore
   * @memberof FirestorageService
   */
  constructor(private firestore: AngularFirestore) { }

  /**
   * This method is used to insert Object to the db for a particular collection.
   *
   * @param {*} data data to insert
   * @param {string} collectionName collection where the data will be inserted
   * @return {*}
   * @memberof FirestorageService
   */
  insertObject(data: any, collectionName: string) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(collectionName)
        .add(data)
        .then(res => { console.log(res); }, err => reject(err));
    });
  }

  /**
   * This method is used to insert a user in the db
   *
   * @param {*} data user to insert
   * @param {string} collectionName name of the collection
   * @param {string} id id of the user
   * @return {*}
   * @memberof FirestorageService
   */
  insertUser(data: any, collectionName: string, id: string) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(collectionName)
        .doc(id)
        .set(data)
        .then(res => { console.log(res); }, err => reject(err));
    });
  }

  /**
   * Get an entire collection
   *
   * @param {string} collectionName collection of the name
   * @return {*}
   * @memberof FirestorageService
   */
  getObject(collectionName: string) {
    return this.firestore.collection(collectionName).valueChanges();
  }

  /**
   * This method return the wanted user based on his id
   *
   * @param {string} id
   * @return {*}
   * @memberof FirestorageService
   */
  getUser(id: string) {
    return this.firestore.collection('user', ref =>
      ref.where('_id', '==', id)
    ).valueChanges();
  }
  /**
   * This method return the data of a particular entreprise
   *
   * @param {string} entreprise
   * @return {*}
   * @memberof FirestorageService
   */
  getCO2(entreprise: string) {
    return this.firestore.collection('trajet', ref =>
      ref.where('_user._entreprise', '==', entreprise)
    ).valueChanges();
  }

  /**
   * Update a user by passing his id and the new data
   *
   * @param {*} data
   * @param {string} id
   * @return {*}
   * @memberof FirestorageService
   */
  updateUser(data: any, id: string) {
    return this.firestore.collection('user', ref =>
      ref.where('_id', '==', id)
    ).doc(id).update(data);
  }

  /**
   * Method to delete the traject specifiy by the id
   *
   * @param {*} traj
   * @param {string} id
   * @memberof FirestorageService
   */
  async deleteTraject(traj: any, id: string) {
    await this.firestore.collection('trajet').
      ref
      .where('_destination', '==', traj._destination)
      .where('_depart', '==', traj._depart)
      .where('_departure_time', '==', traj._departure_time)
      .where('_user._id', "==", id)
      .get().then(res => {
        res.forEach(doc => doc.ref.delete())
      });
  }

  /**
   * Update the traject to add some passengers
   *
   * @param {Trajet} traj traj we want to update
   * @param {User} user
   * @memberof FirestorageService
   */
  async updateTraject(traj: Trajet, user: User) {
    await this.firestore.collection('trajet').
      ref
      .where('_user._nbTrajects', '==', traj._user._nbTrajects)
      .where('_destination', '==', traj._destination)
      .where('_departure_time', '==', traj._departure_time)
      .where('_depart', '==', traj._depart)
      .where('_user._id', "==", traj._user._id)
      .get().then(res => {
        res.forEach(doc => doc.ref.update({ _passagers: arrayUnion(user) }))
      });
  }



}
