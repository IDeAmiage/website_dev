import { environment } from './../environments/environment';
import { Trajet } from './Trajet';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from './Car';
/**
 * This Service is used to communicate with some API's and also our nodejs backend
 * Functions from the backend can be used in this app with the functions of this service
 *
 * @export
 * @class ApiService
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url='http://localhost:3000/'

/**
 * Creates an instance of ApiService.
 * @param {HttpClient} httpclient
 * @memberof ApiService
 */
constructor(private httpclient: HttpClient) { }

/**
 * This method can be used as a test for our backend
 *
 * @return {*}  {Observable<any>}
 * @memberof ApiService
 */
public getUsers(): Observable<any>{
    return this.httpclient.get(this.url+'users')
  }

/**
 * This method return the geolocation of an adress using openstreemap api to geocode the adress
 *
 * @param {number} numAdrr Street number
 * @param {string} adress Street name
 * @param {string} city
 * @return {*}
 * @memberof ApiService
 */
public getPositionFromAdress(numAdrr: number, adress: string, city:string){
    adress = adress.replace(/\s/g, "+");
    switch (true) {
      case adress === "":
        return this.httpclient.get("https://nominatim.openstreetmap.org/search?q="+city+"&format=json&addressdetails=1")
      case numAdrr == 0:
        return this.httpclient.get("https://nominatim.openstreetmap.org/search?q="+adress+",+"+city+"&format=json&addressdetails=1")
      default:
        return this.httpclient.get("https://nominatim.openstreetmap.org/search?q="+numAdrr+"+"+adress+",+"+city+"&format=json&addressdetails=1");
    }
  }

/**
 * This method calculate the CO2 emitted by a traject passed in the func.
 * It use a custom calculation method created on some docs of real payed API's
 *
 * @param {Trajet} trajet
 * @return {*}
 * @memberof ApiService
 */
public getCo2Calculation(trajet : Trajet){
    return this.httpclient.get(this.url+'car/carbonemission/'+trajet._nbKms+'/'+trajet._user._car._type+'/'+ trajet._user._car._carburant);
  }

/**
 *
 * This method Send an email to the user to announced that there is a new passenger
 * This method works only if smtp is allowed from both side
 * @param {*} user
 * @memberof ApiService
 */
public sendNewPassengerEmail(user: any){
    this.httpclient.post("http://localhost:3000/users/sendmail", user).subscribe(
      data => {
        let res:any = data;
        console.log(
          `👏 > 👏 > 👏 > 👏 ${user.name} is successfully added to the traject and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
      }
    );
  }

/**
 * To go accross the smtp problem of mails, when a new passenger register to a traject a cloud messaging notification is created
 * and will popup in your windows notifications.
 * This method use firebase cloud messaging to perform the notification
 *
 * @param {*} user
 * @memberof ApiService
 */
public sendNotificationNewPassenger(user:any){
    const headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
      'Authorization':"key="+environment.firebase.serverKey
    });
    const bod = {
      "notification": {
        "title": "Nouveau passager",
        "body": user._name
     },
     "to" : localStorage.getItem("notifToken")
    }
    this.httpclient.post("https://fcm.googleapis.com/fcm/send",bod,{headers:headers}).subscribe(
      res=> {console.log(res);},
      err => {console.log(err);}
    )
  }

}
